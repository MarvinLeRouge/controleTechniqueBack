const express = require("express");
const mongoose = require("mongoose");
const { config } = require("../middleware/config");

const staticSchema = new mongoose.Schema({
    label: String,
    value: String,
}, {
    timestamps: true
});
const model = new mongoose.model("static", staticSchema, "static");


module.exports = model