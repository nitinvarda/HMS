import axios from 'axios';
import React, { useContext, useState } from 'react'
import { Container,Row,Col, Button } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import AppContext from '../context/AppContext';
import {useNavigate} from 'react-router-dom';

export default function AddDoctor(props) {
  const [name,setName] = useState('');
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [speciality,setSpeciality] = useState('');
  const [phone,setPhone] = useState('');
  const navigate = useNavigate();
  const appContext = useContext(AppContext);

  const createAccount = (e) =>{
    e.preventDefault();
    // console.log("clicked");
    axios.post('http://localhost:5000/api/doctors/create',{
      name,
      email,
      speciality,
      phone,
      password
    },{
      "Content-Type": "application/json"
  }).then(result=>{
    console.log(result)
    appContext.changeAuthentication({
        loggedIn:true,
        type:'doctor',
        profile:result.data
    });
    navigate('/');
  }).catch(err=>console.log(err))
  }

  return (
    <Container >
      <h2> Add New Doctor</h2>
    <Form onSubmit={createAccount}>
        <Row className="justify-content-md-center">
        <Col sm={12}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" value={name} onChange={(e)=>setName(e.target.value)}  />
            </Form.Group>
        </Col>
        </Row>
        <Row className="justify-content-md-center">
        <Col sm={12}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                <Form.Label>Email </Form.Label>
                <Form.Control type="email" value={email} onChange={(e)=>setEmail(e.target.value)}  />
            </Form.Group>
        </Col>
        </Row>
        <Row className="justify-content-md-center">
          <Col sm={12}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">

            <Form.Label>Speciality</Form.Label>
            <Form.Select aria-label="Default select example" value={speciality} onChange={(e)=>setSpeciality(e.target.value)}  >
                <option>Open this select menu</option>
                <option value="Physician">Physician</option>
                <option value="Psychiatrists">Psychiatrists</option>
                <option value="Neurologists">Neurologists</option>
                <option value="Radiologists">Radiologists</option>
                <option value="Neurologists">Neurologists</option>
                <option value="Pediatricians">Pediatricians</option>
                <option value="Cardiologists">Cardiologists</option>
            </Form.Select>
            </Form.Group>
          </Col>
        </Row>

        <Row className="justify-content-md-center">
          <Col sm={12}>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput4">
            <Form.Label>Phone Number</Form.Label>
            <Form.Control type="number" value={phone} onChange={(e)=>setPhone(e.target.value)}  />
          </Form.Group>
          </Col>
      
        </Row>
        <Row className="justify-content-md-center">
          <Col sm={12}>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput5">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" value={password} onChange={(e)=>setPassword(e.target.value)}  />
          </Form.Group>
          </Col>
      
        </Row>

        <Row className="justify-content-md-center">

        <Col  sm={12} >
          

        <Button style={{width:'100%'}} type='submit' >Create Account</Button>
          
        </Col>
        </Row>
 

      

   
    </Form>

    </Container>
  )
}
