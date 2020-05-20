const mongoose = require('mongoose')

var NewProduct = mongoose.model('product',{
    name : {type:String},
    category : {type:String},
    description : {type:String},
    quantity : {type:Number},
    price : {type:Number},
    discount : {type:Number},
    discountMonth : {type:String}
})

module.exports = { NewProduct }