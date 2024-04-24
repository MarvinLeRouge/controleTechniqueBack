const express = require("express");
const router = express.Router()
const bridgeController = require("../controllers/bridgeController.js");

/**
 * @swagger
 * /bridge:
 *      get:
 *          tags:
 *              - Bridge
 *          summary: Retrieve full list of bridges
 *          responses:
 *              200:
 *                  description:    A list of all bridges
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
 *                                                  description:    The bridge "name"
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
router.get("/", bridgeController.findAll);
/**
 * @swagger
 * /bridge/count:
 *      get:
 *          tags:
 *              - Bridge
 *          summary: Retrieve number of bridges
 *          responses:
 *              200:
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type:   object
 *                              properties:
 *                                  status:
 *                                      type:           string
 *                                      description:    Potential values are "ok" and "pb"
 *                                  count:
 *                                      type:           integer
 *                                      description:    Number of bridges
 *              500:
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
 *                  
 *                  
 */
router.get("/count", bridgeController.countAll);
/**
 * @swagger
 * /bridge/firstAvailable/{rdvDate}:
 *      get:
 *          tags:
 *              - Bridge
 *          summary: Getfirst available bridge at given date
 *          parameters:
 *              -   name: rdvDate
 *                  in: path
 *                  description: the date at which the user wants to know the first available bridge
 *                  required: true * 
 *          responses:
 *              200:
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
 *                                                  description:    The bridge "name"
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
 * 
 */
router.get("/firstAvailable/:rdvDate", bridgeController.firstAvailable);
/**
 * @swagger
 * /bridge/{bridgeId}:
 *      get:
 *          tags:
 *              - Bridge
 *          summary: Get bridge by id
 *          parameters:
 *              -   name: bridgeId
 *                  in: path
 *                  description: the id of the bridge
 *                  required: true
 *          responses:
 *              200:
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type:   object
 *                              properties:
 *                                  status:
 *                                      type:   string
 *                                      description: Potential values are "ok" and "pb"
 *                                  data:
 *                                      type:   object
 *                                      properties:
 *                                          _id:
 *                                              type:   string
 *                                              description:    MongoDB object ID
 *                                          nom:
 *                                              type:   string
 *                                              description:    The bridge "name"
 *                                          createdAt:
 *                                              type:   string
 *                                              format: date-time
 *                                              description:    Item creation date
 *                                          modifiedAt:
 *                                              type:   string
 *                                              format: date-time
 *                                              description:    Item modification date
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
router.get("/:id", bridgeController.findById);
/**
 * @swagger
 * /bridge:
 *      post:
 *          tags:
 *              - Bridge
 *          summary: Create a new bridge
 *          parameters:
 *              -   name: nom
 *                  in: query
 *                  description: the name of the bridge
 *                  required: true
 *          responses:
 *              200:
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type:   object
 *                              properties:
 *                                  status:
 *                                      type:           string
 *                                      description:    Potential values are "ok" and "pb"
 *                                  id:
 *                                      type:           string
 *                                      description:    the mongoDb objectId of the newly created item
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
router.post("/", bridgeController.create)

module.exports = router