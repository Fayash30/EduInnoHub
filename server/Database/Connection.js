const mongoose = require("mongoose");

function DBConnect(){
    mongoose.connect("mongodb+srv://fayash:admin123@cluster0.striptm.mongodb.net/Project?retryWrites=true&w=majority")
    .then((conn) => {
        console.log("Connected to DB");
    }).catch((error) => {
        console.error(error);
    })
}

module.exports = DBConnect;