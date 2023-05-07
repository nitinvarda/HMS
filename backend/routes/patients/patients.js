var express = require('express');
var router = express.Router();
var db = require('../../db');
const generator = require('../../hashPassword');

/* GET home page. */
router.get('/', function(req, res, next) {

    let statement = `SELECT * FROM patients`
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
  let statement = `DELETE FROM patients WHERE patient_id=${data.patientId};`
  db.query(statement,(error,result)=>{
    if(error) throw error;
    else{
      return res.json(result)
    }
  })
})

router.post('/login',(req,res) =>{
    let {email,password} = req.body;
    console.log(email,password);
    db.query(`SELECT * from patients WHERE email='${email}'`,(error,result)=>{
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
            // throw new Error('Invalid email or password')
           
          }
          
        }
        else{
          res.status(401);
          res.json({
            message:'Patient not found, sign up.'
          })
        }

      } 
    });
    
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
 