"use strict"

const router = require("express").Router(),
    homeRoutes = require("./homeRoutes"),
    errorRoutes = require("./errorRoutes"),
    searchRoutes = require("./searchRoutes"),
    signInRoutes = require("./signInRoutes"),
    signUpRoutes = require("./signUpRoutes"),
    userRoutes = require("./userRoutes"),
    apiRoutes = require("./apiRoutes");

router.use("/api", apiRoutes);
router.use("/search", searchRoutes);
router.use("/sign_in", signInRoutes);
router.use("/sign_up", signUpRoutes);
router.use("/user", userRoutes);
router.use("/", homeRoutes);
router.use("/", errorRoutes);

module.exports = router;