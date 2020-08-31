const Order = require('../Models/Order')
const User = require('../Models/User')
const Product = require('../Models/Product')

const addOrder = (req, res) => {
    const order = new Order(req.body)

    order.save()
        .then(data => {
            User.updateOne(
                { _id: req.body.user.id },
                { $push: { orders: data._id }, $set: { cart: [] } }
            )
                .then(() => {
                    const itemsLen = data.items.length
                    for (let i = 0; i < itemsLen; i++) {

                        Product.findOneAndUpdate(

                            { "_id": data.items[i].productId },
                            { $inc: { "amount": data.items[i].amount * -1 } }
                        )
                            .then(() => {
                                if (i === itemsLen - 1) res.json(data)
                            })
                            .catch(err => { res.status(400).json('cannot increment'), console.log(err) })
                    }

                    res.json(data)
                })
                .catch(err => res.status(400).json(err))


        })
        .catch(err => { res.status(400).json(err) })


}

const getAllOrders = (req, res) => {

    Order.find().sort({ date: -1 })
        .then(orders => { res.json(orders) })
        .catch(err => res.status(400).json(err))

}

const getUserOrders = (req, res) => {
    const { ids } = req.body

    Order.find({ _id: { $in: ids } })
        .sort({ date: -1 })
        .then(orders => { res.json(orders) })
        .catch(err => res.status(400).json(err))
}


//------------------------------

const goToNextOrderStep = (req, res) => {

    const { orderId, step } = req.body

    if (step === 1) {
        Order.updateOne(
            { _id: orderId },
            { $set: { "state.inProcessing": new Date() } },
        )
            .then(result => { res.json(result) })
            .catch(err => res.status(400).json(err))
    }
    else if (step === 2) {
        Order.updateOne(
            { _id: orderId },
            { $set: { "state.shipped": new Date() } },
        )
            .then(result => { res.json(result) })
            .catch(err => res.status(400).json(err))
    }
    else if (step === 3) {
        Order.updateOne(
            { _id: orderId },
            { $set: { "state.delivered": new Date() } },
        )
            .then(result => { res.json(result) })
            .catch(err => res.status(400).json(err))
    }

}


const goToPrevOrderStep = (req, res) => {
    const { orderId, step } = req.body

    if (step === 1) {
        Order.updateOne(
            { _id: orderId },
            { $set: { "state.inProcessing": null } },
        )
            .then(result => { res.json(result) })
            .catch(err => res.status(400).json(err))
    }
    else if (step === 2) {
        Order.updateOne(
            { _id: orderId },
            { $set: { "state.shipped": null } },
        )
            .then(result => { res.json(result) })
            .catch(err => res.status(400).json(err))
    }
    else if (step === 3) {
        Order.updateOne(
            { _id: orderId },
            { $set: { "state.delivered": null } },
        )
            .then(result => { res.json(result) })
            .catch(err => res.status(400).json(err))
    }
}

const resetOrderStep = (req, res) => {
    const { orderId } = req.body

    Order.updateOne(
        { _id: orderId },
        {
            $set: {
                "state.inProcessing": null,
                "state.shipped": null,
                "state.delivered": null,
                "state.cancelled": null
            }
        },
    )
        .then(result => { res.json(result) })
        .catch(err => res.status(400).json(err))
}

const cancelOrder = (req, res) => {
    const { orderId } = req.body


    Order.updateOne(
        { _id: orderId },
        {
            $set: {
                "state.cancelled": new Date()
            }
        },
    )
        .then(result => { res.json(result) })
        .catch(err => res.status(400).json(err))
}


module.exports = {
    addOrder: addOrder,
    getAllOrders: getAllOrders,
    getUserOrders: getUserOrders,
    goToNextOrderStep: goToNextOrderStep,
    goToPrevOrderStep: goToPrevOrderStep,
    resetOrderStep: resetOrderStep,
    cancelOrder: cancelOrder,
}
