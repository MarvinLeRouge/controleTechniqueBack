const express = require("express");

/**
 * var router = express.Router()
 * @param {int} value 
 * @param {int} length 
 * @returns string value of argument, padded to the left with "0", to length "length"
 */
const padLeft = (value, length) => {
    let result = "" + value
    while (result.length < length) {
        result = "0" + result
    }
    return result
}

/**
 * 
 * @returns La date courante plus l'heure courante, formatée
 */
const getFormatedDateTime = (dateStr = null) => {
    let dateObj = null
    if(!dateStr) {
        dateObj = new Date();
    }
    else {
        dateObj = new Date(dateStr)
    }
    let result = getFormatedDate(dateObj) + " " + getFormatedTime(dateObj)

    return result
};

/**
 * 
 * @returns La date courante plus l'heure courante, formatée
 */
const getFormatedDate = (dateStrOrObj = null) => {
    let dateObj = null
    let result = null
    if(!dateStrOrObj) {
        dateObj = new Date()
    }
    else if((dateStrOrObj instanceof String) || (typeof dateStrOrObj == "string")) {
        dateObj = new Date(dateStrOrObj)
    }
    else if(dateStrOrObj instanceof Date) {
        dateObj = dateStrOrObj
    }
    console.log("dateObj", dateObj)
    if(dateObj) {
        let year = dateObj.getFullYear();
        let month = padLeft(dateObj.getMonth() + 1, 2);
        let date = padLeft(dateObj.getDate(), 2);
        result = date + "/" + month + "/" + year
    }

    return result
};

/**
 * 
 * @returns La date courante plus l'heure courante, formatée
 */
const getFormatedTime = (dateStrOrObj = null) => {
    let dateObj = null
    let result = null
    if(!dateStrOrObj) {
        dateObj = new Date()
    }
    else if((dateStrOrObj instanceof String) || (typeof dateStrOrObj == "string")) {
        dateObj = new Date(dateStrOrObj)
    }
    else if(dateStrOrObj instanceof Date) {
        dateObj = dateStrOrObj
    }
    if(dateObj) {
        let hours = padLeft(dateObj.getHours(), 2);
        let minutes = padLeft(dateObj.getMinutes(), 2);
        result = hours + "h" + minutes
    }

    return result
};


module.exports = {
    padLeft,
    getFormatedDate,
    getFormatedTime,
    getFormatedDateTime
}