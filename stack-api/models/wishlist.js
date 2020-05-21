const mongoose = require('mongoose')

var wishList = mongoose.model('wishlist',{
    name : {type:String},
    email : {type:String}
})

module.exports = { wishList }