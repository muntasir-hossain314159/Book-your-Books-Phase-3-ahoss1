const router = require("express").Router(),
    courseController = require("../controllers/courseController");

    router.get("/", courseController.bookBag);
    router.get("/submit-bid/:id", courseController.submitBid);

    module.exports = router;
