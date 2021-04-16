import { findByOptions } from "../user/user.repository.js";
import { login as Rlogin } from "./sign.repository.js";

export async function login( req, res ){
    const body = req.body;
    console.log("요청옴!!");
    console.log(body);
    // const { success, message, data, error } = await findByOptions( { selectType : "boolean",  } );
    const { success, message, data, error } = await Rlogin( body );
    success === true ? 
    res.status(200).json({ message, data}) :
    res.status(500).json({ message, error });
}