// link to friends data
var friendsArray = require("../data/friends");



module.exports = function (app) {

  app.get("/api/friends", function (req, res) {
    res.json(friendsArray);
  });



  app.post("/api/friends", function (req, res) {

    // Put the incoming user stats from the form into an array for easy comparison
    var newUser = [
      req.body.name,
      req.body.picurl,
      parseInt(req.body.q1R),
      parseInt(req.body.q2R),
      parseInt(req.body.q3R),
      parseInt(req.body.q4R),
      parseInt(req.body.q5R),
      parseInt(req.body.q6R),
      parseInt(req.body.q7R),
      parseInt(req.body.q8R),
      parseInt(req.body.q9R),
      parseInt(req.body.q10R)
    ];

    // Variable to track the difference in user answers, set to max possible differenece
    var diff = 40;
    // Assume first user in DB is best match until better match is found.. 
    var match = {
      name: friendsArray[0].name,
      photourl: friendsArray[0].picurl
    }

    // loop for entire array of friend objects
    for (var key in friendsArray) {
      // Variable to track the difference betwwen the newly submitted friend and the specific db friend being compared
      var newDiff = 0;
      // Put the database friend into array for comparison
      var dbUser = [
        friendsArray[key].name,
        friendsArray[key].picurl,
        parseInt(friendsArray[key].q1R),
        parseInt(friendsArray[key].q2R),
        parseInt(friendsArray[key].q3R),
        parseInt(friendsArray[key].q4R),
        parseInt(friendsArray[key].q5R),
        parseInt(friendsArray[key].q6R),
        parseInt(friendsArray[key].q7R),
        parseInt(friendsArray[key].q8R),
        parseInt(friendsArray[key].q9R),
        parseInt(friendsArray[key].q10R)
      ];
      // loop through each array and compare the differences
      for (var i = 2; i < 12; i++) {
        newDiff += Math.abs(newUser[i] - dbUser[i]);
      }

      // if the new differences are less than the current match, make the current user the new match
      if (newDiff < diff) {
        diff = newDiff;
        var match = {
          name: friendsArray[key].name,
          photourl: friendsArray[key].picurl
        }
      }


    }

    // Adding the new user from the form data into the DB for future matching
    friendsArray.push(req.body);

    // Return the best match
    res.json(match);


  });


};
