var user = require('../models/user');
var security = require('../services/security');

exports.login = (req, res, next) => {

    var data = {
        username: req.body.username,
        password: req.body.password
    }
console.log("data "+ req.body.password);
    // Find the user with the given username
    var query = user.findOne({ 'username': data.username });
    // Authenticate
    query.exec((err, user) => {
        if(err) {
            console.log("ERROR!");
            res.send(err);
        } else {
            var stored = user.password;
            var valid = security.authenticate(data.password, stored);
            console.log(valid);
            console.log("hereeeeee");
            res.send(valid);
        }
    });
}

exports.register = (req, res, next) => {
    var data = {
        username: req.body.username,
        password: security.encrypt(req.body.password),
        fname: req.body.fname,
        lname: req.body.lname
    };
    console.log(data);
    user.create(data, (err, data) => {
        if(err){
            res.send(err);
        } else {
            res.json(data);
        }
    });
}