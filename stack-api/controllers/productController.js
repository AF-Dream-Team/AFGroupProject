const express = require('express')
var router = express.Router()
var ObjectID= require('mongoose').Types.ObjectId


var { NewProduct } = require('../models/newProducts')

router.get('/',(req,res)=>{
    NewProduct.find((err,docs)=>{
        if(!err){
            res.send(docs)
        }else{
            console.log('Error while retrieving all records : '+JSON.stringify(err,undefined,2))
        }
    })
})

router.post('/',(req,res)=>{
    var newRecord= new NewProduct({
        name : req.body.name,
        category : req.body.category,
        decription : req.body.decription,
        quantity : req.body.quantity,
        price : req.body.price,
        discount : req.body.discount
    })

    newRecord.save((err,docs)=>{
        if(!err){
            res.send(docs)
        }else{
            console.log('Error while register : '+JSON.stringify(err,undefined,2))
        }
    })
})

router.put('/:id',(req,res)=>{
    if(!ObjectID.isValid(req.params.id)){
        return res.status(400).send('No record with given id : '+req.params.id)
    }

    var updateRecords={
        name : req.body.name,
        category : req.body.category,
        decription : req.body.decription,
        quantity : req.body.quantity,
        price : req.body.price,
        discount : req.body.discount
    }

    NewProduct.findByIdAndUpdate(req.params.id, { $set: updateRecords},{new:true}, (err,docs)=>{
        if(!err){
            res.send(docs)
        }else{
            console.log('Error while updating records : '+JSON.stringify(err,undefined,2))
        }
    })
})

router.delete('/:id',(req,res)=>{
    if(!ObjectID.isValid(req.params.id)){
        return res.status(400).send('No record with given id : '+req.params.id)
    }

    NewProduct.findByIdAndRemove(req.params.id,(err,docs)=>{
        if(!err){
            res.send(docs)
        }else{
            console.log('Error while updating records : '+JSON.stringify(err,undefined,2))
        }
    })
})

module.exports = router