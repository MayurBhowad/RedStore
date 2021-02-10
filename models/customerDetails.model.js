const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const customerDetails = Schema({
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    address: {
        type: String,
        require: true
    },
    city: {
        type: String,
        require: true
    },
    state: {
        type: String,
        require: true
    },
    zip: {
        type: String,
        require: true
    },
});

module.exports = Customer = mongoose.model('customerDetails', customerDetails)