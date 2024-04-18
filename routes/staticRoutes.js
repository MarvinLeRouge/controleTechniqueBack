const express = require("express");
const router = express.Router()
const staticController = require("../controllers/staticController.js");

router.get("/", staticController.findAll);
router.get("/:id", staticController.findById);
router.post("/", staticController.create)

module.exports = router