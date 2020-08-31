const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const CategorySchema = new Schema({

    name: {
        type: String,
        required: true,
        unique: true
    },

})

const Categories = mongoose.model('categories', CategorySchema);

module.exports = Categories;