const express = require("express");
const router = express.Router()
const truckController = require("../controllers/truckController.js");

/**
 * @swagger
 * /truck:
 *      get:
 *          tags:
 *              - Truck
 *          summary: Retrieve full list of trucks
 *          responses:
 *              200:
 *                  description:    A list of all trucks
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
 *                                              immatriculation:
 *                                                  type:   string
 *                                                  description:    The truck license plate
 *                                              marque:
 *                                                  type:   string
 *                                                  description:    The truck  make
 *                                              modele:
 *                                                  type:   string
 *                                                  description:    The truck model
 *                                              client:
 *                                                  type:   string
 *                                                  description:    MongoDB object ID of the associated client. Each truck is associated with the client that bring it to the workshop.
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
router.get("/", truckController.findAll);
/**
 * @swagger
 * /truck/{truckId}:
 *      get:
 *          tags:
 *              - Truck
 *          summary: Get truck by id
 *          parameters:
 *              -   name: truckId
 *                  in: path
 *                  description: the id of the truck
 *                  required: true
 *          responses:
 *              200:
 *                  description:    All attributes of the specified truck
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
 *                                          immatriculation:
 *                                              type:   string
 *                                              description:    The truck license plate
 *                                          marque:
 *                                              type:   string
 *                                              description:    The truck make
 *                                          modele:
 *                                              type:   string
 *                                              description:    The truck model
 *                                          client:
 *                                              type:   object
 *                                              description:    The full client object associated with this truck
 *                                          createdAt:
 *                                              type:   string
 *                                              format: date-time
 *                                              description:    Item creation date
 *                                          modifiedAt:
 *                                              type:   string
 *                                              format: date-time
 *                                              description:    Item modification date
 * 
 * 
 */
router.get("/:id", truckController.findById);
/**
 * @swagger
 * /truck:
 *      post:
 *          tags:
 *              - Truck
 *          summary: Create a new truck
 *          parameters:
 *              -   name: immatriculation
 *                  in: query
 *                  description: The truck license plate
 *                  required: true
 *              -   name: marque
 *                  in: query
 *                  description: The truck make
 *                  required: true
 *              -   name: modele
 *                  in: query
 *                  description: The truck model
 *                  required: true
 *              -   name: client
 *                  in: query
 *                  description: MongoDB objectId of the client associated with the truck
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
router.post("/", truckController.create)

module.exports = router