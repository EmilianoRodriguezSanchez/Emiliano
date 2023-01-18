'use strict'
const aboutcontroller = require('../controllers/aboutcontroller')


module.exports = (router) => {
    router.get('/about', (req,res) => aboutcontroller.getabout(req,res))
}