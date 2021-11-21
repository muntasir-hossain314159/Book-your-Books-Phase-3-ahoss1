const router = require("express").Router(),
    courseBook = require("../models/course_book");

router.get("/", (req, res) => {
    courseBook.find({}, (err, courseBookData) => {
        if (err) {
            console.log("Error");
            res.status(500).send('An error occurred', err);
        }
        else {
            res.render('index', { courseBookData: courseBookData });
        }
    });
});

module.exports = router;