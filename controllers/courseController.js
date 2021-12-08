const courseBook = require("../models/course_book"),
    user = require("../models/user"),
    httpStatus = require("http-status-codes");
    mongoose = require("mongoose");
    let courseBookItems = [];

module.exports = {
    courseList: (req, res, next) => {
        courseBook.find()
        .then(courses => {
          res.locals.courses = courses;
          next();
        })
        .catch(error => {
          console.log(`Error fetching courses: ${error.message}`);
          next(error);
        });
    },

    respondJSON: (req, res) => {
        res.json({
          status: httpStatus.StatusCodes.OK,
          data: res.locals.courses
        });
    },
    showBookBag: (req, res, next) => {
        courseBookItems = [];
      
        let courseBookArray = req.query.courseBookArray;
  
        console.log(courseBookArray);

        courseBook.find({ _id: { $in: courseBookArray } }, (err, items) => {
          if(err)
          {
              console.log("Error in finding course book for Book Bag");
              next(err);
          }
          else {
              //console.log(`Successfully showed Book Bag ${items[0]._id}`);
              //console.log("run");
              courseBookItems = items.slice(0);
              res.end();
              
          }
        });
    },

    bookBag: (req, res) => {
      res.render("book_bag", {courseBooks: courseBookItems});
    },

    submitBid: (req, res, next) => {
      let courseBookArrayID = [],
      buyerID = req.params.id,
      courseBookArray = courseBookItems.slice(0);

      courseBookArray.forEach(element => {
          courseBookArrayID.push(mongoose.Types.ObjectId(element._id));
        });

      console.log(courseBookArrayID);

      user.findByIdAndUpdate(buyerID, {
        $addToSet : {
          potentialCourseBooksList: { $each: courseBookArrayID }
        }
      }, (err, doc) => {
        if(err)
        {
            console.log("Error in Potential Course Books List");
            next(err);
        }
        else {
            console.log("Successfully Updated Potential Course Books List");
        }
      }).clone().then( () => { 
          courseBookArrayID.forEach(element => {
          courseBook.findByIdAndUpdate(element, {
              $addToSet : {
                potentialBuyersList: mongoose.Types.ObjectId(buyerID)  
              }
            }, (err, doc) => {
              if(err)
              {
                  console.log("Error in Updating potentialBuyersList");
                  next(err)
              }
              else {
                  console.log("Successfully Updated potentialBuyersList");
              }
            }).clone();
          }) 
      }).then( () => {
          req.flash('success', "Your bid has been submitted successfully!");
          res.end();
         
      })
    }
}