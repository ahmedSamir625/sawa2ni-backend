const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const UsersSchema = new Schema({


    email: {
        type: String,
        required: true,
        unique: true,
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


    phone: {
        code: {
            type: String,
            default: '+20',
            required: true,
        },
        number: {
            type: String,
            required: true,
        }
    },

    admin:{
        type:Boolean,
        default:false,
    },

    cart: [
        {
            productId: {
                type: String
            },
            amount: {
                type: Number,
                default: 1,
            }
        }
    ],

    orders: {
        type: [String],
    }


})

const Users = mongoose.model('users', UsersSchema);

module.exports = Users;