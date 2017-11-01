var mongoose = require('mongoose');
var User = mongoose.model('Login');
var Bid = mongoose.model('Bid');
var session = require('express-session');

module.exports = {

deleteAllBids: function(req, res) {
    Bid.remove({},(err, data)=>{
        if(err){
            console.log(err)
        }else{
            console.log('deleting')
            return res.json(data);
        }
    })
},

// GET ALL BIDS
allbids: function(req, res) {
    Bid.find({},(err, bids)=>{
        if(err){
            console.log(err)
        }else{
            console.log('at server', bids)
            return res.json(bids);
        }
    })

},

//CREATE BID

createbid: function(req, res) {
    console.log("inside formcreate", req.body);
    var bidProduct= new Bid(req.body);
    // bidProduct.creator = req.body.creator
    console.log("created new bid instance", bidProduct);
    bidProduct.save(function(err){
            if(err){
                console.log('error saving bid',err)    
            } else {
                Bid.find({},(err, bids)=>{
                    if(err){
                        console.log('error finding all bids',err)
                    }else{
                        return res.json(bids);
                    }
                })
                }
        });

},

getid: function(req, res) {
    console.log("inside showall");
    if(req.session.user) {
        return res.json(req.session.user);
    }else{
        return res.status(500).json("Not logged in")
    }
},

create: function (req, res) {
    // console.log("inside create", req.body);
    // console.log(req.body);
    //var job = new Login(req.body);
    User.findOne({name: req.body.name}, (err, user) => {
        if(err) {
            return res.status(401).json(err)
        }
        else if(user) {
            console.log("helow", user)
            req.session.user = user
            // console.log("session",req.session.user)
            res.json({user})
        }
        else {
            let user = new User(req.body);
            console.log("hello2", user)
            user.save((err) => {
                if(err){
                    return res.status(401).json(err);
                }
                else{
                    console.log(`${user} has been saved`)
                    req.session.user = user;
                    console.log("session",req.session.user)
                    res.json({user});
                }
            })
        }
    })
},

logout: function (req, res) {
    req.session.destroy()
    return res.json('bye bye');
}
// Logout clears our session

}