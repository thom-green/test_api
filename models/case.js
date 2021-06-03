const mongoose = require("mongoose"); //import mongoose

// Case schema
const CaseSchema = new mongoose.Schema({
    // OLD
    // name: {type:String, required:true},
    // description: String,
    // keywords: String,
    // NEW
    date: String,
    fileDate: String,
    zoll_type: String,
    parent_text: String,
    text: String,
    observations_list_photo: String,
    zoll_serial_number: String,
    zoll_model: String,
    zoll_software_version: String,
    zoll_file_name: String,
    displayOrder: String,
    _foreground: String,
    _background: String,
    observations_list_recorded: String
});

const Case = mongoose.model('Case', CaseSchema); //convert to model named Case
module.exports = Case; //export for controller use
