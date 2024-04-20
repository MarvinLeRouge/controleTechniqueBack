const express = require("express");
const router = express.Router()
const rdvController = require("../controllers/rdvController.js");

router.get("/synthese", rdvController.synthese);
router.get("/", rdvController.findAll);
router.get("/:id", rdvController.findById);
router.post("/", rdvController.create)

module.exports = router