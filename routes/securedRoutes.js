'use strict'
const logger = require('../tools/logger')
const express = require('express')
const route = express()
const collections = require('../db/mongo')
const { applyPatch } = require('fast-json-patch');
const jwtMiddleware = require('../middlewares/authMiddleware')
const request = require('request');
const {resize} = require('../tools/thumbnail')

//route.use(jwtMiddleware)

route.get('/image-thumbnail/:width/:height/:url(*)', function (req, res) {
    return new Promise((resolve, reject) => {
        let url = req.params.url,
            toWidth = parseInt(req.params.width, 10),
            toHeight = parseInt(req.params.height, 10),
            format = req.headers.accept.match(/(png|jpg|jpeg|gif)/)[0] || url.match(/(png|jpg|jpeg|gif)/)[0];
        res.set('Content-Type', `image/${format}`);
        resolve(resize(request.get(url), format, toWidth, toHeight, res))
    })
        .then(o => {
            return true
        })
        .catch(e => {
            return false
        })
});

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

