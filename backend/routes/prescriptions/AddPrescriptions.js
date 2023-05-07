var express = require('express');
var router = express.Router();
var db = require('../../db');

/* GET home page. */
router.post('/', function(req, res, next) {
    const {appointment_id,diagnosis,prescription_details,treatment} = req.body;
    let prescription_id = Math.floor(Math.random()*90000) + 10000000;


    let statement = `INSERT INTO prescriptions (prescription_id,appointment_id,diagnosis, treatment,prescription_details)
    VALUES (${prescription_id}, ${appointment_id}, '${diagnosis}','${treatment}', '${prescription_details}');`

    // res.send(statement);

  
    db.query(statement,(error,results,fields)=>{
      if(error){
        res.status(400);
        res.json({
          message:error.message
        })
      } 
      else{
        return res.json(results)
      }
    });
});


router.put('/:prescriptionId',function(req,res,next){
  const {prescriptionId} = req.params;
  const {diagnosis,prescription_details,treatment} = req.body;

  let statement = `UPDATE prescriptions SET diagnosis='${diagnosis}',prescription_details='${prescription_details}',treatment='${treatment}' WHERE prescription_id = ${prescriptionId};`

  db.query(statement,(error,result,fields)=>{
    if(error) throw error;
    else{
      return res.json(result);
    }
  })


})


module.exports = router;
 