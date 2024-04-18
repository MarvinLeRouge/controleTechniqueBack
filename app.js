const express = require("express");
const bodyParser = require("body-parser");
const clientRouter = require("./routes/clientRoutes.js");
const truckRouter = require("./routes/truckRoutes.js");
const bridgeRouter = require("./routes/bridgeRoutes.js");
const rdvRouter = require("./routes/rdvRoutes.js");
const staticRouter = require("./routes/staticRoutes.js");
const mongoose = require("mongoose");
const { config } = require("./middleware/config");
console.log("config onload", config)
//require("middleware/utils.js")


const API_VERSION = "v1"
const port = 8000;

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const dbConnect = () => {
    console.log("connectToDB >>")
    console.log("config dbConnect", config)
    try {
        mongoose.connect(config["DB_SRC"], {
            autoIndex: true
        })
        console.log("Connected to Mongodb Atlas");
    }
    catch(error) {
        console.error("Erreur de connexion à la base de données");
    }
            
    console.log("<< connectToDB")
}


const myinit = () => {
    dbConnect();
}

// Routes
app.use(`/api/${API_VERSION}/bridge`, bridgeRouter);
app.use(`/api/${API_VERSION}/client`, clientRouter);
app.use(`/api/${API_VERSION}/rdv`, rdvRouter);
app.use(`/api/${API_VERSION}/static`, staticRouter);
app.use(`/api/${API_VERSION}/truck`, truckRouter);

// Lancement
console.clear();
myinit();
app.listen(port, () => {
    console.log("Listening");
});
