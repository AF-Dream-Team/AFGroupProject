


const express = require('express');
var router = express.Router()
var ObjectID= require('mongoose').Types.ObjectId
var nodeBase64 = require('nodejs-base64-converter');
const nodemailer = require("nodemailer");

/*---------------Api error -----------------*/
var { RegisterUser } = require('../models/registerUser')

router.get('/',(req,res)=>{
    RegisterUser.find((err,docs)=>{
        if(!err){
            res.send(docs)
        }else{
            console.log('Error while retrieving all records : '+JSON.stringify(err,undefined,2))
        }
    })
})

router.post('/',(req,res)=>{

    var newRecord= new RegisterUser({
        fname : req.body.fname,
        lname : req.body.lname,
        email : req.body.email,
        phone : req.body.phone,
        password : nodeBase64.encode(req.body.password),
        type : 'user'
    })

    newRecord.save((err,docs)=>{
        if(!err){
            res.send(docs)
        }else{
            console.log('Error while register : '+JSON.stringify(err,undefined,2))
        }
    })
})

router.post('/email',(req,res)=>{

    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'dsassignment2dreamteam2020@gmail.com',
          pass: 'ds2020@#'
        }
      });

    var mailOption ={
        from: 'dsassignment2dreamteam2020@gmail.com',
        to: req.body.email,
        subject: "Online Store change the privilege",
        text: "change your privilege to store manager"
      }
    
      transporter.sendMail(mailOption,function(error,info){
        if(error){
            res.send(error);
        }else{
            console.log("Message sent: %s", info.response);
            res.send(info.response);
        }
      });
    
})

router.put('/:id',(req,res)=>{
    if(!ObjectID.isValid(req.params.id)){
        return res.status(400).send('No record with given id : '+req.params.id)
    }

    var updateRecords={
        type : req.body.type
    }

    RegisterUser.findByIdAndUpdate(req.params.id, { $set: updateRecords},{new:true}, (err,docs)=>{
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

    RegisterUser.findByIdAndRemove(req.params.id,(err,docs)=>{
        if(!err){
            res.send(docs)
        }else{
            console.log('Error while updating records : '+JSON.stringify(err,undefined,2))
        }
    })
})

module.exports = router
