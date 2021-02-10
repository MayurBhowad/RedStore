const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderDetails = Schema({
    billNumber: {
        type: Number,
        require: true
    },
    customer: {
        type: Schema.Types.ObjectId,
        ref: 'customerDetails'
    },
    products: [{
        productNumber: {
            type: String,
            require: true
        },
        itemCount: {
            type: Number,
            default: 1
        }
    }],
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = Order = mongoose.model('orderDetails', orderDetails);