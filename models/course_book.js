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
        university: {
            type: String,
            trim: true
        },
        cost: {
            type: Number,
            min: [0, "Course cannot have a negative cost"]
        },
        image: {
            data: Buffer,
            contentType: String
        },
        status: {type: String, default: "pending"}, 
        sellerID: {type: Schema.Types.ObjectId, ref: "User"},
        buyerID: {type: Schema.Types.ObjectId, ref: "User"},
        potentialBuyersList: [{type: Schema.Types.ObjectId, ref: "User"}]

    },  
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Course_Book", courseBookSchema);



