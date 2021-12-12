const courseBook = require("../models/course_book"),
    user = require("../models/user"),
    httpStatus = require("http-status-codes");
    mongoose = require("mongoose");

function emptyString(str)
{
  // checking the string using ! operator and length
  // will return true if empty string and false if string is not empty
    return (!str || str.length === 0 );
}

module.exports = {
    searchResults: (req, res, next) => {
        let book = req.query.book,
            courseNumber = req.query.courseNumber,
            courseName = req.query.courseName,
            instructor = req.query.instructor,
            university = req.query.university;

        console.log(book);
        console.log(courseNumber);
        console.log(courseName);
        console.log(instructor);
        console.log(university);

        let searchFilter = {
            bookName: book
        }

        if(!emptyString(courseNumber))
        {
            searchFilter.courseNumber = courseNumber;
        }
        if(!emptyString(courseName))
        {
            searchFilter.courseName = courseName;
        }
        if(!emptyString(instructor))
        {
            searchFilter.instructor = instructor;
        }
        if(!emptyString(university))
        {
            searchFilter.university = university;
        }

        console.log(searchFilter);

        courseBook.find(searchFilter, (err, docs) => {
            if(err) {
                console.log("error in finding search result");
                next(err);
            }
            else {
                res.render("search_result", {searchCourseBook: docs});
            }
        })

    }
}