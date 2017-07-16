var express    = require("express");
var router     = express.Router();
var Campground = require("../models/campgrounds");
var Comment    = require("../models/comment");
var middleware = require("../middleware");

router.get("/campgrounds", function(req, res){
    Campground.find({}, function(err, allCampgrounds){
        if(err){
            console.log(err);
        } else {
            res.render("campgrounds/index", {campgrounds: allCampgrounds});
        }
    });
});

router.get("/campgrounds/new", middleware.isLoggedIn, function(req, res){
   res.render("campgrounds/new"); 
});

router.post("/campgrounds", middleware.isLoggedIn, function(req, res){
   var name = req.body.name;
   var image = req.body.image;
   var price = req.body.price;
   var desc = req.body.description;
   var author = {
       id: req.user._id,
       username: req.user.username
   }
   var newCampground = {name: name, image: image, description: desc, price: price, author: author};
   Campground.create(newCampground, function(err, newlyCreated){
       if(err){
           req.flash("error", "Something went wrong. Try again");
           console.log(err);
       } else {
              req.flash("success", "Campground created!")    
              res.redirect("/campgrounds");
       }
   });
});

router.get("/campgrounds/:id", function(req, res){
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
        if(err){
            console.log(err);
        } else {
            console.log(foundCampground);
            res.render("campgrounds/show", {campground: foundCampground});
        }
    });
});

//EDIT ROUTE

router.get("/campgrounds/:id/edit", middleware.checkCampgroundOwnership, function(req, res){
        Campground.findById(req.params.id, function(err, foundCampground){
        if(err){
            req.flash("error", "Campground not found!");
        }
         res.render("campgrounds/edit", {campground: foundCampground});
    }
)});

//UPDATE ROUTE

router.put("/campgrounds/:id", middleware.checkCampgroundOwnership, function(req, res){
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground){
        if(err){
            res.redirect("/campgrounds");
        } else {
            req.flash("success", "<%= campground.name %> has been edited.")
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});

//DESTROY ROUTE

router.delete("/campgrounds/:id", middleware.checkCampgroundOwnership, function(req, res){
    Campground.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect("/campgrounds");
        } else {
            req.flash("error", "Campground deleted")
            res.redirect("/campgrounds");
        }
    });
});

module.exports = router;