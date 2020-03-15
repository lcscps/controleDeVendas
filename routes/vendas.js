const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
require('../models/Venda')
require('../models/Produto')
const Venda = mongoose.model('vendas')
const Produto = mongoose.model('produtos')

// EDITAR VENDAS
router.get('/edit/:id', (req,res) => {
    Venda.findOne({_id: req.params.id}).then((venda) => {
        Produto.find().then((produto) => {
            res.render('vendas/editVenda', {venda: venda, produto: produto})
        })
    })
})

// Remover venda
router.get('/delete/:id', (req,res) => {
    Venda.findOneAndDelete({_id: req.params.id}).then(() => {
        req.flash('success_msg', 'Venda removida com sucesso')
        res.redirect('/vendas')
    }).catch((err) =>{
        req.flash('error_msg', 'Venda não pode ser removida, ERRO: '+err)
        res.redirect('/vendas')
    })
})


// LISTAR VENDAS
router.get('/', (req, res) => {
    Venda.find().populate('produto').then((venda) => {
        res.render('vendas/home', {venda: venda})
    })
})

// INSERIR VENDA
router.get('/add', (req, res) => {
    Produto.find().then((produto) => {
        res.render('vendas/addVenda', { produto: produto })
    })
})

// POST EDITAR VENDA
router.post('/editVenda',(req,res) => {
    Venda.findOne({_id: req.body.id}).then((venda) => {
        venda.produto = req.body.produto,
        venda.data = req.body.data,
        venda.quantidade = req.body.quantidade

        venda.save().then(() => {
            req.flash('success_msg', 'Venda editada com sucesso')
            res.redirect('/vendas')
        }).catch((err) => {
            req.flash('error_msg', 'Venda não pode ser editada')
            res.redirect('/vendas')
        })
    })
})

//  POST INSERIR VENDA
router.post('/add', (req, res) => {
    const novaVenda = {
        produto: req.body.produto,
        data: req.body.data,
        quantidade: req.body.quantidade
    }
    new Venda(novaVenda).save().then(() => {
        req.flash('success_msg', 'Venda registrada com sucesso')
        res.redirect('/vendas')
    })
})



module.exports = router