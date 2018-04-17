'use strict'
const logger = require('../tools/logger')
const express = require('express')
const route = express()
const collections = require('../db/mongo')
const { applyPatch } = require('fast-json-patch');
const jwtMiddleware = require('../middlewares/authMiddleware')

route.use(jwtMiddleware)

route.post('/json-create', (req, res) => {
    return new Promise((resolve, reject) => {

        resolve(collections.patchUs.replaceOne(
            { userName: req.body.userName },
            req.body,
            { upsert: true }
        ))
    })
        .then(o => {
            res.statusCode = 200
            res.send(o)
        })
        .catch(e => {
            console.log(e)
            res.statusCode = e.statusCode || 500;
            res.send({ error: e ? e.error || 'Internal server error' : 'Internal server error' })
        })
})

route.post('/jsonpatch', (req, res) => {
    console.log(req.body)
    return new Promise((resolve, reject) => {
        resolve(applyPatch(req.body.document, req.body.patch).newDocument)
    })
        .then(o => {
            res.statusCode = 200
            res.send(o)
        })
        .catch(e => {
            console.log(e)
            res.statusCode = e.statusCode || 500;
            res.send({ error: e ? e.error || 'Internal server error' : 'Internal server error' })
        })
})

module.exports = route

