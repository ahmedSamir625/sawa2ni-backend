const Login = require('../Models/Login')
const User = require('../Models/User')
const bcrypt = require('bcrypt');


const handleRegister = (req, res) => {

    const { email, name, phone, password } = req.body;
    const hash = bcrypt.hashSync(password, 10);

    const newLogin = new Login({
        email: email,
        hash: hash
    })

    newLogin.save()
        .then(data => {
            const newUser = new User({
                name: name,
                email: email,
                phone: phone,
                admin: false,
                cart: [],
                orders: []
            });

            newUser.save()
                .then(user => { res.json(user) })
                .catch(err => {
                    Login.findByIdAndDelete({ _id: data._id })
                        .then(res.json(err))
                        .catch(res.json(err))
                })

        })
        .catch(err => { res.status(400).json('username already exist') })

}


const handleSignin = (req, res) => {
    const { email, password } = req.body;



    Login.findOne({ email: email })
        .then(data => {

            if (data == null) {
                res.status(400).json('email not found')
            }
            else {
                const isValid = bcrypt.compareSync(password, data.hash);
                if (isValid) {
                    User.findOne({ email: email })
                        .then(user => res.json(user))
                        .catch(err => res.status(400).json('cannot login'))
                }
                else {
                    res.status(400).json('wrong password');
                }
            }
        })
        .catch(err => res.status(400).json('email not found'))
}


module.exports = {
    handleRegister: handleRegister,
    handleSignin: handleSignin
}