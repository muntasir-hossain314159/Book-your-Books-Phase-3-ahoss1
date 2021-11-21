const router = require("express").Router(),
    signUpController = require("../controllers/signUpController");

router.get("/", signUpController.showSignUp);
router.post("/", signUpController.createAccount);

module.exports = router;
