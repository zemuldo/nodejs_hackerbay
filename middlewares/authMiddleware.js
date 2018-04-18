'use strict'
const jwt = require('jsonwebtoken')
const {jwtSecret} = require('../conf')

module.exports = ('/', (req, res, next) => {
    return new Promise((resolve, reject) => {
        let token = req.body.token || req.query.token || req.headers['x-access-token'] || req.headers['bearer-token'] || req.headers['auth-token'];
        if(!token){
            throw { error: 'missing token' } 
        }
        jwt.verify(token, jwtSecret, function (e, token) {
            if (e) {
                reject({ error: 'Unauthorised Access Attempt, Invalid Token', statusCode: 401 })
            } else {
                resolve({ state: true })
            }
        })
            
    })
    .then(o => {
        if (!o.error && o.state) { 
            next() 
        } else {
             throw { error: 'missing token' } 
            }
    })
    .catch(e => {
        console.log(e)
        res.statusCode = e.statusCode || 500;
        res.writeHead(403, {'Content-Type': 'text/html'});
            res.end('<html><h1>401 Unauthorized </h1></html>');
        res.send({ error: e ? e.error || 'Internal server error' : 'Internal server error' })
    })
})

