const express = require("express");
const mongoose = require("mongoose");
const { config } = require("../middleware/config");

const truckSchema = new mongoose.Schema({
    immatriculation: String,
    marque: String,
    modele: String,
    client: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "client",
        required: true
    }
}, {
    timestamps: true 
});
const model = new mongoose.model("truck", truckSchema, "trucks");

module.exports = model