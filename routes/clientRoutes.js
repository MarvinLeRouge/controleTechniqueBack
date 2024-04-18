const express = require("express");
const router = express.Router()
const clientController = require("../controllers/clientController.js");

router.get("/", clientController.findAll);
router.get("/:id", clientController.findById);
router.post("/", clientController.create)

module.exports = router