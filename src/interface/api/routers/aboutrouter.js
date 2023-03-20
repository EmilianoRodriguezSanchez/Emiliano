'use strict'
const aboutcontroller = require('../controllers/aboutcontroller')


module.exports = (router) => {
    
    router.get('/v1/users/:id', (req,res) => aboutcontroller.getusers(req,res))
}