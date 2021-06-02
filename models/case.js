const mongoose = require("mongoose"); //import mongoose

// Case schema
const CaseSchema = new mongoose.Schema({
    name: {type:String, required:true},
    // image: String,
    description: String,
    keywords: String
});

const Case = mongoose.model('Case', CaseSchema); //convert to model named Case
module.exports = Case; //export for controller use
