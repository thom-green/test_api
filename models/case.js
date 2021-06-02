const mongoose = require("mongoose"); //import mongoose

// tea schema
const CaseSchema = new mongoose.Schema({
    name: {type:String, required:true},
    keywords: String
});

const Case = mongoose.model('Case', CaseSchema); //convert to model named Case
module.exports = Case; //export for controller use
