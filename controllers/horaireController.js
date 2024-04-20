const express = require("express");
const { config } = require("../middleware/config.js");
const model = require("../models/horaireModel.js")

const controller = {
    findAll:  async (req, res) => {
        console.log("horaireController findAll");
        res.status(200).json({"status":"ok", "data":model});
    }
}

module.exports = controller
