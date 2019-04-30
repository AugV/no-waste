const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// this will be our data base's data structure 
const usersDataSchema = new Schema(
    {
        "_id": Number,
        "userName": String,
        "userInfo": String,
        "products": [{
            "productId": Number,
            "productName": String, 
            "description": String, 
            "creationDate": Date, 
            "modificationDate": Date, 
            "expirydate": Date, 
            "category": String, 
            "priority": Number
        }]
    },
    { timestamps: true }
);

// export the new Schema so we could modify it using Node.js
module.exports = mongoose.model("usersCollection", usersDataSchema, "users");