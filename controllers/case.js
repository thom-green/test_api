//import case model
const Case = require('../models/case');

const multer = require('multer');

//POST case
const newCase = (req, res) => {
    //check if the case name already exists in db
    Case.findOne({name:req.body.name},(data)=>{

        //if case not in db, add it
        if(data===null){
            //create a new case object using the Case model and req.body
            const newCase = new Case({
                 name:req.body.name,
                 image: req.file.path,  //update this
                 description: req.body.description,
                 keywords: req.body.keywords
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
    let name = req.params.name; //get the case name

    //find the specific case with that name
    Case.findOne({name:name}, (err, data) => {
    if(err || !data) {
        return res.json({message: "Case doesn't exist."});
    }
    else return res.json(data); //return the case object if found
    });
};

//POST 1 case comment
const newComment = (req, res) => {
  let name = req.params.name; //get the case to add the comment in
  let newComment = req.body.comment; //get the comment
  //create a comment object to push
  const comment = {
      text: newComment,
      date: new Date()
  }
  //find the case object
  Case.findOne({name:name}, (err, data) => {
      if(err || !data || !newComment) {
          return res.json({message: "Case doesn't exist."});
      }
      else {
          //add comment to comments array of the case object
          data.comments.push(comment);
          //save changes to db
          data.save(err => {
              if (err) {
              return res.json({message: "Comment failed to add.", error:err});
              }
              return res.json(data);
          })
      }
  })
};


//DELETE 1 case
const deleteOneCase = (req, res) => {
    let name = req.params.name; // get the name of case to delete

    Case.deleteOne({name:name}, (err, data) => {
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
    uploadImg,  //include the new guy
    newCase,
    deleteAllCase,
    getOneCase,
    newComment,
    deleteOneCase
};
