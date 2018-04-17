'use strict'
const logger = require('../tools/logger')
const express = require('express')
const route = express()
const collections = require('../db/mongo')
const { hash, validate } = require('../tools/crypt');
const jwt = require('jsonwebtoken')
const {jwtSecret} = require('../conf')

route.post('/login', (req, res) => {
    return new Promise((resolve, reject) => {
        if (!req.body.password || !req.body.userName) reject({ error: 'userName and password are required' })
        resolve(collections.users.findOne({ userName: req.body.userName }))
    })
        .then(o => {
            if (!o) throw { error: 'account not fund', statusCode: 404 }
            return validate(o.password, req.body.password)
        })
        .then(o => {
            if (o) {
                res.statusCode = 200
                res.send({
                    state:'success',
                    token: jwt.sign({userName:req.body.userName}, jwtSecret)
                })
                return o
            }
            else {
                throw { error: 'invalid username or password', statusCode: 401 }
            }

        })
        .catch(e => {
            console.log(e)
            res.statusCode = e.statusCode || 500;
            res.send({ error: e ? e.error || 'Internal server error' : 'Internal server error' })
        })
})

module.exports = route

