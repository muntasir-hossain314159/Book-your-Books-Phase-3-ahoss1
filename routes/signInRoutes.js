const router = require("express").Router(),
    signInController = require("../controllers/signInController");

router.get("/", signInController.showSignIn);
router.post("/", signInController.authenticate);
router.get("/logout", signInController.logout);

module.exports = router;