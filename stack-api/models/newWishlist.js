const mongoose = require('mongoose')

var NewWishlist = mongoose.model('wishlist',{
    name : {type:String},
    category : {type:String},
    decription : {type:String},
    quantity : {type:Number},
    price : {type:Number},
    discount : {type:Number}
})

module.exports = { NewWishlist }