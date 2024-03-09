const mongoose = require('mongoose');

const CourseSchema = new mongoose.Schema({
    course : {
        type : String,
        required: true,
    }
})

const Course = mongoose.model("Courses_Collections",CourseSchema);

module.exports = Course;
