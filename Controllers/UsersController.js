const User = require('../Models/User')
const Product = require('../Models/Product')

const getUsers = (req, res) => {
    User.find()
        .then(users => res.json(users))
        .catch(err => res.this.status(400).json(err))
}

const getUser = (req, res) => {
    const { userId } = req.body

    User.findOne({ _id: userId })
        .then(user => res.json(user))
        .catch(err => res.status(400).json(err))
}



const addToCart = (req, res) => {
    const { userId, productId } = req.body

    const cartItem = {
        productId,
        amount: 1,
    }

    User.update(
        { _id: userId },
        { $push: { cart: cartItem } }
    )
        .then(response => { res.json(response) })
        .catch(err => res.status(400).json(err))

}


const getUserCart = (req, res) => {
    const { cart } = req.body

    Product.find({ _id: { $in: Object.values(cart) } })
        .then(products => { res.json(products) })
        .catch(err => res.status(400).json(err))

}

const incrementUserProductAmount = (req, res) => {
    const { userId, productId } = req.body

    User.findOneAndUpdate(

        { "_id": userId, "cart.productId": productId },
        { $inc: { "cart.$.amount": 1 } }
    )
        .then(response => res.json(response))
        .catch(err => { res.status(400).json('cannot increment') })

}

const decrementUserProductAmount = (req, res) => {
    const { userId, productId } = req.body

    User.findOneAndUpdate(

        { "_id": userId, "cart.productId": productId },
        { $inc: { "cart.$.amount": -1 } }
    )
        .then(response => res.json(response))
        .catch(err => { res.status(400).json('cannot decrement')})
}

const removeItemFromCart = (req, res) => {
    const { userId, productId } = req.body


    User.updateOne(
        { "_id": userId },
        { $pull: { cart: { productId: productId } } },
        { multi: true }
    )
        .then(response => res.json(response))
        .catch(err => { res.status(400).json(err)})
}





module.exports = {
    getUsers: getUsers,
    addToCart: addToCart,
    getUserCart: getUserCart,
    incrementUserProductAmount: incrementUserProductAmount,
    decrementUserProductAmount: decrementUserProductAmount,
    removeItemFromCart: removeItemFromCart,
    getUser:getUser,
}
