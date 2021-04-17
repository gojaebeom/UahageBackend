"use strict"
import bcrypt from "bcrypt";

const saltRounds = 10;

export function encryptedPassowrd( password ) {
    return bcrypt.hashSync(password, saltRounds);
}

export function comparePassword( password, hsPassword) {
    return bcrypt.compareSync(password, hsPassword);
}