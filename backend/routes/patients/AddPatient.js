var express = require('express');
const generator = require('../../hashPassword');
var router = express.Router();
var db = require('../../db');

/* GET home page. */
router.post('/',function(req, res, next) {
  
    let params = req.body;
    let patientID = Math.floor(Math.random()*90000) + 10000;
    let firstName = params.firstName;
    let lastName = params.lastName;
    let email = params.email;
    let dateOfBirth = params.dob;
    let gender = params.gender;
    let phoneNumber = params.phoneNumber;
    let address = params.address;
    let password = params.password;
    let hashedPass = generator['hashPassword'](password);

    // res.json({...params,password:hashedPass});
    console.log({...params});
    // console.log(`${patientID}, '${firstName}', '${lastName}','${dateOfBirth}', '${gender}','${address}', ${phoneNumber},'${hashedPass}','${email}'`);

    let statement = `INSERT INTO patients (patient_id, first_name, last_name, date_of_birth, gender, address,password,phone_number,email)
    VALUES (${patientID}, '${firstName}', '${lastName}','${dateOfBirth}', '${gender}','${address}','${hashedPass}', ${phoneNumber},'${email}');`

    db.query(statement,(error,results,fields)=>{
      if(error) throw error;
      else{
        return res.json(results)
      }
    });

   
    // res.json(req.body);
    

});



module.exports = router;
