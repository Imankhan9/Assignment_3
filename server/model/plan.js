let mongoose = require('mongoose');

// Create a model

let planModel = mongoose.Schema({
    plan: String,
    date: String,
    time: String,
    notes: String
},
{
    collection: "plans"
}
);

module.exports=mongoose.model('Plan', planModel);