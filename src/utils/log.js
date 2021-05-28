"use strict";
require("colors");

exports.successLog = ( message ) => {
    return console.log(`[ ${message} ]`.rainbow);
}

exports.infoLog = ( message ) => {
    return console.log(`[ ${message} ]`.blue);
}

exports.warningLog = ( message ) => {
    return console.log(`[ ${message} ]`.yellow);
}

exports.errorLog = ( message ) => {
    return console.log(`[ ${message} ]`.red);
}