const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const OrderSchema = new Schema({


    user: {
        id: {
            type: String,
            require: true
        },

        name: {
            firstName: {
                type: String,
                required: true,
            },

            lastName: {
                type: String,
                required: true,
            },
        },

        phoneNumber: {
            code: {
                type: String,
                required: true,
            },
            number: {
                type: String,
                required: true,
            }
        },

        addressInfo: {
            address: {
                type: String,
                required: true,
            },
            city: {
                type: String,
                required: true,
            },
            province: {
                type: String,
                required: true,
            }
        },
    },


    date: {
        type: Date,
        required: true

    },

    paymentMethod: {
        type: String,
        required: true,
        default: 0
    },

    state: {

        inProcessing: {
            type: Date,
            required: false,

        },
        shipped: {
            type: Date,
            required: false,

        },
        delivered: {
            type: Date,
            required: false,

        },
        cancelled: {
            type: Date,

        },

    },


    items: [
        {
            productId: {
                type: String,
                required: true,
            },
            name: {
                type: String,
                required: true,
            },
            image: {
                type: String,
                required: true,
            },
            amount: {
                type: Number,
                required: true,

            },
            price: {
                type: Number,
                required: true,
            }
        }
    ],

    totalPayment: {
        type: Number,
        require: true
    },
    shipmentPrice: {
        type: Number,
        require: true
    },
})

const Orders = mongoose.model('Orders', OrderSchema);

module.exports = Orders;