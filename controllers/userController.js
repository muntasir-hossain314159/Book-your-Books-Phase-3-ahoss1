"use strict";

const mongoose = require("mongoose");
const courseBook = require("../models/course_book"),
    user = require("../models/user"),
    fs = require('fs'),
    path = require('path'),
    httpStatus = require("http-status-codes");

let potentialCourseBooksArray = [],
    purchasedCourseBooksArray = [],
    rejectedBidsArray = [];

module.exports = {
    showUserProfile: (req, res, next) => {
        let currentUser = req.user;
        if(currentUser)
        {
            //res.render("user/user_profile");
        }
        return next();
    },

    //todo courseBook.find({_id: { $in: currentUser.potentialCourseBooksList}}, {image: 0}, (err, potentialCourseBooks)
  
    showPurchases: (req, res, next) => {
        potentialCourseBooksArray = [];
        purchasedCourseBooksArray = [];
        rejectedBidsArray = [];
        let currentUser = req.user;

        if(currentUser)
        {
            courseBook.find({potentialBuyersList: { $in: currentUser._id}}, {image: 0}, (err, potentialCourseBooks) => {
                if(err) {
                    console.log("Error in finding potential course books list");
                    return next(err);
                }
                potentialCourseBooksArray = potentialCourseBooks.slice(0);
            }).clone().then( () => {
                courseBook.find({_id: {$in: currentUser.potentialCourseBooksList}}, {image: 0}, (err, courseBooks) => {
                    if(err) {
                        console.log("Error in finding rejected potential course books list");
                        return next(err);
                    }
                    else {
                        courseBooks.forEach((rejectedBooks) => {
                            if(!rejectedBooks.potentialBuyersList.includes(currentUser._id))
                            {
                                //console.log(rejectedBooks);
                                rejectedBidsArray.push(rejectedBooks);
                            }
                        })
                    }
                }).clone().then( () => {
                    courseBook.find({_id: { $in: currentUser.courseBooksPurchase}}, {image: 0}, (err, purchasedCourseBooks) => {
                        if(err) {
                            console.log("Error in finding purchased course books");
                            return next(err);
                        }
                        purchasedCourseBooksArray = purchasedCourseBooks.slice(0);
                        return next();
                    })
                })
            })
        }
        else
            return next();
    },

    //todo catch error after then
    //courseBook.find( {._id: {$in: currentUser.courseBooksSell}, status: 'pending'} , {image: 0})
    showSellings:  (req, res, next) => {
        let currentUser = req.user;

        //console.log(currentUser._id);
        if(currentUser)
        {
            Promise.all([
                courseBook.find({ sellerID: currentUser._id, status: 'pending' }, {image: 0}),
                courseBook.find({ sellerID: currentUser._id, status: 'sold' }, {image: 0}) 

            ]).then(([courseBookPending, courseBookSold]) => {
                res.render("user/user_profile", {courseBookPending : courseBookPending, courseBookSold : courseBookSold, potentialCourseBook: potentialCourseBooksArray, rejectedCourseBook: rejectedBidsArray, purchasedCourseBook: purchasedCourseBooksArray});
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
            $addToSet : {
                courseBooksPurchase: mongoose.Types.ObjectId(approveCourseID)
            },
            $pull: {
                potentialCourseBooksList: mongoose.Types.ObjectId(approveCourseID)
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
        }).clone().then( () => {
            courseBook.findByIdAndUpdate(approveCourseID, {
                $set: {
                    potentialBuyersList: []
                },
                status: "sold",
                buyerID: mongoose.Types.ObjectId(approveBuyerID)
            }, (err, docs) => {
                if(err)
                {
                    console.log("Error in Updating potentialBuyersList Array");
                    return next(err);
                }
                else {
                    console.log("Successfully Updated potentialBuyersList");
                }
            }).clone().then( () => {
                res.end();
            })
        })
    },

    rejectBuyer: (req, res, next) => {
        let rejectBuyerID = req.params.userID,
            rejectCourseID = req.params.courseBookID;

        console.log(rejectBuyerID);
        console.log(rejectCourseID);

      
        courseBook.findByIdAndUpdate(rejectCourseID, {
            $pull: {
                potentialBuyersList: mongoose.Types.ObjectId(rejectBuyerID)
            }
        }, (err, docs) => {
            if(err)
            {
                console.log("Error in Updating potentialBuyersList Array Reject");
                return next(err);
            }
            else {
                //console.log(docs);
                console.log("Successfully Updated potentialBuyersList Reject");
            }
        }).clone().then( () => {
            res.end();
        })
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