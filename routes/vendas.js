const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
require('../models/Venda')
require('../models/Produto')
const Venda = mongoose.model('vendas')
const Produto = mongoose.model('produtos')


// LISTAR VENDAS
router.get('/', (req,res) => {
    Venda.find().then((venda) => {
        res.render('vendas/home', {venda: venda})
    }).catch((err) => {
        req.flash('error_msg', 'Não foi encontrado o registro de vendas. ERRO: '+ err)
        res.redirect('/vendas')
    })
})

// INSERIR VENDA
router.get('/add', (req,res) => {
    res.render('vendas/addVenda')
})



module.exports = router