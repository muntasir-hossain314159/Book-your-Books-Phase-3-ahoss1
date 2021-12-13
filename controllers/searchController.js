const courseBook = require("../models/course_book");

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

        let regexp = /([$&+,:;=?[\]@#|{}'<>.^*()%!-/])+/;
        book = book.replace(regexp, "");

        let searchFilter = {
            status: 'pending',
            bookName: new RegExp(book, 'i') 
        }

        if(!emptyString(courseNumber))
        {
            courseNumber = courseNumber.replace(regexp, "");
            searchFilter.courseNumber = new RegExp(courseNumber, 'i'); 
        }
        if(!emptyString(courseName))
        {
            courseName = courseName.replace(regexp, "");
            searchFilter.courseName = new RegExp(courseName, 'i');
        }
        if(!emptyString(instructor))
        {
            instructor = instructor.replace(regexp, "");
            searchFilter.instructor = new RegExp(instructor, 'i');
        }
        if(!emptyString(university))
        {
            university = university.replace(regexp, "");
            searchFilter.university = new RegExp(university, 'i');
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