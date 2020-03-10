const express = require('express')
const router = express.Router()

router.get('/',(req,res) => {
    res.render('produtos/home')
})

module.exports = router