const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Venda = new Schema({
    data: {type: Date, required: true},
    produto: {type: Schema.Types.ObjectId, ref: 'produtos', required: true},
    quantidade: {type: Number, require: true}
})
mongoose.model('vendas', Venda) 