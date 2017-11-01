var mongoose = require('mongoose');

var Schema = mongoose.Schema

var LoginSchema = new mongoose.Schema({
    name: {type: String, required: [true, "Please enter a name."], minlength: 3},
    __bidId: [{type: Schema.Types.ObjectId, ref:"BidProduct"}],
}, {timestamps:true});

mongoose.model('Login', LoginSchema);

let BidSchema = new mongoose.Schema({
    product1 :{ amount: Number, product:''},
    product2 :{ amount: Number, product:''},
    product3 :{ amount: Number, product:''},
    creator: {type: Schema.Types.String, ref: "BidProduct"},
})

mongoose.model('Bid', BidSchema);