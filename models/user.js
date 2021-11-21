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
        courseBooksSell: {
            sellBooks: [{ type: Schema.Types.ObjectId, ref: "Course Book" }]

        },
        courseBooksPurchase: {
            purchaseBooks: [{ type: Schema.Types.ObjectId, ref: "Course Book" }]
        }
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



