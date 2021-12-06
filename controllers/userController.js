"use strict";

const courseBook = require("../models/course_book"),
    user = require("../models/user"),
    fs = require('fs'),
    path = require('path'),
    httpStatus = require("http-status-codes");

module.exports = {
    showUserProfile: (req, res, next) => {
        let currentUser = req.user;
        if(currentUser)
        {
            res.render("user/user_profile");
        }
        return next();
    },

    showPurchases: (req, res, next) => {

    },

    showSellings: (req, res, next) => {
        let currentUser = req.user,
            courseBookSold = [];

            // console.log(currentUser);
        if(currentUser)
        {
            courseBook.find({ sellerID: currentUser._id, status: 'sold' }, function (err, courseBooks) {
                if (err) return next(err);
                
                courseBookSold = courseBooks;
                });
    
            courseBook.find({ sellerID: currentUser._id, status: 'pending' }, {image: 0}, function (err, courseBookPending) {
                if (err) return next(err);
                
                // console.log(courseBookPending[0]);
                res.render("user/user_profile", {courseBookPending : courseBookPending, courseBookSold : courseBookSold});
              });
        }
        else {
            next();
        }

    },

    sellBook: (req, res, next) => {
        let currentUser = req.user,
        courseBookObject = {
            bookName: req.body.bookName,
            courseNumber: req.body.courseNumber,
            courseName: req.body.courseName,
            instructor: req.body.instructor,
            university: req.body.university,
            cost: req.body.cost,
            image: {
                 data: fs.readFileSync(path.join('./public/images/courses/uploads/' + req.file.filename)),
                 contentType: 'image/png'
            },
            sellerID: currentUser._id
        };
       
        if (req.skip) return next();

        courseBook.create(courseBookObject, (err, courseBookDocument) => {
            if (err) {
                req.flash('error', `Failed to upload your book because: ${error.message}.`);
                console.log("Error")
                res.redirect(`/user/${currentUser._id}`);
            }
            else {
                if(currentUser) {
                    //console.log(currentUser._id);
                    user.findByIdAndUpdate(currentUser._id, {
                        $addToSet: {
                            courseBooksSell: courseBookDocument._id
                        }
                      }, (err, docs) => {
                          if(err)
                          {
                              console.log("Error in Updating courseBooksSell Array");
                          }
                          else {
                              console.log("Successfully Updated");
                          }
                      });
                }
                req.flash('success','Congratulations! You uploaded your book successfully');
                console.log("Success");
                res.redirect("/");
            }
        });
    },

    userList: (req, res, next) => {
        user.find()
        .then(users => {
          res.locals.users = users;
          next();
        })
        .catch(error => {
          console.log(`Error fetching users: ${error.message}`);
          next(error);
        });
    },

    respondJSON: (req, res) => {
        res.json({
          status: httpStatus.StatusCodes.OK,
          data: res.locals.users
        });
    }
};