import React, { useEffect,useContext, useState } from 'react'
import { Container, Table } from 'react-bootstrap'
import { Link } from 'react-router-dom';
import AppContext from '../../context/AppContext';
import axios from 'axios';
import {MdOutlineModeEditOutline,MdDeleteOutline} from 'react-icons/md'
import {useNavigate,useLocation} from 'react-router-dom';


export default function Prescriptions(props) {
  const appContext = useContext(AppContext);
  const [prescriptions,setPrescriptions] =useState([]);
  const patient = appContext.authenticated.type==='patient';
  const navigate = useNavigate();
  
  

  useEffect(()=>{
    const id = appContext.authenticated.profile.id;
    axios.get(`http://localhost:5000/api/prescriptions/${id}?type=${patient ? 'patient' :'doctor'}`).then(res=>{
      console.log(res)
      setPrescriptions(res.data)
    }).catch(e=>console.log(e))
    
  },[])


  const editAppointment = (e,data)=>{
    e.preventDefault();
    navigate(`/addPrescriptions/${data.prescription_id}`,{state:{...data,edit:true}})
  }

  const deletePrescription = (e,data) =>{
    e.preventDefault();
    axios.delete(`http://localhost:5000/api/prescriptions/${data.prescription_id}`).then(result=>console.log(result)).catch(err=>console.log(err));
  }
  return (
    <Container>
        <div style={{display:'flex',flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>

        <h4>Prescriptions</h4>
        {!patient && <Link to="/addPrescriptions/0" >Add New</Link>}
        </div>
        {prescriptions.length > 0 ? (

          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Appointment ID</th>
                <th>Prescription ID</th>
                <th>Date</th>
                <th>{!patient ? 'Patient Name' : 'Doctor Name'}</th>
                {patient  && <th>Speciality</th>}
                <th>Diagnosis</th>
                <th>Treatment</th>
                <th>Details</th>
                {!patient && (

                  <th>
                
                </th>
                  )}
              </tr>
            </thead>
            <tbody>
            {prescriptions.map(data=>(
              <tr>
                <td>{data.appointment_id}</td>
                <td>{data.prescription_id}</td>
                <td>{data.appointment_date.substring(0,10)}</td>
                <td>{!patient ? `${data.first_name} ${data?.last_name}`  : data.name}</td>
                {patient  && <td>{data.specialty}</td>}
                <td>{data.diagnosis}</td>
                <td>{data.treatment}</td>
                <td>{data.prescription_details}</td>
                {!patient && 
                <td>
                  <div style={{display:'flex',flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>

                  <MdOutlineModeEditOutline size={30} onClick={(e)=>editAppointment(e,data)} />
                  <MdDeleteOutline size={30} color='red' onClick={(e)=>deletePrescription(e,data)} />
                  </div>
                </td>
                }
                
              </tr>
            ))}
            </tbody>
          </Table>
        ) : (
          <div>
            <h4>No prescriptions</h4>
          </div>
        )}

    </Container>
  )
}
