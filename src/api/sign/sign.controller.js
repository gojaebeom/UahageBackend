const { findByOptions } = require("../user/user.repository");
const { login } = require("./sign.repository");

exports.login = async ( req, res ) => {
    const body = req.body;
    console.log("요청옴!!");
    console.log(body);

    // const { success, message, data, error } = await findByOptions( { selectType : "boolean",  } );

    const { success, message, data, error } = await login( body );

    success === true ? 
    res.status(200).json({ message, data}) :
    res.status(500).json({ message, error });
}