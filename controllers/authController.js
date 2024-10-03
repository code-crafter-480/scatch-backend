const userModel = require("../models/user-model")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const { generateToken } = require("../utils/generateToken")



module.exports.registerUser = async function(req, res) {          // ➡️ Path : '/users/register'... front-end a 'fullname' or onnojaigai kono value na dileo code execute hoye jabe but nicher line a body theke jokhon data ana hobe 'fullname or etc' and ata jodi na lekha hoi tokhon amar app crash hoye jabe... tai amra try-catch use korbo...
    try{
        let {email, password, fullname} = req.body

        let user = await userModel.findOne({email: email})
        // if (user) return res.status(401).send("You already have an account, Please login.")
        if (user){
            req.flash("error", "You already have an account, Please login.")
            return res.redirect("/")
        } 

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
};


module.exports.loginUser = async function(req, res) {
    let { email, password } = req.body;

    let user = await userModel.findOne({email: email})
    if (!user) return res.send("Email or Password incorrect")

    bcrypt.compare(password, user.password, function(err, result){
        if (result){
            let token = generateToken(user)
            res.cookie("token", token)
            res.redirect("/shop")
        }
        else{
            return res.send("Email or Password incorrect")
        }
    })
};


module.exports.logoutUser = function (req, res){
    res.cookie("token", "")
    res.redirect("/")
}
