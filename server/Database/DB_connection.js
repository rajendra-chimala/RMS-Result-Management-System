const mongoose = require('mongoose');
require("dotenv").config();




const DatabaseConnection = async ()=>{


    await mongoose.connect(process.env.DB_URL).then(()=>{
        console.log("Database is connect Successfully !");
    }).catch((e)=>{
        console.log("There Is Error In Database Connection !"+e);
    })

}



module.exports = DatabaseConnection