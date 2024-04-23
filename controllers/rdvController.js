const express = require("express");
const { config } = require("../middleware/config");
const model = require("../models/rdvModel.js")
const truckModel = require("../models/truckModel.js")
const bridgeModel = require("../models/bridgeModel.js")
const clientModel = require("../models/clientModel.js")
const horaireModel = require("../models/horaireModel.js")
const email = require("../middleware/email.js")
const utils = require("../middleware/utils.js")

const controller = {
    findAll: async (req, res) => {
        console.log("rdvController findAll");
        const filter = {};
        model.find(filter).then((result) => {
            if(!result.length) {
                res.status(200).json({"status":"empty"});
            }
            else {
                res.status(200).json({"status":"ok", "data":result});
            }
        })
    },

    findById: async (req, res) => {
        console.log("rdvController findById");
        const filter = {"_id":req.params.id};
        model.find(filter).then((result) => {
            if(!result.length) {
                res.status(200).json({"status":"empty"});
            }
            else {
                res.status(200).json({"status":"ok", "data":result[0]});
            }
        })
    },

    create: async (req, res) => {
        console.log("rdvController create");
        const doc = new model({
            "date": req.body.date,
            "truck": req.body.truck,
            "bridge": req.body.bridge
        })
        const errors = doc.validateSync();
        if(!errors) {
            doc.save().then((savedDoc) => {
                console.log("savedDoc", savedDoc)
                truckModel.find({"_id":savedDoc.truck}).populate("client").then((truck) => {
                    truck = truck[0]
                    console.log("truckModel", truck)    
                    let client = truck.client
                    let now = utils.getFormatedDate()
                    email.sendRdv({"rdv" : savedDoc, "truck": truck, "client" : client})
                })
                savedDoc.populate("truck")
                console.log("savedDoc", savedDoc)

                /*
                */
                res.status(201).json({"status":"ok", "id" : savedDoc._id});
            })
        }
        else {
            res.status(500).json({"status":"pb", "msg":"Pb saisie"})
        }
    },

    findNextAvailable: async (req, res) => {
        console.log("rdvController findNextAvailable")
        let result = {"status": "foo"}

        // 1 Récupérer le nombre de ponts

        // 2a Récupérer la liste des dates de rdv futurs sur un délai d'un mois
        // 2b Récupérer la liste des rdv futurs sur un délai d'un mois

        // 3a Pour chacune des dates, calculer les créneaux potentiels
        // 3b Pour chacun des créneaux, vérifier si le nombre de créneaux pris est inférieur au nombre de ponts

        // 4 Si oui, créer un nouveau rdv, avec l'attribut confirmed = false


        res.status(201).json(result);
    },

    synthese: async(req, res) => {
        console.log("rdvController synthese")
        let heureStartMin = 24
        let heureStopMax = 0
        horaireModel.forEach(function(horairesJour) {
            if(!Object.is(horairesJour.start, null)) {
                heureStartMin = Math.min(heureStartMin, horairesJour.start)
            }
            if(!Object.is(horairesJour.stop, null)) {
                heureStopMax = Math.max(heureStopMax, horairesJour.stop)
            }
        })
        let today = new Date()
        let tomorrow = new Date()
        tomorrow.setDate(today.getDate() + 1)
        tomorrow = utils.getFormatedDateIntl(tomorrow)
        const filter = {
            date: {
                $gte: tomorrow
            }
        };

        model.find(filter).sort({date: "asc"}).then((rdvs) => {
            console.log("in model", heureStartMin, heureStopMax)

            if(!rdvs.length) {
                res.status(200).json({"status":"empty"});
            }
            else {
                console.log("VISIT_DURATION_H", config["VISIT_DURATION_H"])
                console.log("CALC VISIT_DURATION_H", 5 + config["VISIT_DURATION_H"])
                let result = {}
                let rdvDateDate = null
                let rdvDateTime = null
                rdvs.forEach(rdv => {
                    rdvDateDate = utils.getFormatedDateIntl(rdv.date)
                    rdvDateTime = rdv.date.getHours()
                    if(!(rdvDateDate in result)) {
                        result[rdvDateDate] = {}
                        for(let h = heureStartMin; h < heureStopMax; h+= config["VISIT_DURATION_H"]) {
                            console.log("h", h)
                            result[rdvDateDate][h] = 0;    
                        }
                        console.log("result", result)
                    }
                    result[rdvDateDate][rdvDateTime]++;
                    console.log("result", result)                    
                });
                res.status(200).json({"status":"ok", "data":result});
            }
        })


    }




}

module.exports = controller