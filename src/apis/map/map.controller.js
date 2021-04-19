"use strict"

const view = {
    index : (req, res) => {
     console.log("map index");
         res.render("index");
    },
    showAllPlaces : (req, res) => {
    console.log("map showAllPlace");
    res.render("showAllPlaces");
    },
};


export default view;