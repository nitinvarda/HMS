var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var db = require('./db');
var cors = require('cors');
require('dotenv').config();

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var patientsRouter = require('./routes/patients/patients');
var addPatientRouter = require('./routes/patients/AddPatient');
var doctorRouter = require('./routes/doctor/doctor');
var appointmentRouter = require('./routes/appointments/appointments');
var addPrescriptionRouter = require('./routes/prescriptions/AddPrescriptions');
var prescriptionRouter = require('./routes/prescriptions/prescriptions');
var generator = require('./hashPassword')


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

//Checks if patient exists in database
app.get('/getCities',(req,res)=>{
  let statement = `SELECT * FROM city where countrycode='IND' && district='Andhra Pradesh'`
  db.query(statement,(error,results,fields)=>{
    if(error) throw error;
    else{
      return res.json({
        data:results
      })
    }
  });
});




app.use('/', indexRouter);
app.use('/users', usersRouter);



app.use('/api/patients',patientsRouter);
app.use('/api/doctors',doctorRouter);
app.use('/api/appointments',appointmentRouter);
app.use('/api/add-patient',addPatientRouter);
app.use('/api/add-prescription',addPrescriptionRouter);
app.use('/api/prescriptions',prescriptionRouter);





// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
