const router = require("express").Router(),
    courseController = require("../controllers/courseController");

    router.get("/", courseController.bookBag);

    module.exports = router;
