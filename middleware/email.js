const express = require("express");
const { config } = require("../middleware/config");
const nodemailer = require("nodemailer");
const utils = require("./utils.js");

const transporter = nodemailer.createTransport({
    service: "Gmail",
    host: "smtp.gmail.com",
    port: 465,
    secure: false,
    auth: {
        user: config["GMAIL_USER"],
        pass: config["GMAIL_PASSWORD"],
    },
});

const send = (data) => {
    const mailOptions = {
        from: {
            name: "Jean Ceugniet",
            address: config["GMAIL_USER"]
        },
        to: data["to"],
        subject: data["subject"],
        text: data["text"],
        html: data["html"] || data["text"]
    };
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error("Error sending email: ", error);
        } else {
            console.log("Email sent: ", info.response);
        }
    });
}

const sendRdv = (data) => {
    let rdvDate = new Date(data.rdv.date)
    let rdvDateDate = utils.getFormatedDate(rdvDate)
    let rdvDateTime = utils.getFormatedTime(rdvDate)
    let mailData = {
        "to": {
            name: data.client.prenom + " " + data.client.nom,
            address: data.client.email
        },
        "subject": `${config["CENTRE_NOM"]} - Votre contrôle technique du ${rdvDateDate} à ${rdvDateTime}`,
        "text":`
            Bonjour,
            Votre rendez-vous du ${rdvDateDate} à ${rdvDateTime} pour un véhicule ${data.truck.marque} ${data.truck.modele} immatriculé ${data.truck.immatriculation} a bien été enregistré.
            Merci de bien vouloir respecter l'horaire du rendez-vous, et de nous prévenir dans les plus brefs délais si jamais vous n'êtes pas en mesure de respecter l'horaire prévu.
            
            Cordialement,
            L'équipe ${config["CENTRE_NOM"]}`,
        "html":`
        <p>
        Bonjour,<br><br>
        Votre rendez-vous du <strong>${rdvDateDate} à ${rdvDateTime}</strong> pour un véhicule <em>${data.truck.marque} ${data.truck.modele}</em> immatriculé <em>${data.truck.immatriculation}</em> a bien été enregistré.
        </p>
        <p>
        Merci de bien vouloir respecter l'horaire du rendez-vous, et de nous prévenir dans les plus brefs délais si jamais vous n'êtes pas en mesure de respecter l'horaire prévu.
        </p>
        <p>        
        Cordialement,<br>
        L'équipe ${config["CENTRE_NOM"]}
        </p>`
    }
    send(mailData)
}

module.exports = {
    send,
    sendRdv
}