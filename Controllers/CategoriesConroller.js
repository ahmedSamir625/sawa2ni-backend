
const Category = require('../Models/Category')

const getCategories = (req, res) => {
    Category.find().select('_id name')
        .then(categories => res.json(categories))
        .catch(err => res.status(400).json(err))
}

const addCategory = (req, res) => {
    let category = new Category(req.body)
    category.save()
        .then(data => { res.json(data) })
        .catch(() => { res.status(400).json('connot be inserted') })
}

const deleteCategory = (req, res) => {
    Category.findByIdAndDelete({ _id: req.body._id })
        .then(result => { res.json(result) })
        .catch(() => { res.status(400).json('cannot delete the category') })
}

module.exports = {
    getCategories: getCategories,
    addCategory: addCategory,
    deleteCategory: deleteCategory
}