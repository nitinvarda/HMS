import React, { useContext, useEffect, useState } from 'react'
import { Button, Container, Modal, Table } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import AppContext from '../../context/AppContext'
import axios from 'axios';
import {MdOutlineModeEditOutline,MdDeleteOutline} from 'react-icons/md'

export default function Appointments(props) {
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
    axios.get(`http://localhost:5000/api/appointments/doctor/${doctorId}`).then(res=>{
      console.log(res);
      setAppointmentsData(res.data);
    })
    .catch(err=>console.log(err))
  }

  const getPatientAppointments = () =>{
    const patientId = appContext.authenticated.profile.patient_id;
    axios.get(`http://localhost:5000/api/appointments/patient/${patientId}`).then(res=>{
      console.log(res);
      setAppointmentsData(res.data);
    })
    .catch(err=>console.log(err))
  }
  const editAppointment = (e,data)=>{
    e.preventDefault();
    navigate(`/addAppointment/${data.appointment_id}`,{state:{...data,edit:true}})

  }



  const deleteAppointment = (e,data)=>{
    e.preventDefault();
    setShowModal(true)
    // axios.delete(`http://localhost:5000/api/appointments/${data.appointment_id}`)
    // .then(result=>console.log(result))
    // .catch(err=>console.log(err))
  }

  const closeModal = (e) =>{
  
    setShowModal(false);
  }

  return (
    <Container>
        <div style={{display:'flex',flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>

        <h5>Current Appointments</h5>
        <Link to="/appointments/old">old appointment</Link>
        {appContext.authenticated?.type==='patient' && 
        <Link to="/addAppointment/0">Add a new appointment</Link>
        }
        

        
        </div>
        {appointmentsData.length > 0 ? (
          <>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Appointment ID</th>
              <th>{!patient ? 'Patient Name' : 'Doctor Name'}</th>
              {patient  && <th>Speciality</th>}
              <th>Appointment date</th>
              <th>Appointment time</th>
              <th></th>
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
              <td>
                {!patient ? 
                <div style={{display:'flex',flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>

              
                <MdDeleteOutline size={30} color='red' onClick={(e)=>deleteAppointment(e,data)} />
                </div> :
                <div style={{display:'flex',flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>

                <MdOutlineModeEditOutline size={30} onClick={(e)=>editAppointment(e,data)} />
                <MdDeleteOutline size={30} color='red' onClick={(e)=>deleteAppointment(e,data)} />
                </div> 
                }

              </td>
              
            </tr>
          ))}
          </tbody>
        </Table>
        <Modal show={showModal} onHide={closeModal}>
          <Modal.Header closeButton>
            <Modal.Title>Delete Appointment</Modal.Title>
          </Modal.Header>
          <Modal.Body>you are about to delete an appointment, it also earses </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={closeModal}>
              Close
            </Button>
            <Button variant="primary" onClick={closeModal}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
        </>
        )
        :
        (
          <div>
            <p>No appointments currently</p>
          </div>
        )

              }
    </Container>
  )
}
