import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import AppContext from '../../context/AppContext';
import {useLocation, useNavigate} from 'react-router-dom'

export default function AddPrescription(props) {
    const [appointments,setAppointments] = useState([]);
    const appContext = useContext(AppContext);
    const [diagnosis,setDiagnosis] = useState('');
    const [treatment,setTreatment] = useState('');
    const [prescriptionDetails,setPrescriptionDetails] = useState('');
    const [selectedAppointment,setSelectedAppointment] = useState('');
    const location = useLocation();
    const navigate = useNavigate();
    const config = {
      'contentType' : 'application/json'
    }




    useEffect(()=>{
      getAppointments();
      if(location.state?.edit){
        console.log(location)
        
        setDiagnosis(location.state?.diagnosis);
        setTreatment(location.state?.treatment);
        setPrescriptionDetails(location.state?.prescription_details);
        setSelectedAppointment(location.state?.appointment_id);
        

      }
    
        

      
    },[])

    const getAppointmentDetails = () =>{
      const appointment_id = location.state?.appointment_id;
      console.log(appointment_id);
      // axios.get(`http://localhost:5000/api/appointments/${appointment_id}`).then((result)=>{
      //   console.log(result)
      // }).catch(err=>console.log(err))
      
    }

    const getAppointments = () =>{
      const id = appContext.authenticated.profile.id;
      axios.get(`http://localhost:5000/api/appointments/doctor/${id}`).then((result)=>{
        console.log(result);
        setAppointments(result.data)
      }).catch(err=>console.log(err));
    }


    const submitPrescription = (e)=>{
      e.preventDefault();
      const data = {
        appointment_id:Number(selectedAppointment),
        diagnosis,
        treatment,
        prescription_details :prescriptionDetails
      }

      
      axios.post('http://localhost:5000/api/add-prescription',data,config).then(result=>console.log(result)).catch(e=>console.log(e))    
    }

    const updatePrescription = (e) =>{
      e.preventDefault();
      const data = {
        diagnosis,
        treatment,
        prescription_details :prescriptionDetails
      }
      

      axios.put(`http://localhost:5000/api/add-prescription/${location.state?.prescription_id}`,data,config).then(result=>{
        console.log(result)
        navigate('/prescriptions')
      }).catch(err=>console.log(err));
    }
  return (
    <Container>
      <div style={{display:'flex',flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
 
      {appointments.length > 0 ? (
        <Form  onSubmit={location.state?.edit ? updatePrescription : submitPrescription} >
        <Row>
          <Col sm={12}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Select Appointment</Form.Label>
            <Form.Select aria-label="Default select example"value={selectedAppointment} onChange={(e)=>setSelectedAppointment(e.target.value)}  >
                <option>Open this select menu</option>
                {appointments.map((appointment)=>{
                  console.log(location.state?.appointment_id !== appointment.appointment_id,location.state?.appointment_id, appointment.appointment_id)
                  return location.state ? 
                   <option value={appointment.appointment_id} disabled={location.state?.appointment_id !== appointment.appointment_id}>{appointment.first_name} {appointment.last_name} - {appointment.appointment_date.substring(0,10)}</option> :
                   <option value={appointment.appointment_id} >{appointment.first_name} {appointment.last_name} - {appointment.appointment_date.substring(0,10)}</option> 
                })}
            </Form.Select>
            </Form.Group>
            </Col>
     
          <Col sm={12}>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                  <Form.Label>Diagnosis</Form.Label>
                  <Form.Control as="textarea" rows={3}  value={diagnosis} onChange={(e)=>setDiagnosis(e.target.value)} />
              </Form.Group>
          </Col>
          <Col sm={12}>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
                  <Form.Label>Treatment</Form.Label> 
                  <Form.Control as="textarea" rows={3} value={treatment} onChange={(e)=>setTreatment(e.target.value)} />
              </Form.Group>
          </Col>
          <Col sm={12}>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
                  <Form.Label>Prescription_details</Form.Label> 
                  <Form.Control as="textarea" rows={3} value={prescriptionDetails} onChange={(e)=>setPrescriptionDetails(e.target.value)} />
              </Form.Group>
          </Col>
      
        </Row>
 
        <Button variant="primary" type="submit">
          {location.state?.edit ? 'Update' : 'Submit'}
        </Button>
      

   
        </Form>

      ) : (
        <div>
          <h4>No active appointments</h4>
        </div>
      )}
      </div>
    </Container>
  )
}
