const router = require("express").Router(),
    courseController = require("../controllers/courseController"),
    userController = require("../controllers/userController");

router.get("/courses", courseController.courseList, courseController.respondJSON);
router.get("/users", userController.userList, userController.respondJSON);

module.exports = router;