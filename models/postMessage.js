const mongoose = require('mongoose')

var PostMessage = mongoose.model('projects',{
    title : {type:String},
    message : {type:String}
})

module.exports = { PostMessage }