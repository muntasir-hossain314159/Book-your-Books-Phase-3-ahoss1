"use strict";

const mongoose = require("mongoose");
const courseBook = require("../models/course_book"),
    user = require("../models/user"),
    fs = require('fs'),
    path = require('path'),
    httpStatus = require("http-status-codes");

let potentialCourseBooksArray = [];

module.exports = {
    showUserProfile: (req, res, next) => {
        let currentUser = req.user;
        if(currentUser)
        {
            //res.render("user/user_profile");
        }
        return next();
    },

    showPurchases: (req, res, next) => {
        potentialCourseBooksArray = [];
        let currentUser = req.user;

        if(currentUser)
        {
            courseBook.find({potentialBuyersList: { $in: currentUser._id}}, {image: 0}, (err, potentialCourseBooks) => {
                if(err) {
                    console.log("Error in finding potential buyers list");
                    return next(err);
                }
                potentialCourseBooksArray = potentialCourseBooks.slice(0);
            })
        }
        return next()
    },

    //todo catch error after then
    showSellings:  (req, res, next) => {
        let currentUser = req.user;

        //console.log(currentUser._id);
        if(currentUser)
        {
            Promise.all([
                courseBook.find({ sellerID: currentUser._id, status: 'pending' }, {image: 0}),
                courseBook.find({ sellerID: currentUser._id, status: 'sold' }, {image: 0}) 

            ]).then(([courseBookPending, courseBookSold]) => {
                res.render("user/user_profile", {courseBookPending : courseBookPending, courseBookSold : courseBookSold, potentialCourseBook: potentialCourseBooksArray});
            })
        }
        else {
            return next();
        }
    },

    approveBuyer: (req, res, next) => {
        let approveBuyerID = req.params.userID,
            approveCourseID = req.params.courseBookID;

        console.log(approveBuyerID);
        console.log(approveCourseID);

        user.findByIdAndUpdate(approveBuyerID, {
            $pull: {
                potentialCourseBooksList: [mongoose.Types.ObjectId(approveCourseID)]

            },
            $addToSet : {
                courseBooksPurchase: mongoose.Types.ObjectId(approveCourseID)
            }
       
        }, (err, docs) => {
            if(err)
            {
                console.log("Error in Updating courseBooksPurchase Array");
                return next(err);
            }
            else {
                console.log("Successfully Updated courseBooksPurchase");
            }
        });
        res.end();
    },

    sellBook: (req, res, next) => {
        let currentUser = req.user;

        if(currentUser)
        {
            fs.readFile(path.join('./public/images/courses/uploads/' + req.file.filename), (err, dataInformation) => {
                if(err) return next(err);
                
                let courseBookObject = {
                    bookName: req.body.bookName,
                    courseNumber: req.body.courseNumber,
                    courseName: req.body.courseName,
                    instructor: req.body.instructor,
                    university: req.body.university,
                    cost: req.body.cost,
                    image: {
                         data: dataInformation,
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
                        //console.log(currentUser._id);
                        user.findByIdAndUpdate(currentUser._id, {
                            $addToSet: {
                                courseBooksSell: courseBookDocument._id
                            }
                          }, (err, docs) => {
                              if(err)
                              {
                                  console.log("Error in Updating courseBooksSell Array");
                                  return next(err);
                              }
                              else {
                                  console.log("Successfully Updated");
                              }
                          });
                
                        req.flash('success','Congratulations! You uploaded your book successfully');
                        console.log("Success");
                        res.redirect("/");
                    }
                });
            });
        }
        else {
            return next();
        }
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