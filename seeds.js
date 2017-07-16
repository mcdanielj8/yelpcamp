var mongoose = require("mongoose"),
    Campground = require("./models/campgrounds"),
    Comment = require("./models/comment");

var data = [
    {
        name: "Cloud's Rest", 
        image: "http://www.lakecityswitchbacks.com/uploads/8/0/8/7/8087134/1973173_orig.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam eu elit diam. Etiam nec iaculis velit. Sed nec nisi massa. Donec ornare lacinia nisl ac ullamcorper. Quisque nec odio nec dolor fringilla euismod vel eu leo. Aenean mattis imperdiet nulla, eu vulputate quam consectetur ultricies. Duis porttitor nunc at ligula maximus, at vestibulum diam mattis. Sed ut odio eleifend, ultricies justo at, dictum lectus. Donec sit amet facilisis turpis. Donec vel molestie purus. In hac habitasse platea dictumst. Praesent quis dolor in ipsum vulputate iaculis. Duis porta quam vulputate, mattis purus sed, venenatis nisl. Cras dapibus justo ut aliquam gravida. Nulla aliquam elit eget magna aliquet congue."
    },
    {
        name: "People here", 
        image: "http://www.colorado.com/sites/default/master/files/styles/media-player-large/public/RVing4_StVrainSP_CSP.jpg?itok=LC_6Eat2",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam eu elit diam. Etiam nec iaculis velit. Sed nec nisi massa. Donec ornare lacinia nisl ac ullamcorper. Quisque nec odio nec dolor fringilla euismod vel eu leo. Aenean mattis imperdiet nulla, eu vulputate quam consectetur ultricies. Duis porttitor nunc at ligula maximus, at vestibulum diam mattis. Sed ut odio eleifend, ultricies justo at, dictum lectus. Donec sit amet facilisis turpis. Donec vel molestie purus. In hac habitasse platea dictumst. Praesent quis dolor in ipsum vulputate iaculis. Duis porta quam vulputate, mattis purus sed, venenatis nisl. Cras dapibus justo ut aliquam gravida. Nulla aliquam elit eget magna aliquet congue."
    },
    {
        name: "Don't go here", 
        image: "https://www.coloradopotguide.com/ImageGen.ashx?image=/media/1629/9229572323_8d2ad7803c_k.jpg&constrain=true&format=jpg&compression=75&width=400",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam eu elit diam. Etiam nec iaculis velit. Sed nec nisi massa. Donec ornare lacinia nisl ac ullamcorper. Quisque nec odio nec dolor fringilla euismod vel eu leo. Aenean mattis imperdiet nulla, eu vulputate quam consectetur ultricies. Duis porttitor nunc at ligula maximus, at vestibulum diam mattis. Sed ut odio eleifend, ultricies justo at, dictum lectus. Donec sit amet facilisis turpis. Donec vel molestie purus. In hac habitasse platea dictumst. Praesent quis dolor in ipsum vulputate iaculis. Duis porta quam vulputate, mattis purus sed, venenatis nisl. Cras dapibus justo ut aliquam gravida. Nulla aliquam elit eget magna aliquet congue."
    }
    ];
    
function seedDB(){
    // Remove all campgrounds
    Campground.remove({}, function(err){
        if(err){
        return console.log(err);
        }
        console.log("Removed campgrounds");
    });
    // Add a few campgrounds
    data.forEach(function(seed){
      Campground.create(seed, function(err, campground){
          if(err){
              console.log(err);
          } else {
              console.log("Added a campground");
              //create a comment
              Comment.create(
                  {
                      text: "This place is OK",
                      author: "Homer"
                    }, function(err, comment){
                        if(err){
                            console.log(err)
                        } else {
                        campground.comments.push(comment);
                        campground.save();
                        console.log("Created a new comment");
                        }
                    }
              );
          }
      }); 
    });

};

module.exports = seedDB;