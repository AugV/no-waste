
const mongoose = require('mongoose');
const express = require('express');
var cors = require('cors');
const bodyParser = require('body-parser');
const logger = require('morgan');
// const Data = require('./data');
const userData = require('./usersCollection');
const productData = require('./defProductsCollection');
const request = require('request');

const API_PORT = 3001;
const app = express();
app.use(cors());
const router = express.Router();

// this is our MongoDB database
const dbRoute = "mongodb+srv://Admin:drdnt123@no-waste-db-uvhq9.mongodb.net/no-waste-app?retryWrites=true";

// connects our back end code with the database
mongoose.connect(
    dbRoute,
    { useNewUrlParser: true }
);

let db = mongoose.connection;

db.once("open", () => console.log("connected to the database"));
// checks if connection with the database is successful
db.on("error", console.error.bind(console, "MongoDB connection error:"));

// (optional) only made for logging and
// bodyParser, parses the request body to be a readable json format
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger("dev"));

request('https://www.themealdb.com/api/json//v1/1/list.php?i=list', { json: true }, (err, res, body) => {
    if (err) { return console.log(err); }
    if (body) {
        products = body.meals;
        try {
            console.log("removing old data from " + productData.collection.name.toUpperCase);
            productData.deleteMany({}, (e) => { console.log(e) });
            console.log("adding new data to " + productData.collection.name.toUpperCase);
            productData.insertMany(products);
        } catch (e) { console.log(e) }
    }
    else { console.log("nothing received from MealDB") }
});

// userData.create({
//     "userName": "mock",
//     "userEmail": "mock@email.com",
//     "products": [{
//         "productId": "2",
//         "productName": "Salmon",
//         "description": "mock descr",
//         "creationDate": null,
//         "modificationDate": null,
//         "expirydate": null,
//         "category": "Fish",
//         "priority": null
//     }]
// }, (err, res) => {
//     if (err) { return console.log(err); }
//     else{console.log("MOCK ADDED");}
// })


router.get("/userData", (req, res) => {
    userEmail = req.query.userEmail;

    userData.findOne({ "userEmail": userEmail }, (err, data) => {
        if (err) return res.json({ success: false, error: err });
        return res.json({ success: true, data: data });
    });
});


router.get("/productList", (req, res) => {
    productData.find({}, (err, data) => {
        if (err) return res.json({ success: false, error: err });
        return res.json({ success: true, data: data });
    })
})

router.post("/addProduct", (req, res) => {
    console.log(req.body.userEmail);
    var product = {
        "productId": req.body.productId,
        "productName": req.body.productName,
        "description": req.body.description,
        "creationDate": "under-construction XD",
        "modificationDate": "under-construction XD",
        "expirydate": req.body.expirydate,
        "category": "under-construction XD",
        "priority": 1
    }
    userData.findOneAndUpdate(
        { userEmail: req.body.userEmail },
        { $push: { products: product } },
        function (error, success) {
            if (error) {
                console.log(error);
            } else {
                console.log(success);
            }
        }
    )
}
)

// // append /api for our http requests
app.use("/api", router);

// launch our backend into a port
app.listen(API_PORT, () => console.log(`LISTENING ON PORT ${API_PORT}`));