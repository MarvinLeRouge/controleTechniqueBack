const express = require("express");
const swaggerJsDoc = require("swagger-jsdoc")
const swaggerUi = require("swagger-ui-express")
const cors = require('cors');
const { config } = require("./middleware/config.js");
const bodyParser = require("body-parser");
const clientRouter = require("./routes/clientRoutes.js");
const truckRouter = require("./routes/truckRoutes.js");
const bridgeRouter = require("./routes/bridgeRoutes.js");
const rdvRouter = require("./routes/rdvRoutes.js");
const staticRouter = require("./routes/staticRoutes.js");
const mongoose = require("mongoose");
console.log("config onload", config)


const API_VERSION = "v1"
const port = 8000;

const app = express();
/*
app.use(cors(corsOptions))
*/
app.use(cors())
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
    console.log("myInit", config)
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

const swaggerOptions = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Truckbuster API documentation",
            version: "0.1",
            description: "Truckbuster's API is a simple API for trucks technical inspection. Based on nodeJS.",
            contact: {
                name: "Jean Ceugniet",
                email: "jean.ceugniet@gmail.com"
            }
        },
        servers: [
            {
                url: config["API_URL"],
            },
        ]
    },
    apis: ["./routes/*.js"],
}
const spacs = swaggerJsDoc(swaggerOptions)
app.use(
    "/api-doc",
    swaggerUi.serve,
    swaggerUi.setup(spacs)
)
app.listen(port, () => {
    console.log("Listening");
});
