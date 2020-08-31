const Product = require('../Models/Product')
const User = require('../Models/User')
// const Category = require('../Models/Category')


const getProducts = (req, res) => {

    Product.find().select('name price amount images categories overallRate').sort({ rank: -1 })
        .then(products => res.json(products))
        .catch(err => res.this.status(400).json(err))

}

const addProduct = (req, res) => {

    const product = new Product(req.body)

    product.save()
        .then(data => {
            res.json(data)
        })
        .catch(() => { res.status(400).json('connot be inserted') })
}


const editProduct = (req, res) => {

    const { product, id } = req.body

    Product.findByIdAndUpdate(
        { _id: id },
        {
            $set: {
                name: product.name,
                price: product.price,
                details: product.details,
                categories: product.categories,
                amount: product.amount,
                imgs: product.imgs,
            }
        }
    )
        .then(data => {
            res.json(data)
        })
        .catch(err => { res.status(400).json(err) })

}



const getProduct = (req, res) => {

    Product.findOne({ _id: req.body._id })
        .then(product => { res.json(product) })
        .catch(err => res.status(400).json(err))
}

const getOrderProducts = (req, res) => {
    const { ids } = req.body

    Product.find({ _id: { $in: ids } }).select('_id name images')
        .then(products => { res.json(products) })
        .catch(err => res.status(400).json(err))
}


const deleteProduct = (req, res) => {
  
    Product.findByIdAndDelete({ _id: req.body._id })
        .then(result1 => {
          
            User.update(
                {},
                { $pull: { cart: req.body._id } },
                { multi: true }
            )
                .then(() => res.json(result1))
                .catch(() => { res.status(400).json('connot delete from carts') })
         

        })
        .catch(() => { res.status(400).json('cannot delete the product')})
}

const addRate = (req, res) => {
    const { revRateInfo, productId, overallRate } = req.body

    Product.updateOne(
        { _id: productId },
        {
            $push: { reviews: revRateInfo },
            $set: { overallRate: overallRate }
        }

    )
        .then(result => { res.json(result) })
        .catch(err => res.status(400).json(err))
}

const updateRate = (req, res) => {
    const { productId, userId, rate, overallRate } = req.body

    Product.updateOne(
        { _id: productId, "reviews.userId": userId },
        {
            $set: {
                "reviews.$.rate": rate,
                overallRate: overallRate
            }
        },
    )
        .then(result => { res.json(result) })
        .catch(err => res.status(400).json(err))
}

const addReview = (req, res) => {
    const { productId, reviewInfo, overAllRate, hasRate } = req.body


    if (hasRate) {
        Product.updateOne(
            { _id: productId, "reviews.userId": reviewInfo.userId },
            {
                $set: {
                    "reviews.$.review": reviewInfo.review,
                    "reviews.$.rate": reviewInfo.rate,
                    overallRate: overAllRate
                }
            },
        )
            .then(result => { res.json(result) })
            .catch(err => res.status(400).json(err))
    }
    else {
        Product.updateOne(
            { _id: productId },
            {
                $push: { reviews: reviewInfo },
                $set: { overallRate: overAllRate }
            }
        )
            .then(result => { res.json(result) })
            .catch(err => res.status(400).json(err))
    }
}




module.exports = {
    getProducts: getProducts,
    handleAdd: addProduct,
    deleteProduct: deleteProduct,
    getProduct: getProduct,
    editProduct: editProduct,
    getOrderProducts: getOrderProducts,
    addRate: addRate,
    updateRate: updateRate,
    addReview: addReview,
}