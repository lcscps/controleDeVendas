const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
require('../models/Produto')
const Produto = mongoose.model('produtos')

router.get('/', (req,res) => {
    res.render('produtos/home')
})

router.get('/add', (req,res) => {
    res.render('produtos/addProduto')
})

module.exports = router