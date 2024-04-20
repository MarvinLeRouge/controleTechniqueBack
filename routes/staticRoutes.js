const express = require("express");
const router = express.Router()
const staticController = require("../controllers/staticController.js");
const horairesController = require("../controllers/horaireController.js");

router.get("/horaires", horairesController.findAll);
router.get("/", staticController.findAll);

module.exports = router