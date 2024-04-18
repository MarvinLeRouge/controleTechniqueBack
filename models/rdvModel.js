const express = require("express");
const mongoose = require("mongoose");
const { config } = require("../middleware/config");

const rdvSchema = new mongoose.Schema({
    date: Date,
    truck: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "truck",
        required: true
    },
    bridge: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "bridge",
        required: true
    },
}, {
    timestamps: true 
});
const model = new mongoose.model("rdv", rdvSchema, "rdvs");

module.exports = model