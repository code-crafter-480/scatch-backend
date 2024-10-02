const mongoose = require("mongoose")
const config = require("config")

const dbgr = require("debug")("development:mongoose")         // ekahen amra jakhusi likhte pari...

/* 📌📌📌 
    ➡️ Using debug in the backend helps in managing logs more effectively, improves performance, keeps production logs clean, and allows for more focused debugging during development.
1️⃣. Granular Debugging
    ➡️ The debug module allows you to create different namespaces or categories of debug information. You can enable or disable specific categories when running your app, making it easy to focus on relevant logs.
        const debug = require('debug')('app:startup');
        debug('Application has started.');

    ➡️ You can create different debuggers, like app:db, app:auth, etc., for specific parts of the application.

2️⃣. Conditional Logging
    ➡️ Unlike console.log, which prints messages in all environments, debug only outputs logs when explicitly enabled. This can be done by setting the DEBUG environment variable.
        set DEBUG=app:startup node app.js           -> write it in terminal then run server
        $env:DEBUG="development:*"; node app.js   or  $env:DEBUG="development:*"   hit enter then 'npx nodemon'    --> 📌 It is effective for debugger because this is 'powershell'
    ➡️ Disable this log : $env:DEBUG=""; node app.js   --> Disable all logs 


*/

mongoose
    // .connect("mongodb://127.0.0.1:27017/scatch")
    .connect(`${config.get("MONGODB_URI")}/scatch`)
    .then(()=>{
        // console.log("Connected successfully");
        dbgr("connected");
    })
    .catch((err)=>{
        dbgr(err)
    })


module.exports = mongoose.connection;           // It will give you the whole control of database of 'scatch'...