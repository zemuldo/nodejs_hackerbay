'use strict'
const logger = require('../tools/logger')
const {hash} = require('../tools/crypt');
const express = require('express')
const route = express();

const collections  = require('../db/mongo')


route.post('/signup', (req, res) =>{
    let user
    return new Promise((resolve,reject)=>{
        if(!req.body.password || !req.body.userName) reject({error:'userName and password are required'})
        let pass_hash = hash(req.body.password);
        user = {userName:req.body.userName,password:pass_hash}
       resolve(user)
    })
    .then(o=>{
        return collections.users.findOne({userName:o.userName})
     })
    .then(o=>{
        if(o)throw {error:'username exists'}
       if(user.password.salt)return collections.users.insertOne(user)
        throw {error:'internal server error',statusCode:500}
    })
    .then(o=>{
        res.statusCode = 200
        res.send(o)
        return o
    })
    .catch(e=>{
        console.log(e)
        res.statusCode = e.statusCode || 500;
        res.send({error:e?e.error || 'Internal server error':'Internal server error'})
    })
  });

  module.exports = route