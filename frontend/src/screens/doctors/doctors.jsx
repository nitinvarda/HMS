import React, { useContext, useEffect, useState } from 'react'
import { Container, Table } from 'react-bootstrap'
import {Link} from 'react-router-dom'
import AppContext from '../../context/AppContext'
import axios from 'axios';

export default function Doctors() {
  const appContext = useContext(AppContext);
  const [doctors,setDoctors] = useState([])

  useEffect(()=>{
    axios.get('http://localhost:5000/api/doctors').then(result=>{
      console.log(result)
    setDoctors(result.data)
    }).catch(err=>console.log(err))
  },[])

  console.log(doctors)
  return (
    <Container>
      {!(appContext.authenticated.type==='patient' || appContext.authenticated.type==='doctor')  && 
      <Link to="/addDoctor">Add</Link>
         }

    <div>
      <p>doctors </p>
      <Table striped bordered hover>
          <thead>
            <tr>
              <th>Doctor Name</th>
              <th>Email</th>
              <th>Speciality</th>
            </tr>
          </thead>
          <tbody>
          {doctors.map(data=>(
            <tr>
              <td>{data.name}</td>
              <td>{data.email}</td>
              <td>{data.specialty}</td>
              
            </tr>
          ))}
          </tbody>
        </Table>
      
    </div>
    </Container>
  )
}
