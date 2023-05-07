import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { Button, Col, Container, Row,Form } from 'react-bootstrap'
import AppContext from '../../context/AppContext';
import { useLocation } from 'react-router-dom';

export default function AddAppointment() {
  const [doctors,setDoctors] = useState([])
  const [date,setDate] = useState('');
  const [time,setTime] = useState('');
  const [doctorId,setDoctorId] = useState({});
  const {authenticated} = useContext(AppContext);
  const location = useLocation();
  const config = {
    'content-type':'application/json'
  }


  useEffect(()=>{
    getDoctors();
    if(location.state?.edit){
      setDate(location.state?.appointment_date?.substring(0,10));
      setTime(location.state?.appointment_time);
      setDoctorId(location.state?.doctor_id);
    }

  },[])

  const getDoctors = () => {
    axios.get('http://localhost:5000/api/doctors').then((result)=>{
      console.log(result);
      setDoctors(result.data);
    }).catch(err=>console.log(err))
  }

  const makeAnAppointment = (e) =>{
    e.preventDefault();
    const data ={
      'patient_id':authenticated.profile.patient_id,
      'doctor_id':Number(doctorId),
      'appointment_date':date,
      'appointment_time':time
    }
    axios.post('http://localhost:5000/api/appointments',data,config).then((result)=>{
    console.log(result);
    }).catch(err=>console.log(err));

  }

  const updateAppointment = (e) =>{
    e.preventDefault();
    const data ={
      'doctor_id':Number(doctorId),
      'appointment_date':date,
      'appointment_time':time
    }

    axios.put(`http://localhost:5000/api/appointments/${location.state?.appointment_id}`,data,config).then(result=>{
      console.log(result);
    }).catch(err=>console.log(err))

  }

  return (
    <Container>
      <Form  onSubmit={location.state?.edit ? updateAppointment : makeAnAppointment} >
        <Row>
          <Col sm={12} md={6} lg={4}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Select Doctor</Form.Label>
            <Form.Select aria-label="Default select example" value={doctorId} onChange={(e)=>setDoctorId(e.target.value)}  >
                <option>Open this select menu</option>
                {doctors.map((doctor)=>{
                  return <option value={doctor.doctor_id}>{doctor.name} - {doctor.specialty}</option>
                })}
            </Form.Select>
            </Form.Group>
            </Col>
     
          <Col sm={12} md={6} lg={4}>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                  <Form.Label>Date</Form.Label>
                  <Form.Control type="date" min={new Date().toISOString().split('T')[0]}  value={date} onChange={(e)=>setDate(e.target.value)}  />
              </Form.Group>
          </Col>
          <Col sm={12} md={6} lg={4}>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                  <Form.Label>Time </Form.Label>
                  <Form.Control type="time" value={time} onChange={(e)=>setTime(e.target.value)}   />
              </Form.Group>
          </Col>
      
        </Row>
 
        <Button variant="primary" type="submit">
          {location.state?.edit ? 'Update' : 'Submit'}
        </Button>
      

   
      </Form>
    </Container>
  )
}
