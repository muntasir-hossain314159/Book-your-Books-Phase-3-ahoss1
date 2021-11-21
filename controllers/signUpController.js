"use strict";

const User = require("../models/user"),
  passport = require("passport"),
  getSignUpInformation = body => {
    return {
        firstName: body.firstName,
        lastName: body.lastName,
        email: body.email,
        phoneNumber: body.phoneNumber,
        university: body.university,
        termsConditions: body.termsConditions
    };
};



module.exports = {
    showSignUp: (req, res) => {
        res.render("sign_up");
    },

    createAccount: (req, res, next) => {
        let signUpInformation = getSignUpInformation(req.body);

        if (req.skip) return next();

        let newUser = new User(signUpInformation);
        User.register(newUser, req.body.password, (error, user) => {
          if (user) {
           passport.authenticate('local')(req,res,function(){
            req.flash('success','Welcome to Book your Books, ' + user.fullName + '!');
            console.log("Success");
            res.redirect("/");
          });

          } else {
            req.flash('error', `Failed to create user account because: ${error.message}.`);
            console.log("Error");
            res.redirect("/sign_up");
          }
        });
      },
};