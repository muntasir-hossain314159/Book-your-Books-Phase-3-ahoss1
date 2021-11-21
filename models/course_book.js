const mongoose = require("mongoose"),
    { Schema } = require("mongoose");

let courseBookSchema = new Schema(
    {
        bookName: {
            type: String,
            required: true,
            trim: true
        },
        courseNumber: {
            type: String,
            trim: true
        },
        courseName: {
            type: String,
            trim: true

        },
        instructor: {
            type: String,
            required: true

        },
        cost: {
            type: Number,
            min: [0, "Course cannot have a negative cost"]
        },
        image: {
            data: Buffer,
            contentType: String
        }
    },  
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Course_Book", courseBookSchema);



