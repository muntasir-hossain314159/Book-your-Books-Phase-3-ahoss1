const passport = require("passport");

module.exports = {
    showSignIn: (req, res) => {
        res.render("sign_in");
    },
    authenticate: passport.authenticate("local", {
        failureFlash: "Failed to log in!",
        failureRedirect: "/sign_in",
        successFlash: "Successfully logged in!",
        successRedirect: "/"
    }),
    logout: (req, res) => {
        req.logout();
        req.flash("success", "You have been logged out!");
        res.redirect("/");
      }
};



