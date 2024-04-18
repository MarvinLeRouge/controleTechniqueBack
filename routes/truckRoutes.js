const express = require("express");
const router = express.Router()
const truckController = require("../controllers/truckController.js");

router.get("/", truckController.findAll);
router.get("/:id", truckController.findById);
router.post("/", truckController.create)

module.exports = router