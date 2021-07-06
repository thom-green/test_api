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
    observations_list_recorded: String,
    observations_list_photo: String,
    observations_list_spo2: String,
    observations_list_respiratory_rate: String,
    observations_list_blood_pressure_systolic: String,
    observations_list_blood_pressure_diastolic: String,
    observations_list_heart_rate_rate: String,
    observations_list_co2_capnography: String,
    observations_list_temperature: String,
    treatment_intervention_defibrillation_list_shock: String,
    zoll_serial_number: String,
    zoll_software_version: String,
    zoll_file_name: String,
    displayOrder: String,
    list: String,
    _foreground: String,
    _background: String
});

const Case = mongoose.model('Case', CaseSchema); //convert to model named Case
module.exports = Case; //export for controller use
