const express = require('express');
const router  = express.Router();
const caseController = require('../controllers/case');

router.post('/case', caseController.uploadImg , caseController.newCase);
router.get('/case', caseController.getAllCase);
router.post('/case', caseController.newCase);
router.delete('/case', caseController.deleteAllCase);

router.get('/case/:name', caseController.getOneCase);
router.post('/case/:name', caseController.newComment);
router.delete('/case/:name', caseController.deleteOneCase);

module.exports = router;
