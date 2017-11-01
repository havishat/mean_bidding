var controller1 = require('../controllers/controllers1.js');
//var polls = require('../controllers/polls.js');
var path = require('path');

module.exports = function(app) {

    // This is the method we can use to grab the user's
	// name from the database after it is stored in session
	// by initial login
    app.get('/login/one', controller1.getid);

    //logs the user in or creates user
    app.post('/login', controller1.create);

   app.get('/login/logout', controller1.logout);
    // Logs the user out by clearing session

    //all bids
    app.get('/Bids', controller1.allbids);

    // create bids
    app.post("/Bids",  controller1.createbid);

     // create bids
     app.delete("/deleteAllBids",  controller1.deleteAllBids);


}