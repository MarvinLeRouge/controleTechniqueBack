const express = require("express");
const router = express.Router()
const staticController = require("../controllers/staticController.js");
const horairesController = require("../controllers/horaireController.js");

/**
 * @swagger
 * /static/horaires:
 *      get:
 *          tags:
 *              - Static
 *          summary: Retrieve full list of workshop opening hours
 *          responses:
 *              200:
 *                  description:    A list of all workshop opening hours, day by day
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type:   object
 *                              properties:
 *                                  status:
 *                                      type:   string
 *                                      description: Potential values are "ok" and "pb"
 *                                  data:
 *                                      type:   array
 *                                      items:
 *                                          type:   object
 *                                          properties:
 *                                              _id:
 *                                                  type:   string
 *                                                  description:    MongoDB object ID
 *                                              jour:
 *                                                  type:   string
 *                                                  description:    The week day
 *                                              start:
 *                                                  type:   integer
 *                                                  description:    The opening hour
 *                                              stop:
 *                                                  type:   integer
 *                                                  description:    The closing hour
 *                                              createdAt:
 *                                                  type:   string
 *                                                  format: date-time
 *                                                  description:    Item creation date
 *                                              modifiedAt:
 *                                                  type:   string
 *                                                  format: date-time
 *                                                  description:    Item modification date
 *              500:
 *                  description:    query failed. Server error.
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type:   object
 *                              properties:
 *                                  status:
 *                                      type:   string
 *                                      description: Can only be "pb"
 *                                  msg:
 *                                      type:   string
 *                                      description:    Server error description
 */
router.get("/horaires", horairesController.findAll);
/**
 * @swagger
 * /static:
 *      get:
 *          tags:
 *              - Static
 *          summary: Retrieve full list of static data
 *          responses:
 *              200:
 *                  description:    A list of all static data
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type:   object
 *                              properties:
 *                                  status:
 *                                      type:   string
 *                                      description: Potential values are "ok" and "pb"
 *                                  data:
 *                                      type:   array
 *                                      items:
 *                                          type:   object
 *                                          properties:
 *                                              _id:
 *                                                  type:   string
 *                                                  description:    MongoDB object ID
 *                                              nom:
 *                                                  type:   string
 *                                                  description:    The static label
 *                                              value:
 *                                                  type:   string
 *                                                  description:    The static value. The generic nature of this collection renders the string type mandatory.
 *                                              createdAt:
 *                                                  type:   string
 *                                                  format: date-time
 *                                                  description:    Item creation date
 *                                              modifiedAt:
 *                                                  type:   string
 *                                                  format: date-time
 *                                                  description:    Item modification date
 *              500:
 *                  description:    query failed. Server error.
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type:   object
 *                              properties:
 *                                  status:
 *                                      type:   string
 *                                      description: Can only be "pb"
 *                                  msg:
 *                                      type:   string
 *                                      description:    Server error description
 */
router.get("/", staticController.findAll);

module.exports = router