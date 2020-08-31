const mongoose = require('mongoose')
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

const Products = require('./Controllers/ProductsController')
const User = require('./Controllers/UsersController')
const Categories = require('./Controllers/CategoriesConroller')
const Orders = require('./Controllers/OrdersController')
const Authentication = require('./Controllers/AuthenticationController')



const app = express();

app.use(cors());
app.use(bodyParser.json());


mongoose.connect(
    // "mongodb://localhost/sawa2ni",
    "mongodb+srv://abosamra:sawa2ni123@sawa2nicluster.r91x9.mongodb.net/sawa2niDB?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => { console.log('DB is connected...') })


//-----------------User----------------

app.post('/getUser', (req, res) => { User.getUser(req, res) })
app.get('/getUsers', (req, res) => { User.getUsers(req, res) })
app.post('/addToCart', (req, res) => { User.addToCart(req, res) })
app.post('/myCart', (req, res) => { User.getUserCart(req, res) })
app.put('/incrementAmount', (req, res) => { User.incrementUserProductAmount(req, res) })
app.put('/decrementAmount', (req, res) => { User.decrementUserProductAmount(req, res) })
app.put('/removeFromCart', (req, res) => { User.removeItemFromCart(req, res) })

//-----------------Products----------------

app.get('/', (req, res) => { Products.getProducts(req, res) })
app.post('/addProduct', (req, res) => { Products.handleAdd(req, res) })
app.put('/editProduct', (req, res) => { Products.editProduct(req, res) })
app.delete('/deleteProduct', (req, res) => { Products.deleteProduct(req, res) })
app.post('/getProduct', (req, res) => { Products.getProduct(req, res) })
app.post('/getOrderProducts', (req, res) => { Products.getOrderProducts(req, res) })
app.post('/addRate', (req, res) => { Products.addRate(req, res) })
app.post('/updateRate', (req, res) => { Products.updateRate(req, res) })
app.post('/addReview', (req, res) => { Products.addReview(req, res) })

//-----------------Categories----------------

app.get('/getCategories', (req, res) => { Categories.getCategories(req, res) })
app.post('/addCategory', (req, res) => { Categories.addCategory(req, res) })
app.delete('/deleteCategory', (req, res) => { Categories.deleteCategory(req, res) })

//-----------------Order----------------

app.get('/getOrders', (req, res) => { Orders.getAllOrders(req, res) })
app.post('/getUserOrders', (req, res) => { Orders.getUserOrders(req, res) })
app.post('/addOrder', (req, res) => { Orders.addOrder(req, res) })
app.post('/nextOrderStep', (req, res) => { Orders.goToNextOrderStep(req, res) })
app.post('/prevOrderStep', (req, res) => { Orders.goToPrevOrderStep(req, res) })
app.post('/resetOrderStep', (req, res) => { Orders.resetOrderStep(req, res) })
app.post('/cancelOrder', (req, res) => { Orders.cancelOrder(req, res) })


//-----------------Auth----------------
app.post('/register', (req, res) => { Authentication.handleRegister(req, res) })
app.post('/signin', (req, res) => { Authentication.handleSignin(req, res) })

//----------------------------------------

app.listen(process.env.PORT || 3000, () => {
    console.log(`server is listening to port ${process.env.PORT || 3000}`)
})

