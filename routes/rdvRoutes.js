const express = require("express");
const router = express.Router()
const rdvController = require("../controllers/rdvController.js");

/**
 * @swagger
 * /rdv:
 *      get:
 *          tags:
 *              - Rdv
 *          summary: Retrieve full list of scheduled visits
 *          responses:
 *              200:
 *                  description:    A list of all visits
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
 *                                              date:
 *                                                  type:   string
 *                                                  format: date-time
 *                                                  description:    The visit date
 *                                              truck:
 *                                                  type:   string
 *                                                  description:    The object id of the truck associated with the visit
 *                                              bridge:
 *                                                  type:   string
 *                                                  description:    The object id of the bridge associated with the visit
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
router.get("/", rdvController.findAll);
/**
 * @swagger
 * /rdv/synthese:
 *      get:
 *          tags:
 *              - Rdv
 *          summary: Retrieve full list of scheduled visits
 *          responses:
 *              200:
 *                  description:    Synthetic list giving the number of scheduled visits, grouped by date and time
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
router.get("/synthese", rdvController.synthese);
/**
 * @swagger
 * /rdv/{rdvId}:
 *      get:
 *          tags:
 *              - Rdv
 *          summary: Get rdv by id
 *          parameters:
 *              -   name: rdvId
 *                  in: path
 *                  description: the id of the rdv
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
 *                                              description:    MongoDB object ID
 *                                          date:
 *                                              type:   string
 *                                              description:    The client's email
 *                                          truck:
 *                                              type:   string
 *                                              description:    The client's lastname
 *                                          bridge:
 *                                              type:   string
 *                                              description:    The client's firstname
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
router.get("/:id", rdvController.findById);
/**
 * @swagger
 * /rdv:
 *      post:
 *          tags:
 *              - Rdv
 *          summary: Create a new scheduled visit
 *          parameters:
 *              -   name: date
 *                  in: query
 *                  description: The visit's datetime
 *                  required: true
 *              -   name: truck
 *                  in: query
 *                  description: MongoDB objectId of the truck associated with the visit
 *                  required: true
 *              -   name: bridge
 *                  in: query
 *                  description: MongoDB objectId of the bridge associated with the visit
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
router.post("/", rdvController.create)

module.exports = router