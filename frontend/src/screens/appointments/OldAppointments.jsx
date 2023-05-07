import React, { useContext, useEffect, useState } from 'react'
import { Button, Container, Modal, Table } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import AppContext from '../../context/AppContext'
import axios from 'axios';
import {MdOutlineModeEditOutline,MdDeleteOutline} from 'react-icons/md'

export default function OldAppointments(props) {
  const appContext = useContext(AppContext);
  const [appointmentsData,setAppointmentsData] = useState([]);
  const patient = appContext.authenticated.type==='patient';
  const navigate = useNavigate();
  const [showModal,setShowModal] = useState(false);

  useEffect(()=>{
    getAppointmentsData();
    
  },[])

  const getAppointmentsData = () =>{
    if(patient){

      getPatientAppointments();
    }
    else{
      getDoctorsAppointments();
    }
  }


  const getDoctorsAppointments = () =>{
    const doctorId = appContext.authenticated.profile.doctor_id;
    axios.get(`http://localhost:5000/api/appointments/old/doctor/${doctorId}`).then(res=>{
      console.log(res);
      setAppointmentsData(res.data);
    })
    .catch(err=>console.log(err))
  }

  const getPatientAppointments = () =>{
    const patientId = appContext.authenticated.profile.patient_id;
    axios.get(`http://localhost:5000/api/appointments/old/patient/${patientId}`).then(res=>{
      console.log(res);
      setAppointmentsData(res.data);
    })
    .catch(err=>console.log(err))
  }



  return (
    <Container>
        <div style={{display:'flex',flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>

        <h5>Old Appointments</h5>
        
        <Link to="/appointments">Current Appointments</Link>
        
        

        
        </div>
        {appointmentsData.length > 0 ? (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Appointment ID</th>
              <th>{!patient ? 'Patient Name' : 'Doctor Name'}</th>
              {patient  && <th>Speciality</th>}
              <th>Appointment date</th>
              <th>Appointment time</th>
          
            </tr>
          </thead>
          <tbody>
          {appointmentsData.map(data=>(
            <tr >
              <td>{data.appointment_id}</td>
              <td>{!patient ? `${data.first_name} ${data.last_name}`  : data.name}</td>
              {patient  && <td>{data.specialty}</td>}
              <td>{data.appointment_date.substring(0,10)}</td>
              <td>{data.appointment_time}</td>
             
              
            </tr>
          ))}
          </tbody>
        </Table>
            
        ): 
        (   
            <div>
                <p>No appointments currently</p>
            </div>
        )}
    </Container>
  )
}
