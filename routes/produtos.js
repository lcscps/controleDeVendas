// CARREGAR MODULOS
const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
require('../models/Produto')
const Produto = mongoose.model('produtos')

// LISTAR OS PRODUTOS CADASTRADOS
router.get('/', (req,res) => {
    Produto.find().sort({descricao: 'ASC'}).then((produto) => {
        res.render('produtos/home', {produto: produto})
    }).catch((err) => {
        req.flash('error_msg', 'Não foi possível listar os produtos')
        res.redirect('/produtos')
    })
})

// ADICIONAR NOVO PRODUTO
router.get('/add', (req,res) => {
    res.render('produtos/addProduto')
})

// REMOVER PRODUTO
router.get('/delete/:id', (req,res) => {
    Produto.findOneAndDelete({_id: req.params.id}).then(() => {
        req.flash('success_msg', 'Produto removido com sucesso')
        res.redirect('/produtos')
    }).catch((err) => {
        req.flash('error_msg', 'Não foi posseivel localizar o produto')
        res.redirect('/produtos')
    })
})

// EDITAR PRODUTO (PUXAR OS DADOS PARA OS FORMULARIOS) 
router.get('/edit/:id', (req,res) => {
    Produto.findOne({_id: req.params.id}).then((produto) => {
        res.render('produtos/editProduto', {produto: produto})
    }).catch((err) => {
        req.flash('error_msg', 'Produto não encontrado')
        res.redirect('/produtos')
    }) 
})

// POST INSERIR PRODUTOS
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

// POST SALVAR EDIÇÃO DO PRODUTO
router.post('/editProduto', (req,res) => {
    Produto.findOne({_id: req.body.id}).then((produto) => {
        produto.descricao = req.body.descricao,
        produto.precoCusto = req.body.precoCusto,
        produto.precoVenda = req.body.precoVenda,
        produto.pesoOuMedida = req.body.pesoOuMedida

        produto.save().then(() => {
            req.flash('success_msg', 'Produto alterado com sucesso')
            res.redirect('/produtos')
        }).catch((err) => {
            req.flash('error_msg', 'Produto não pode ser alterado. Erro: '+err)
            res.redirect('/produtos')
        })
    }).catch((err) => {
        req.flash('error_msg', 'Produto não encontrado')
        res.redirect('/produtos')
    })
})

module.exports = router