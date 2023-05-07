import React, { useEffect, useState } from 'react'
import { Container,Row,Col,Button } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import {useLocation, useParams,useNavigate} from 'react-router-dom';
import AddPatient from '../../components/AddPatient';
// import useQuery from '../../customHooks/UseQuery';


function useQuery() {
  const { search } = useLocation();

  return React.useMemo(() => new URLSearchParams(search), [search]);
}
export default function AddingPatient(props) {
  const [firstName,setFirstName] = useState('');
  const [lastName,setLastName] = useState('');
  const [dob,setDob] = useState('');
  const [gender,setGender] = useState('');
  const [phoneNumber,setPhoneNumber] = useState('');
  const [address,setAddress] = useState('');
  const [result,setResult] = useState({})
  const location = useLocation();
  const navigate = useNavigate();

  

  const  search  = useQuery();
  console.log(search.get('edit'));

  useEffect(()=>{
    const data = location.state;
    if(data){

      setFirstName(data.first_name);
      setLastName(data.last_name);
      setDob(data.date_of_birth?.substring(0,10));
      setPhoneNumber(data.phone_number);
      setAddress(data.address);
      setGender(data.gender);
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
    const form = new FormData();
    console.log({firstName,lastName,dob,phoneNumber,gender,address})
   
    axios({
      method: "post",
      url: "http://localhost:5000/api/add-patient",
      data: {firstName,lastName,dob,phoneNumber,gender,address},
      headers: { "Content-Type": "application/json" },
    })
      .then(function (response) {
        //handle success
        console.log(response);
        navigate('/patients');

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
      <h2> Add New Patient</h2>
    <AddPatient />
   

    </Container>
  )
}
