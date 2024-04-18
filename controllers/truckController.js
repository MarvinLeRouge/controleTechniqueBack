const express = require("express");
const { config } = require("../middleware/config");
const model = require("../models/truckModel.js")

const controller = {
    findAll: async (req, res) => {
        console.log("truckController findAll");
        const filter = {};
        model.find(filter).then(result => {
            if(!result.length) {
                res.status(200).json({"status":"empty"});
            }
            else {
                res.status(200).json({"status":"ok", "data":result});
            }
        })
    },

    findById: async (req, res) => {
        console.log("truckController findById");
        console.log("params", req.params)
        const filter = {"_id":req.params.id};
        model.find(filter).populate("client").then(result => {            
            if(!result.length) {
                res.status(200).json({"status":"empty"});
            }
            else {
                res.status(200).json({"status":"ok", "data":result[0]});
            }
        })
    },

    create: async (req, res) => {
        console.log("truckController create");
        const doc = new model({
            "immatriculation": req.body.immatriculation,
            "marque": req.body.marque,
            "modele": req.body.modele,
            "client": req.body.clientId
        })
        const errors = doc.validateSync();
        if(!errors) {
            doc.save().then(savedDoc => {
                console.log("savedDoc", savedDoc)
                res.status(201).json({"status":"ok", "id" : savedDoc._id});
            })
        }
        else {
            res.status(500).json({"status":"pb", "msg":"Pb saisie"})
        }
    }
}

module.exports = controller