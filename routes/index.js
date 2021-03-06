var express  = require("express");
var router   = express.Router();
var User     = require("../models/user");
var passport = require("passport");

router.get("/", function(req, res){
    res.render("landing");
});


//==========
//AUTH ROUTES
//==========

router.get("/register", function(req, res){
    res.render("register");
});

//Sign up logic

router.post("/register", function(req, res){
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            req.flash("error", err.message);
            return res.redirect("/register");
        }
        passport.authenticate("local")(req, res, function(){
            req.flash("success", "Welcome, " + user.username + "!");
            res.redirect("/campgrounds");
        });
    });
});

//Login

router.get("/login", function(req, res){
    res.render("login");
});

router.post("/login",passport.authenticate("local", 
    {successRedirect: "/campgrounds",
     failureRedirect: "/login"   
    }),  function(req, res){
});

//Logout Route

router.get("/logout", function(req, res){
    req.logout();
    req.flash("success", "Logged you out");
    res.redirect("/campgrounds");
});


module.exports = router;
