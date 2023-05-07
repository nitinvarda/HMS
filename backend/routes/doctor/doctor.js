var express = require('express');
var router = express.Router();
var db = require('../../db');
const generator = require('../../hashPassword');

/* GET home page. */
router.get('/', function(req, res, next) {

    let statement = `SELECT doctor_id,name,specialty,phone,email  FROM doctors;`
    db.query(statement,(error,results,fields)=>{
      if(error) throw error;
      else{
        return res.json(results)
      }
    });
});
router.delete('/',function(req,res){
  let data = req.body;
  console.log(req.body.patientId);
  let statement = `DELETE FROM doctors WHERE patient_id=${data.patientId};`
  db.query(statement,(error,result)=>{
    if(error) throw error;
    else{
      return res.json(result)
    }
  })
})



/* 
    method : GET
    route: /api/doctor/:doctorId/patients
    description: getting patients who has an appointment with the specific doctor
*/

router.get('/:doctorId/patients',(req ,res)=>{
    let {doctorId} = req.params;
    console.log(doctorId)
    let statement = `SELECT appointments.appointment_id,patients.patient_id,patients.first_name,patients.gender,patients.date_of_birth,patients.phone_number,patients.address,patients.last_name,appointments.appointment_date,appointments.appointment_time FROM appointments JOIN patients ON appointments.patient_id = patients.patient_id WHERE appointments.doctor_id =${doctorId};`


    db.query(statement,(error,result)=>{
      if(error) {
      
        throw new Error(error)
      }
      else{
        res.json(result);
      }
    })

})







router.post('/login',(req,res) =>{
    let {email,password} = req.body;

    db.query(`SELECT * from doctors WHERE email='${email}'`,(error,result)=>{
      if(error) throw error;
      else{
        if(result.length > 0){

          let hashedPass = generator['plainPassword'](password,result[0]?.password);
          
          if(hashedPass){
            const {password,...rest} = result[0];
            res.json(rest)
          }
          else{
            res.status(401);
            res.json({
              message: 'Invalid password'
           })
            
          }
          
        }
        else{
          res.status(401);
          res.json({
            message:'Doctor not found, sign up.'
          })
        }
      } 
    });
    
})

router.post('/create',(req,res)=>{
    let {email,name,speciality,phone,password} = req.body;
    let hashedPass = generator['hashPassword'](password);
    let doctorId = Math.floor(Math.random()*90000) + 100000;
    let statement = `INSERT INTO doctors (doctor_id, name, specialty, phone, email,password)
    VALUES (${doctorId}, '${name}', '${speciality}','${phone}','${email}','${hashedPass}');`
    
    db.query(statement,(err,result)=>{
        if(err) throw err;
        else{
            res.json({email,name,speciality,phone,doctorId});
        }
    })
})

router.get('/tables',(req,res)=>{
  db.query(`show tables`,(error,result)=>{
    if(error) throw error;
    else{
      res.json(result)
    }
  })
})

router.post('/create-account',(req,res)=>{
  let {} = req.body;

})

module.exports = router;
 