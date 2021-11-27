const courseBook = require("../models/course_book"),
    httpStatus = require("http-status-codes");

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
    }
}