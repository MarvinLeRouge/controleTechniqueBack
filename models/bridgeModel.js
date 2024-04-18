const express = require("express");
const mongoose = require("mongoose");
const { config } = require("../middleware/config");

const bridgeSchema = new mongoose.Schema({
    nom: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});
const model = new mongoose.model("bridge", bridgeSchema, "bridges");

module.exports = model