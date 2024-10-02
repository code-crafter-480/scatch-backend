const express = require('express')
const router = express.Router()
const ownerModel = require('../models/owner-model');



if( process.env.NODE_ENV === "development"){
    router.post("/create", async function(req, res){
        // ➡️ Code for Not more than one Owner....
        let owners = await ownerModel.find();
        if(owners.length > 0){
            return res.status(503).send("You don't have permission to create a new owner")
        }

        let {fullname, email, password} = req.body

        let createdOwner = await ownerModel.create({
            fullname: fullname,
            email: email,
            password: password
        })
        res.status(201).send(createdOwner)
        // res.send("We can create a new Owner")
    })
}


router.get("/", function(req, res){
    res.send("hey it's working...")
})


console.log(process.env.NODE_ENV)                 // 📌 To setup this : setx NODE_ENV "development"   it will Sets the variable permanently, (This value can be found there in 'Environment variable' -> 'User variables')... after setting the value restart the vscode, then run 'npx nodemon app.js'...  For delete this value : go to 'Environment variable' -> 'User variables' and delete...




module.exports = router