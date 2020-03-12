const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
require('../models/Produto')
const Produto = mongoose.model('produtos')

router.get('/', (req,res) => {
    Produto.find().sort({descricao: 'ASC'}).then((produto) => {
        res.render('produtos/home', {produto: produto})
    }).catch((err) => {
        req.flash('error_msg', 'Não foi possível listar os produtos')
        res.redirect('/produtos')
    })
})

router.get('/add', (req,res) => {
    res.render('produtos/addProduto')
})

router.post('/add', (req,res) => {
    const novoProduto = {
        descricao: req.body.descricao,
        precoCusto: req.body.precoCusto,
        precoVenda: req.body.precoVenda,
        pesoOuMedida: req.body.pesoOuMedida
    }
    new Produto(novoProduto).save().then(() => {
        req.flash('success_msg', 'Produto inserido com sucesso')
        res.redirect('/produtos')
    }).catch((err) => {
        req.flash('error_msg', 'Produto não pode ser inserido. ERRO: '+err)
        res.redirect('/produtos')
    })
})

module.exports = router