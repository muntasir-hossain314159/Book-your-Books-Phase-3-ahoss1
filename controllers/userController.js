"use strict";

const courseBook = require("../models/course_book"),
    fs = require('fs'),
    path = require('path');

module.exports = {
    showUserProfile: (req, res, next) => {
        let currentUser = req.user;
        if(currentUser)
        {
            res.render("user/user_profile");
        }
        next();
    },

    sellBook: (req, res, next) => {
        let courseBookObject = {
            bookName: req.body.bookName,
            courseNumber: req.body.courseNumber,
            courseName: req.body.courseName,
            cost: req.body.cost,
            instructor: req.body.instructor,
            image: {
                 data: fs.readFileSync(path.join('./public/images/courses/uploads/' + req.file.filename)),
                 contentType: 'image/png'
            }
        },
        currentUser = req.user;

        if (req.skip) return next();

        courseBook.create(courseBookObject, (err, courseBookDocument) => {
            if (err) {
                req.flash('error', `Failed to upload your book because: ${error.message}.`);
                console.log("Error");
                res.redirect(`/user/${currentUser._id}`);
            }
            else {
                courseBookDocument.save();
                req.flash('success','Congratulations! You uploaded your book successfully');
                console.log("Success");
                res.redirect("/");
            }
        });
    },

    purchaseBook: (req, res, next) => {
    }
};