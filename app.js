'use strict'
const logger = require('./tools/logger')
const express = require('express')
const bodyParser = require('body-parser');
const {setCors} = require('./tools/utilities')
const auth = require('./routes/auth')
const singup = require('./routes/signup')
const securedRoutes = require('./routes/securedRoutes')
logger.status('Satrting microservice........')

const app = express()

app.use(setCors);
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.json())

app.use(auth)
app.use(singup)
app.use(securedRoutes)

app.listen(8099,'0.0.0.0',()=>{
    logger.status(`Service started, Listening on http://localhost:${8099}`)
})

