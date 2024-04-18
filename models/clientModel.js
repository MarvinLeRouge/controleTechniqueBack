const express = require("express");
const mongoose = require("mongoose");
const { config } = require("../middleware/config");

const clientSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        match: /^[a-z][a-z0-9\-_]+(?:\.[a-z0-9\-_]+)*\@(?:[a-z0-9\-_]+\.)+[a-z0-9\-_]{1,6}$/,
    },
    nom: {
        type: String,
        required: true
    },
    prenom: {
        type: String,
        required: true
    },
    telephone: {
        type: String, 
        required: true,
        match: /^0[6-7]\d{8}$/,
    },
    entrepriseNom : {
        type: String,
        required: true
    },
    entrepriseAdresse: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});
const model = new mongoose.model("client", clientSchema, "clients");

module.exports = model