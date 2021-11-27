const router = require("express").Router(),
    courseController = require("../controllers/courseController"); 

router.get("/courses", courseController.courseList, courseController.respondJSON);

module.exports = router;