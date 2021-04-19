"use strict"

const view = {
    index : (req, res) => {
     console.log("map index");
         res.render("index");
    },
};


export default view;