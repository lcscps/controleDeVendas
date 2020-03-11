const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Produto = new Schema({

    descricao: {type: String, required: true},
    precoCusto: {type: Number, required: true},
    precoVenda: {type: Number, required: true},
    pesoOuMedida: {type: String}
})

mongoose.model('produtos', Produto)