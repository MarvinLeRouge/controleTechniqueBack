const express = require("express");
const { config } = require("../middleware/config");
const model = require("../models/clientModel.js")

const controller = {
    findAll: async (req, res) => {
        console.log("clientController findAll");
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
        console.log("clientController findById");
        const filter = {"_id":req.params.id};
        model.find(filter).then(result => {
            if(!result.length) {
                res.status(200).json({"status":"empty"});
            }
            else {
                res.status(200).json({"status":"ok", "data":result[0]});
            }
        })
    },

    create: async (req, res) => {
        console.log("clientController create");
        const doc = new model({
            "email": req.body.email,
            "nom": req.body.nom,
            "prenom": req.body.prenom,
            "telephone": req.body.telephone,
            "entrepriseNom": req.body.entrepriseNom,
            "entrepriseAdresse": req.body.entrepriseAdresse,
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