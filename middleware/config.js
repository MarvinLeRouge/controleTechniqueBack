const dotenv = require("dotenv")
dotenv.config()

/**
 * 
 * Chargement des variables de configuration
 * 
 */
const configLoad = () => {
    let result = {}
    const envPrefix = "CTRDV_"
    Object.keys(process.env).forEach(function(key) {
        if(key.indexOf(envPrefix) === 0) {
            result[key.replace(envPrefix, "")] = process.env[key]
        }
    })
    for(var key1 in result) {
        let value1 = result[key1]
        for(var key2 in result) {
            if(key1 != key2) {
                let value2 = result[key2]
                let alias = "[[" + key2 +"]]"
                if(value1.indexOf(alias) !== -1) {
                    value1 = value1.replace(alias, value2)
                }
            }
        }
        result[key1] = value1
    }
    for(key in result) {
        if(result[key] == parseInt(result[key])) {
            result[key] = parseInt(result[key])
        }
    }

    console.log("configLoad", result)

    return result
}


module.exports = {
    config: configLoad()
};