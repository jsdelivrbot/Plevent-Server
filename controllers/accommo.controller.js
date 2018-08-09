var mongoose = require('mongoose');
var accommodation = require('../models/accommodation');

exports.accommo_list = (req, res, next) => {
    accommodation.find({}, (err, items) => {
        res.send(items);
    });
}

exports.accommo_post = (req, res, next) => {
    var data = {
        title: req.body.title,
        street: req.body.street,
        state: req.body.state,
        city: req.body.city,
        country:  req.body.country,
        fromDate: req.body.fromDate,
        toDate: req.body.toDate,
        price: req.body.price,
        guests: req.body.guests
    };
    accommodation.create(data, (err, data) => {
        if(err){
            res.send(err);
        } else {
            res.json(data);
        }
    });
}

exports.accommo_delete = (req, res, next) => {
    var id = req.params.id;
    accommodation.deleteMany({_id: id}).catch(err => console.log(err));
    res.json(`Successfully deleted ${id}`);

}

exports.accommo_edit = (req, res, next) => {
    var id = req.params.id;
    accommodation.findByIdAndUpdate(id, {$set: req.body}, {new: false}, function (err, accommo) {
        if (err) return handleError(err);
        res.send(accommo);
    });
}