const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productDetails = Schema({
    category: [{
        type: String
    }],
    productName: {
        type: String,
        require: true
    },
    productNumber: {
        type: Number,
        require: true
    },
    price: {
        type: Number,
        require: true
    },
    discount: {
        type: Number,
        require: true
    },
    productImages: [{
        type: String
    }],
    description: {
        type: String
    },
    stars: {
        type: Number
    },
    stockQnt: {
        type: Number
    },
    sizes: [{
        type: String
    }],
    colors: [{
        type: String
    }],
    review: [{
        email: {
            type: String
        },
        review: {
            type: String
        },
        date: {
            type: Date,
            default: Date.now
        }
    }]
});

module.exports = Product = mongoose.model('products', productDetails);