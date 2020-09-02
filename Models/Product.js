const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const ProductSchema = new Schema({

    name: {
        type: String,
        required: true,
    },

    details: {
        type: String,
    },

    price: {
        type: Number,
        required: true,

    },
    amount: {
        type: Number,
        required: true,

    },

    categories: {
        type: [String],
        required: false,

    },

    rank: {
        type: Number,
        default: 0
    },

    overallRate: {
        type: Number,
        default: 0
    },

    reviews:
        [{
            userId: {
                type: String,
                required: true,
            },


            rate: {
                type: Number,
            },

            review: {
                userName: {
                    type: String,
                    required: true,
                },
                date: Date,
                whatsGood: String,
                whatsNotGood: String,
                review: {
                    type: String,
                    required: true,
                }
            }
        }],


    images: {
        type: [String],
        required: true,
    }

})

const Products = mongoose.model('products', ProductSchema);

module.exports = Products;