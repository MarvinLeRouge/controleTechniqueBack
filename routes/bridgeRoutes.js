const express = require("express");
const router = express.Router()
const bridgeController = require("../controllers/bridgeController.js");

router.get("/", bridgeController.findAll);
router.get("/count", bridgeController.countAll);
router.get("/:id", bridgeController.findById);
router.post("/", bridgeController.create)

module.exports = router