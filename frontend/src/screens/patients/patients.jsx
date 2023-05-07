import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { Container,Spinner,Table } from 'react-bootstrap'
import {Link} from 'react-router-dom'
import AppContext from '../../context/AppContext';
import Loader from '../../components/Loader';

export default function Patients(props) {
  const [patientsLoading,setPatientsLoading] = useState(false)
  const [patientsData,setPatientsData] = useState([]);
  const appContext = useContext(AppContext);
  const id = appContext.authenticated?.profile?.id;

  useEffect(()=>{
    getPatients();
  },[])


  const getPatients = () =>{
    setPatientsLoading(true);
    axios.get(`http://localhost:5000/api/doctors/2131654/patients`).then((result)=>{
     
      setPatientsData(result.data);
      setPatientsLoading(false);
    }).catch(err=>{
      console.log(err)
    })
  }
  return (
    <Container>
      {patientsLoading ? (
        <Loader />
      ) : 
      patientsData.length > 0 ?
      
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Appointment ID</th>
              <th>Appointment Date</th>
              <th>Patient Id</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>gender</th>
              <th>date of birth</th>
              <th>phonenumber</th>
              <th>address</th>
     
            </tr>
          </thead>
          <tbody>
          {patientsData.map(data=>(
            <tr>
              <td>{data.appointment_id}</td>
              <td>{data.appointment_date.substring(0,10)}</td>
              <td>{data.patient_id}</td>
              <td>{data.first_name}</td>
              <td>{data.last_name}</td>
              <td>{data.gender}</td>
              <td>{data.date_of_birth.substring(0,10)}</td>
              <td>{data.phone_number}</td>
              <td>{data.address}</td>
            
            </tr>
          ))}
          </tbody>
        </Table>
        :
        <div style={StyleSheet.flexCenter}>
          <h4>No patients</h4>
        </div>
      }
    </Container>
  )
}


const StyleSheet ={
  flexCenter:{
   display:'flex',
   flexDirection:'row',
   justifyContent:'center',
   alignItems:'center',
   width:'100%',
   height:'80vh'
  }
}
