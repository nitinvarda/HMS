var express = require('express');
var router = express.Router();
var db = require('../../db');

/* GET home page. */
router.get('/:id', function(req, res, next) {
    const {id} = req.params;
    const {type} = req.query;
    // console.log(id,query)          
    let statement =  type=='patient' ? 
    `SELECT appointments.appointment_id,appointments.appointment_date,prescriptions.prescription_id,prescriptions.diagnosis,doctors.name,doctors.specialty,prescriptions.treatment,prescriptions.prescription_details FROM appointments JOIN prescriptions ON appointments.appointment_id = prescriptions.appointment_id JOIN doctors ON appointments.doctor_id=doctors.doctor_id WHERE appointments.patient_id = ${id};` :
    `SELECT appointments.appointment_id,appointments.appointment_date,prescriptions.prescription_id,prescriptions.diagnosis,patients.first_name,patients.last_name,prescriptions.treatment,prescriptions.prescription_details FROM appointments JOIN prescriptions ON appointments.appointment_id = prescriptions.appointment_id JOIN patients ON appointments.patient_id=patients.patient_id WHERE appointments.doctor_id =${id};`
    // console.log(statement);
    db.query(statement,(error,results,fields)=>{
      if(error) throw error;
      else{
        return res.json(results)
      }
    });
});


router.delete('/:id',function(req,res){
  const {id} = req.params

  let statement = `DELETE  FROM prescriptions WHERE prescription_id=${id};`
  db.query(statement,(error,results)=>{
    if(error) throw error;
    else{
      return res.json(results);
    }
  })
})


module.exports = router;
 