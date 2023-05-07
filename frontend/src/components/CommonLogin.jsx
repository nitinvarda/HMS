import axios from 'axios';
import React, { useContext, useState } from 'react'
import { Button, Form } from 'react-bootstrap';
import AppContext from '../context/AppContext';
import { useNavigate } from 'react-router-dom';


export default function CommonLogin(props) {
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const appContext = useContext(AppContext)
    const navigate = useNavigate();
    const [error,setError] = useState('')


    const doctorLogin = (e) =>{
        e.preventDefault();

        console.log(password,email);
        axios.post("http://localhost:5000/api/doctors/login",{
            password,
            email
        },{
            "Content-Type": "application/json"
        }).then(result=>{
          
            appContext.changeAuthentication({
                loggedIn:true,
                type:'doctor',
                profile:{
                    ...result.data,
                    id:result.data?.doctor_id
                }
            });
            navigate('/');

        }).catch(err=>{
         
            setError(err.response?.data?.message)
            setTimeout(()=>{
                setError('')
            },4000)
        })

    }

    const patientLogin = (e) =>{
     
        e.preventDefault();
            axios.post("http://localhost:5000/api/patients/login",{
                password,
                email
            },{
                "Content-Type": "application/json"
            }).then(result=>{
              
                appContext.changeAuthentication({
                    loggedIn:true,
                    type:'patient',
                    profile:{
                        ...result.data,
                        id:result.data?.patient_id
                    }
                });
                navigate('/');
    
            }).catch(err=>{
         
                setError(err.response?.data?.message)
                setTimeout(()=>{
                    setError('')
                },4000)
            })
    
        
    }

    const enterToLogin = (event) =>{
        if (event.key === 'Enter') {
            event.preventDefault();
            event.stopPropagation();

            login(event);
            
        }
    }

    const login = (e) =>{
        return props.doctor ? doctorLogin(e) : patientLogin(e);
    }

    return(
        <div style={{display:'flex',flexDirection:'column'}}>
         <h5>{props.doctor ? 'Doctor Login' : 'Patient Login' }</h5>
        <Form>

        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" value={email} onChange={(e)=>setEmail(e.target.value)}   />
        </Form.Group>

        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Password </Form.Label>
            <Form.Control type="password" value={password} onChange={(e)=>setPassword(e.target.value)} onKeyDown={enterToLogin}  />
        </Form.Group>
        {error && <p style={{fontWeight:'bold',color:'red'}}>{error}</p>}
        <Button onClick={login}>Login</Button>
    
    </Form>
    </div>
  )
}
