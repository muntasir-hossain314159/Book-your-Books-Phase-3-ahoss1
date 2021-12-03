const mongoose = require("mongoose"),
    { Schema } = require("mongoose"),
    passportLocalMongoose = require("passport-local-mongoose");

let userSchema = new Schema(
    {
        firstName: {
            type: String,
            required: true,
            trim: true
        },
        lastName: {
            type: String,
            required: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            lowercase: true,
            unique: true,
            trim: true

        },
        phoneNumber: {
            type: String,
            trim: true

        },
        university: {
            type: String,
            trim: true

        },
        termsConditions: {
            type: String
        },
        courseBooksSell: [{ type: Schema.Types.ObjectId, ref: "Course_Book" }],
        courseBooksPurchase: [{ type: Schema.Types.ObjectId, ref: "Course_Book" }],
        potentialCourseBooksList: [{ type: Schema.Types.ObjectId, ref: "Course_Book" }]
    },  
    {
        timestamps: true
    }
);

userSchema.virtual("fullName").get(function() {
    return `${this.firstName} ${this.lastName}`;
  });

userSchema.plugin(passportLocalMongoose, {
    usernameField: "email"
  });

module.exports = mongoose.model("User", userSchema);



