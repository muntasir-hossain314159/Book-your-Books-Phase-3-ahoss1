const router = require("express").Router(),
        searchController = require("../controllers/searchController");

router.get("/", (req, res) => {
        res.render("search");
});

router.get("/books", searchController.searchResults);

module.exports = router;