const mongoose = require('mongoose')

var NewProduct = mongoose.model('product',{
    name : {type:String},
    category : {type:String},
    decription : {type:String},
    quantity : {type:Number},
    price : {type:Number},
    discount : {type:Number}
})

module.exports = { NewProduct }