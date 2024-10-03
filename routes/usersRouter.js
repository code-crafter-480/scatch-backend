const express = require('express')
const router = express.Router()
// const userModel = require("../models/user-model")
// const bcrypt = require("bcrypt")
// const jwt = require("jsonwebtoken")

// const { generateToken } = require("../utils/generateToken")

const {registerUser, loginUser, logoutUser} = require("../controllers/authController")

router.get("/", function(req, res){
    res.send("hey it's working...")
})

/*
// 📌 After setting all things, simply we seperate this function into another file called 'controllers' --> 'authController.js'...
router.post("/register", function(req, res) {          // ➡️ Path : '/users/register'... front-end a 'fullname' or onnojaigai kono value na dileo code execute hoye jabe but nicher line a body theke jokhon data ana hobe 'fullname or etc' and ata jodi na lekha hoi tokhon amar app crash hoye jabe... tai amra try-catch use korbo...
    
    try{
        let {email, password, fullname} = req.body

        bcrypt.genSalt(10, function(err, salt){
            bcrypt.hash(password, salt, async function(err, hash){
                if (err) return res.send(err.message);
                else {
                    let user = await userModel.create({
                        email: email,
                        password: hash,
                        fullname: fullname
                    })
                    // res.send(user)
                    
                    // let token = jwt.sign({email: email, id: user._id}, "shhhh")          // for that set seperate file called 'generateToken.js' in 'utils'
                    let token = generateToken(user)
                    res.cookie("token", token)
                    res.send("User created successfully")
                }
            })
        })
    } catch(err){
        // console.log(err.message)
        res.send(err.message)
    }
})
*/

// 📌 This is the upper modified code...
router.post("/register", registerUser)


router.post("/login", loginUser)


router.get("/logout", logoutUser)


module.exports = router