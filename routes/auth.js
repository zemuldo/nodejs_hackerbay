'use strict'
const logger = require('../tools/logger')
const express = require('express')
const route = express()
const {db } = require('../db/mongo')

route.post('/login',(req,res)=>{
    return new Promise((resolve,reject)=>{
        resolve(true)
    })
    .then(o=>{
        res.statusCode = 200
        res.send(o)
        return o
    })
    .catch(e=>{
        res.statusCode = e.statusCode || 500;
        res.send({error:e?e.error || 'Internal server error':'Internal server error'})
    })
})

module.exports = route

