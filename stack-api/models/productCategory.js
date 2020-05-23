const mongoose = require('mongoose')

//model for category
var ProductCategory = mongoose.model('category',{
    name : {type:String}
})

module.exports = { ProductCategory }