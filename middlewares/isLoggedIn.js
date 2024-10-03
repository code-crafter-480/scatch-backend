const jwt = require("jsonwebtoken")
const userModel = require("../models/user-model")


module.exports = async function(req, res, next){
    if (!req.cookies.token){
        req.flash("error", "you need to login first")        // 📌 ai flash message oi redirect route ao access korte parbo... 
        return res.redirect("/")
    }

    try{
        let decoded = jwt.verify( req.cookies.token, process.env.JWT_KEY );
        let user = userModel
            .findOne({ email: decoded.email })
            .select("-password")        // password ta asbe na 'user' er moddhe...

        req.user = user

        next();

    } catch (err) {
        req.flash("error", "something went wrong")
        res.redirect("/")
    }
}