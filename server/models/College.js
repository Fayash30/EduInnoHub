const mongoose = require('mongoose');

const CollegeSchema = new mongoose.Schema({
    college : {
        type : String,
        required: true,
    }
})

const College = mongoose.model("Colleges_Collections",CollegeSchema);

module.exports = College;
