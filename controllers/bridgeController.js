const express = require("express");
const { config } = require("../middleware/config");
const model = require("../models/bridgeModel.js")
const rdvModel = require("../models/rdvModel.js")

const controller = {
    findAll:  async (req, res) => {
        console.log("bridgeController findAll");
        const filter = {};
        model.find(filter).then(result => {
            if(!result.length) {
                res.status(200).json({"status":"empty"});
            }
            else {
                res.status(200).json({"status":"ok", "data":result});
            }
        }).catch((error) => {
            console.log(error)
            res.status(500).json({"status":"pb", "msg":"Erreur serveur. Admin informé."})
        })
    },

    findById: async (req, res) => {
        console.log("bridgeController findById", );
        const filter = {"_id":req.params.id};
        model.find(filter).then(result => {
            if(!result.length) {
                res.status(200).json({"status":"empty"});
            }
            else {
                res.status(200).json({"status":"ok", "data":result[0]});
            }
        }).catch((error) => {
            console.log(error)
            res.status(500).json({"status":"pb", "msg":"Erreur serveur. Admin informé."})
        })
    },

    create: async (req, res) => {
        console.log("bridgeController create");
        try {
            const doc = new model({
                "nom": req.body.nom        
            })
            const errors = doc.validateSync();
            if(!errors) {
                doc.save().then(savedDoc => {
                    console.log("savedDoc", savedDoc)
                    res.status(201).json({"status":"ok", "id" : savedDoc._id});
                }).catch((error) => {

                })
            }
            else {
                console.log(error)
                res.status(500).json({"status":"pb", "msg":"Erreur serveur. Admin informé."})
            }
        }
        catch(error) {
            console.log(error)
            res.status(500).json({"status":"pb", "msg":"Erreur serveur. Admin informé."})
        }
    },

    countAll: async (req, res) => {
        console.log("bridgeController countAll");
        try {
            const filter = {};
            model.find(filter).then(result => {
                res.status(200).json({"status":"ok", "count":result.length});
            })
        }
        catch(error) {
            console.log(error)
            res.status(500).json({"status":"pb", "msg":"Erreur serveur. Admin informé."})
        }
    },

    firstAvailable: async (req, res) => {
        console.log("bridgeController nextAvailable");
        try {
            const filter = {"date": req.params.rdvDate};
            rdvModel.find(filter).then(result => {
                let bridgeIdPris = []
                result.forEach(function(item) {
                    bridgeIdPris.push(item["bridge"])
                })
                return bridgeIdPris
            }).then(bridgeIdPris => {
                console.log("bridgeIdPris", bridgeIdPris)
                return model.find({}).then(bridges => {
                    let bridgeIdAll = []
                    bridges.forEach(function(bridge) {
                        bridgeIdAll.push(bridge["_id"].toString())
                    })
                    console.log("bridgeIdAll", bridgeIdAll)
                    let bridgeIdDispos = []
                    console.log("bridgeIdDispos", bridgeIdDispos)
                    bridgeIdAll.forEach((id) => {
                        console.log(id, id.toString())
                        let found = false
                        bridgeIdPris.forEach((idPris) => {
                            if(id.toString() == idPris.toString()) {
                                found = true
                            }
                        })
                        if(!found) {
                            bridgeIdDispos.push(id)
                        }
                    })
                    console.log("bridgeIdDispos", bridgeIdDispos)

                    return bridgeIdDispos
                })
            }).then(bridgeIdDispos => {
                bridgeIdDispos = bridgeIdDispos.slice(0, 1)
                console.log(bridgeIdDispos)
                res.status(200).json({"status":"ok", "data":bridgeIdDispos});
            })
        }
        catch(error) {
            console.log(error)
            res.status(500).json({"status":"pb", "msg":"Erreur serveur. Admin informé."})
        }
    },


}

module.exports = controller
