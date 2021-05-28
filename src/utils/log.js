require("colors");

exports.success = ( message ) => {
    return console.log(`${message}`.rainbow);
}

exports.info = ( message ) => {
    return console.log(`${message}`.blue);
}

exports.warning = ( message ) => {
    return console.log(`${message}`.yellow);
}

exports.error = ( message ) => {
    return console.log(`${message}`.red);
}