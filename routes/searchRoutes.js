const router = require("express").Router();

router.get("/", (req, res) => {
        res.render("search");
});

module.exports = router;