const mongoose = require("mongoose");

const ProjectSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    abstract: {
        type: String,
        required: true,
    },
    domain: {
        type: String,
        required: true,
    },
    ytlink: {
        type: String,
    },
    pdf: {
        type: String,
        required: true,
    },
    uploadedAt: {
        type: Date,
        default: Date.now,
    },
    createdBy: {
        type: String,
        required: true
    },
});

const Project = mongoose.model("Project_Details", ProjectSchema);

module.exports = Project;
