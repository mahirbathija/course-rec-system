const mongoose = require('../db/mongoose');
const {User} = require('../model/user');

var authenticate = function(req, res, next) {
    var token = req.header('x-auth');

    User
    .findByToken(token)
    .then((user) => {
        if(!user) {
            return Promise.reject();
        }
        req.user = user;
        req.token = token;
        next();
    })
    .catch((e) => {
        res.status(401).send(e);
    })
}

module.exports.authenticate = authenticate;