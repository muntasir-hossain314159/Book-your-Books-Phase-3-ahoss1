"use strict";

const express = require("express"),
  app = express(),
  layouts = require("express-ejs-layouts"),
  mongoose = require("mongoose"),
  passport = require("passport"),
  cookieParser = require("cookie-parser"),
  expressSession = require("express-session"),
  connectFlash = require("connect-flash"),
  router = require("./routes/index"),
  User = require("./models/user");
  require('dotenv').config();

app.set("view engine", "ejs");
app.set("port", process.env.PORT || 3000);
//app.set('trust proxy', 1) 

mongoose.connect(process.env.MONGO_DB_URI, (err)=>{
  if(err) throw err;
  console.log("DB Connected Successfully");
  });

app.use(layouts);
app.use(express.static("public"));
app.use(
  express.urlencoded({extended: false})
);
app.use(express.json());


// app.use(cookieParser("bookYourBooks"));
// app.use(
//   expressSession({
//     secret: "bookYourBooks",
//     cookie: {
//       maxAge: 4000000
//     },
//     resave: false,
//     saveUninitialized: false
//   })
// );

app.use(cookieParser("book your books"));
app.use(expressSession({
  secret: 'book your books',
  resave: false,
  saveUninitialized: false,
  cookie: { 
    maxAge: 4000000}
}));
app.use(connectFlash());
 
app.use(passport.initialize());
app.use(passport.session());
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
  res.locals.loggedIn = req.isAuthenticated();
  res.locals.currentUser = req.user;
  res.locals.flashMessages = req.flash();
  next();
});

app.use("/", router);

app.listen(app.get("port"), () => {
  console.log(`Server running at http://localhost:${app.get("port")}`);
});
