const courseBook = require("../models/course_book"),
    httpStatus = require("http-status-codes");
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
    showBookBag: async (req, res, next) => {
        courseBookItems = [];
      
        index = 0;
  
        let courseBookArray = req.query.courseBookArray;
  
        console.log(courseBookArray);

        await courseBook.find({ _id: { $in: courseBookArray } }, (err, items) => {
          if(err)
          {
              console.log("Error in finding course book for Book Bag");
              next(err);
          }
          else {
              //console.log(`Successfully showed Book Bag ${items[0]._id}`);
              courseBookItems = items.slice(0);
              
              res.end();
              console.log("run");
          }
        }).clone();
    },

    bookBag: (req, res) => {
      res.render("book_bag", {courseBooks: courseBookItems});
    }
}