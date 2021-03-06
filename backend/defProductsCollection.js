const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// this will be our data base's data structure 
const DataSchema = new Schema(
            {
        "idIngredient": String,
        "strIngredient": String,
        "strDescription": String,
        "strType": String
    },
{ timestamps: true }
);

// export the new Schema so we could modify it using Node.js
module.exports = mongoose.model("productsData", DataSchema, "products");