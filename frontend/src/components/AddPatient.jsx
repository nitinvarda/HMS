import React, { useContext, useEffect, useState } from 'react'
import { Container,Row,Col,Button } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import {useLocation, useParams,useNavigate} from 'react-router-dom';
import AppContext from '../context/AppContext';
// import useQuery from '../../customHooks/UseQuery';

function useQuery() {
  const { search } = useLocation();

  return React.useMemo(() => new URLSearchParams(search), [search]);
}
export default function AddPatient(props) {
  const [firstName,setFirstName] = useState('');
  const [lastName,setLastName] = useState('');
  const [email,setEmail] = useState('');
  const [dob,setDob] = useState('');
  const [gender,setGender] = useState('');
  const [phoneNumber,setPhoneNumber] = useState('');
  const [address,setAddress] = useState('');
  const [password,setPassword] = useState('');
  const [result,setResult] = useState({})
  const location = useLocation();
  const navigate = useNavigate();
  const appContext = useContext(AppContext);

  

 

  useEffect(()=>{
    const data = location.state;
    if(data){

      setFirstName(data.first_name);
      setLastName(data.last_name);
      setDob(data.date_of_birth?.substring(0,10));
      setPhoneNumber(data.phone_number);
      setAddress(data.address);
      setGender(data.gender);
      setEmail(data.email);
    }
  },[])

  const addingPatient = async(e) =>{
  try {
    e.preventDefault();
    const config = {
      headers: {
          'content-type': 'multipart/form-data'
      }
  };

   
    axios({
      method: "post",
      url: "http://localhost:5000/api/add-patient",
      data: {firstName,lastName,dob,phoneNumber,gender,address,password,email},
      headers: { "Content-Type": "application/json" },
    })
      .then(function (result) {
        appContext.changeAuthentication({
          loggedIn:true,
          type:'patient',
          profile:result.data,
          id:result.data?.patient_id
      });
      navigate('/');

      })
      .catch(function (response) {
        //handle error
        console.log(response);
      });
    // const result = await axios.post('http://localhost:5000/api/add-patient',form, config)
    // console.log(result)
    
  } catch (error) {
    console.log(error)
  }
  }

  
  
  return (
    <Container >
    <Form  onSubmit={addingPatient}>
        <Row>
        <Col sm={12} md={6} lg={4}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>First Name</Form.Label>
                <Form.Control type="text" value={firstName} onChange={(input)=>setFirstName(input.target.value)}  />
            </Form.Group>
        </Col>
        <Col sm={12} md={6} lg={4}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Last Name </Form.Label>
                <Form.Control type="text" value={lastName} onChange={(input)=>setLastName(input.target.value)} />
            </Form.Group>
        </Col>
        <Col sm={12} md={6} lg={4}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" value={email} onChange={(input)=>setEmail(input.target.value)}  />
            </Form.Group>
        </Col>
        <Col sm={12} md={6} lg={4}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" value={password} onChange={(input)=>setPassword(input.target.value)}  />
            </Form.Group>
        </Col>
        <Col sm={12} md={6} lg={4}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Date of birth </Form.Label>
                <Form.Control type="date" value={dob} onChange={(input)=>setDob(input.target.value)}  />
            </Form.Group>
        </Col>
        <Col sm={12} md={6} lg={4}>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">

        <Form.Label>Gender</Form.Label>
        <Form.Select aria-label="Default select example" value={gender} onChange={(input)=>setGender(input.target.value)} >
            <option>Open this select menu</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="others">Others</option>
        </Form.Select>
        </Form.Group>
        </Col>
      <Col sm={12} md={6} lg={4}>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>Phone Number</Form.Label>
        <Form.Control type="number" value={phoneNumber} onChange={(input)=>setPhoneNumber(input.target.value)} />
      </Form.Group>
      </Col>
      <Col sm={12} md={6} lg={4}>
      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Label>Address</Form.Label>
        <Form.Control as="textarea" rows={3} value={address} onChange={(input)=>setAddress(input.target.value)} />
      </Form.Group>
      </Col>
      </Row>
 
      <Button variant="primary" type="submit">
        Submit
      </Button>
      

   
    </Form>

    </Container>
  )
}
