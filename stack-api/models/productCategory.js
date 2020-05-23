const mongoose = require('mongoose')

var ProductCategory = mongoose.model('category',{
    name : {type:String}
})

module.exports = { ProductCategory }