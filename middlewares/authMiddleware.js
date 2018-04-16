'use strict'
const jwt = require('jsonwebtoken')

module.exports = ('/', (req, res, next) => {
    return new Promise((resolve, reject) => {
        let token = req.body.token || req.query.token || req.headers['x-access-token'] || req.headers['bearer-token'] || req.headers['auth-token'];
        if(!token){
            throw { error: 'missing token' } 
        }
        jwt.verify(token, 'ajskhdakuhduayajkdbaskjhfusdackjhsakhfck<gdc<zskbfkjz<bkxjvjkzzzxcxzc', function (err, decoded) {
            if (err) {
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
        res.send({ error: e ? e.error || 'Internal server error' : 'Internal server error' })
    })
})

