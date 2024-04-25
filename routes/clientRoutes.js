const express = require("express");
const router = express.Router()
const clientController = require("../controllers/clientController.js");

/**
 * @swagger
 * /client:
 *      get:
 *          tags:
 *              - Client
 *          summary: Retrieve full list of clients
 *          responses:
 *              200:
 *                  description:    A list of all clients
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
 *                                              email:
 *                                                  type:   string
 *                                                  description:    The client's email
 *                                              nom:
 *                                                  type:   string
 *                                                  description:    The client's lastname
 *                                              prenom:
 *                                                  type:   string
 *                                                  description:    The client's firstname
 *                                              telephone:
 *                                                  type:   string
 *                                                  format: phone
 *                                                  description:    The client's phone number
 *                                              entrepriseNom:
 *                                                  type:   string
 *                                                  description:    The name of the corporation for which the client is presenting a truck
 *                                              entrepriseAdresse:
 *                                                  type:   string
 *                                                  description:    The address of the corporation for which the client is presenting a truck
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
router.get("/", clientController.findAll);
/**
 * @swagger
 * /client/{clientId}:
 *      get:
 *          tags:
 *              - Client
 *          summary: Get client by id
 *          parameters:
 *              -   name: clientId
 *                  in: path
 *                  description: the id of the client
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
 *                                      type:   array
 *                                      items:
 *                                          type:   object
 *                                          properties:
 *                                              _id:
 *                                                  type:   string
 *                                                  description:    MongoDB object ID
 *                                              email:
 *                                                  type:   string
 *                                                  description:    The client's email
 *                                              nom:
 *                                                  type:   string
 *                                                  description:    The client's lastname
 *                                              prenom:
 *                                                  type:   string
 *                                                  description:    The client's firstname
 *                                              telephone:
 *                                                  type:   string
 *                                                  format: phone
 *                                                  description:    The client's phone number
 *                                              entrepriseNom:
 *                                                  type:   string
 *                                                  description:    The name of the corporation for which the client is presenting a truck
 *                                              entrepriseAdresse:
 *                                                  type:   string
 *                                                  description:    The address of the corporation for which the client is presenting a truck
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
router.get("/:id", clientController.findById);
/**
 * @swagger
 * /client:
 *      post:
 *          tags:
 *              - Client
 *          summary: Create a new client
 *          parameters:
 *              -   name: email
 *                  in: query
 *                  description: The client's email
 *                  required: true
 *              -   name: nom
 *                  in: query
 *                  description: The client's lastname
 *                  required: true
 *              -   name: prenom
 *                  in: query
 *                  description: The client's firstname
 *                  required: true
 *              -   name: telephone
 *                  in: query
 *                  description: The client's phone number
 *                  required: true
 *              -   name: entrepriseNom
 *                  in: query
 *                  description: The name of the corporation for which the client is presenting a truck
 *                  required: true
 *              -   name: entrepriseAdresse
 *                  in: query
 *                  description: The address of the corporation for which the client is presenting a truck
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
router.post("/", clientController.create)

module.exports = router