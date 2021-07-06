//import case model
 const Case = require('../models/case');

 const multer = require('multer');

 //POST case
 const newCase = (req, res) => {
     //check if the case name already exists in db
     Case.findOne({parent_text:req.body.parent_text},(data)=>{

         //if case not in db, add it
         if(data===null){
             //create a new case object using the Case model and req.body
             const newCase = new Case({
                 // OLD
                  // name: req.body.name,
                  // description: req.body.description,
                  // keywords: req.body.keywords,
                  // NEW
                  date: req.body.date,
                  fileDate: req.body.fileDate,
                  device_id: req.body.device_id,
                  case_id: req.body.case_id,
                  zoll_type: req.body.zoll_type,
                  parent_text: req.body.parent_text,
                  text: req.body.text,
                  observations_list_recorded: req.body.observations_list_recorded,
                  observations_list_photo: req.body.observations_list_photo,
                  observations_list_spo2: req.body.observations_list_spo2,
                  observations_list_respiratory_rate: req.body.observations_list_respiratory_rate,
                  observations_list_blood_pressure_systolic: req.body.observations_list_blood_pressure_systolic,
                  observations_list_blood_pressure_diastolic: req.body.observations_list_blood_pressure_diastolic,
                  observations_list_heart_rate_rate: req.body.observations_list_heart_rate_rate,
                  observations_list_co2_capnography: req.body.observations_list_co2_capnography,
                  observations_list_temperature: req.body.observations_list_temperature,
                  treatment_intervention_defibrillation_list_shock: req.body.treatment_intervention_defibrillation_list_shock,
                  zoll_serial_number: req.body.zoll_serial_number,
                  zoll_software_version: req.body.zoll_software_version,
                  zoll_file_name: req.body.zoll_file_name,
                  displayOrder: req.body.displayOrder,
                  list: req.body.list,
                  _foreground: req.body._foreground,
                  _background: req.body._background
             })


             // save this object to database
             newCase.save((err, data)=>{
                 if(err) return res.json({Error: err});
                 return res.json(data);
             })
         //if case is in db, return a message to inform it exists
         }else{
             return res.json({message:"Case already exists"});
         }
     })
 };


 //GET all cases
 const getAllCase = (req, res) => {
     Case.find({}, (err, data)=>{
         if (err){
             return res.json({Error: err});
         }
         return res.json(data);
     })
 };

 //DELETE cases
 const deleteAllCase = (req, res) => {
     Case.deleteMany({}, err => {
         if(err) {
           return res.json({message: "Complete delete failed"});
         }
         return res.json({message: "Complete delete successful"});
     })
 };

 //GET '/case/:name'
 const getOneCase = (req, res) => {
     let parent_text = req.params.parent_text; //get the parent_text

     //find the specific case with that name
     Case.findOne({parent_text:parent_text}, (err, data) => {
     if(err || !data) {
         return res.json({message: "Case doesn't exist."});
     }
     else return res.json(data); //return the case object if found
     });
 };

 //DELETE 1 case
 const deleteOneCase = (req, res) => {
     let parent_text = req.params.parent_text; // get the name of case to delete

     Case.deleteOne({parent_text:parent_text}, (err, data) => {
     if(err || !data) {
         return res.json({message: "Case doesn't exist."});
     }
     else return res.json({message: "Case deleted."}); //deleted if found
     });
 };

 const storage = multer.diskStorage({
     destination: function (req, file, cb) {
         cb(null, './uploads');
       },
     filename: function (req, file, cb) {
         cb(null, file.originalname);
     }
 });

 const uploadImg = multer({storage: storage}).single('image');


 //export controller functions
 module.exports = {
     getAllCase,
     uploadImg,
     newCase,
     deleteAllCase,
     getOneCase,
     deleteOneCase
 };
