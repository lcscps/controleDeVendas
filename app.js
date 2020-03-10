// Carregar modulos
const express = require('express')
const app = express()
const handlebars = require('express-handlebars')
const bodyParser = require('body-parser')
const session = require('express-session')
const path = require('path')
const flash = require('connect-flash')
const mongoose = require('mongoose')
const produtos = require('./routes/produtos')
const vendas = require('./routes/vendas')

// Configurações
// Session
app.use(session({
    secret: 'nodejs',
    resave: true,
    saveUninitialized: true
}))
app.use(flash())
// Middleware
app.use((req,res,next) => {
    res.locals.success_msg = req.flash('success_msg')
    res.locals.error_msg = req.flash('error_msg')
    next()
})
// Handlebars 
app.engine('handlebars', handlebars({defaultLayout: 'main'}))
app.set('view engine', 'handlebars')
// BodyParser
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
// Public
app.use(express.static(path.join(__dirname, "public")))
// Mongoose
mongoose.Promise = global.Promise
mongoose.connect('mongodb://192.168.0.21/controleDeVendas', {useNewUrlParser: true, useUnifiedTopology: true}).then(() => {
    console.log('Servidor mongo ATIVO')
})

// Rotas
app.get('/', (req,res) => {
    res.render('index')
})

app.use('/produtos', produtos)
app.use('/vendas', vendas)

// Outras configurações
const PORT = 3000
app.listen(PORT, console.log('Servidor node ativo'))