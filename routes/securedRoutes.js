'use strict'
const logger = require('../tools/logger')
const express = require('express')
const route = express()
const collections = require('../db/mongo')

const jwtMiddleware = require('../middlewares/authMiddleware')

route.use(jwtMiddleware)

route.post('/profile', (req, res) => {
    return new Promise((resolve, reject) => {
        resolve(req.body)
    })
        .then(o => {
            res.statusCode = 200
            res.send('Hi, welcome to a secure route')
        })
        .catch(e => {
            console.log(e)
            res.statusCode = e.statusCode || 500;
            res.send({ error: e ? e.error || 'Internal server error' : 'Internal server error' })
        })
})

route.get('/profile', (req, res) => {
    return new Promise((resolve, reject) => {
        resolve(req.body)
    })
        .then(o => {
            res.statusCode = 200
            res.send('Hi, welcome to a secure route')
        })
        .catch(e => {
            console.log(e)
            res.statusCode = e.statusCode || 500;
            res.send({ error: e ? e.error || 'Internal server error' : 'Internal server error' })
        })
})

module.exports = route

