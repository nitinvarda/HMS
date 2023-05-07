var express = require('express');
var router = express.Router();
var db = require('../../db');
const generator = require('../../hashPassword');



/* 
    method : POST
    route: /api/appointments/
    description: creating an appointment 
*/
router.post('/',(req,res)=>{
    let {patient_id,doctor_id,appointment_date,appointment_time} = req.body;
    let appointmentId = Math.floor(Math.random()*90000) + 100000;
    let statement = `INSERT INTO appointments (appointment_id, patient_id, doctor_id, appointment_date , appointment_time)
    VALUES (${appointmentId},${patient_id},${doctor_id}, '${appointment_date}', '${appointment_time}');`

    db.query(statement,(error,result)=>{
        if(error) throw error;
        else{
            res.json(result)
        }
    })

})

/* 
    method : PUT
    route: /api/appointments/:id
    description: edit appointments
*/

router.put('/:id',(req,res)=>{
    let {doctor_id,appointment_date,appointment_time} = req.body;
    let {id} = req.params;
    `UPDATE appointments SET  doctor_id=${doctor_id},appointment_date='${appointment_date}', appointment_time='${appointment_time}'  WHERE appointment_id = ${id};`

    db.query(statement,(error,result)=>{
        if(error) throw error;
        else{
            res.json(result);
        }
    })
})



/* 
    method : DELETE
    route: /api/appointments/:id
    description: delete an  appointments
*/

router.delete('/:id',(req,res)=>{
    let {id} = req.params;

    let statement = `DELETE  FROM appointments WHERE appointment_id=${id};`
    db.query(statement,(error,result)=>{
        if(error) throw error;
        else{
            res.json(result);
        }
    })
})

/* 
    method : GET
    route: /api/appointments/:id
    description: get the appointment with id
*/

router.get('/:id',(req,res)=>{
    let {id} = req.params;

    let statement = `SELECT * FROM APPOINTMENTS WHERE  appointment_id=${id};`
    db.query(statement,(error,result)=>{
        if(error) throw error;
        else{
            res.json(result);
        }
    })
})

/* 
    method : GET
    route: /api/appointments/patient/:patientId
    description: joining appoinmtnets and patient tables
*/


router.get('/patient/:patientId',(req,res)=>{
    let {patientId} = req.params;
  

    let statement  = `SELECT appointments.appointment_id,doctors.doctor_id,doctors.name,doctors.specialty,appointments.appointment_date,appointments.appointment_time FROM appointments JOIN doctors ON appointments.doctor_id = doctors.doctor_id WHERE appointments.patient_id = ${patientId} AND appointments.appointment_date >= CURRENT_DATE();`
    
    db.query(statement,(error,result)=>{
        if(error) throw error;
        else{
            res.json(result)
        }
    })
})
/* 
    method : GET
    route: /api/appointments/old/patient/:patientId
    description: joining appoinmtnets and patient tables
*/


router.get('/old/patient/:patientId',(req,res)=>{
    let {patientId} = req.params;
  

    let statement  = `SELECT appointments.appointment_id,doctors.doctor_id,doctors.name,doctors.specialty,appointments.appointment_date,appointments.appointment_time FROM appointments JOIN doctors ON appointments.doctor_id = doctors.doctor_id WHERE appointments.patient_id = ${patientId} AND appointments.appointment_date <= CURRENT_DATE();`
    
    db.query(statement,(error,result)=>{
        if(error) throw error;
        else{
            res.json(result)
        }
    })
})


/* 
    method : GET
    route: /api/appointments/doctor/:doctorID
    description: combing appointment with doctor table
*/


router.get('/doctor/:doctorId',(req,res)=>{
    let {doctorId} = req.params;
    let statement  = ` SELECT appointments.appointment_id,patients.first_name,patients.last_name,appointments.appointment_date,appointments.appointment_time FROM appointments JOIN patients ON appointments.patient_id = patients.patient_id WHERE appointments.doctor_id = ${doctorId} AND appointments.appointment_date >= CURRENT_DATE();`
    
    db.query(statement,(error,result)=>{
        if(error) throw error;
        else{
            res.json(result)
        }
    })
})



/* 
    method : GET
    route: /api/appointments/old/doctor/:doctorID
    description: combing appointment with doctor table
*/


router.get('/old/doctor/:doctorId',(req,res)=>{
    let {doctorId} = req.params;
    let statement  = ` SELECT appointments.appointment_id,patients.first_name,patients.last_name,appointments.appointment_date,appointments.appointment_time FROM appointments JOIN patients ON appointments.patient_id = patients.patient_id WHERE appointments.doctor_id = ${doctorId} AND appointments.appointment_date <= CURRENT_DATE();`
    
    db.query(statement,(error,result)=>{
        if(error) throw error;
        else{
            res.json(result)
        }
    })
})

module.exports = router;