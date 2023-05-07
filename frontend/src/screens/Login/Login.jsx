import React, { useContext, useState } from 'react'
import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import AppContext from '../../context/AppContext'
import { useNavigate } from 'react-router-dom'
import AddPatient from '../../components/AddPatient'
import AddDoctor from '../../components/AddDoctor'
import axios from 'axios'
import CommonLogin from '../../components/CommonLogin'

const styles ={
    link:{border:'none',borderBottomWidth:1,color:'blue',backgroundColor:'transparent',borderBottomColor:'black'}
}

export default function Login(props) {
    const appContext = useContext(AppContext)
    const navigate = useNavigate();
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [loginType,setLoginType] = useState('patientLogin');

    const login = (e) =>{
       
        axios.post("http://localhost:5000/api/patients/login",{
            password,
            email
        },{
            "Content-Type": "application/json"
        }).then(result=>{
          
            appContext.changeAuthentication({
                loggedIn:true,
                type:'doctor',
                profile:result.data
            });
            navigate('/');

        }).catch(err=>console.log(err))

    }


    const loginCase = {
        patientLogin:()=>{
            return(
                <div style={{display:'flex',flexDirection:'column'}}>
                 <CommonLogin />
                    <div style={{margin:'10px 0 10px 0'}}>
                        <p>Are you a doctor ? <Button onClick={()=>setLoginType('doctorLogin')} style={styles.link}>Login here</Button></p>
                        <p>Don't have an account ? <Button onClick={()=>setLoginType('patientCreate')} style={styles.link}>create Here</Button></p>
                    </div>
            
            </div>
            )
        },
        patientCreate:()=>{
        return(
        <div style={{display:'flex',flexDirection:'column'}}>
            <h5>Create a patient account</h5>
        <AddPatient  />
        <p>Already have an account ? <Button onClick={()=>setLoginType('patientLogin')} style={styles.link}>Login here</Button></p>
        </div>)
    },
        doctorLogin:()=>{
            return(
                <div style={{display:'flex',flexDirection:'column'}}>
                <CommonLogin doctor />
                <div style={{margin:'10px 0 10px 0'}}>
                    <p>Are you a patient ? <button onClick={()=>setLoginType('patientLogin')} style={styles.link}>Login here</button></p>
                    <p>Don't have an account ? <button onClick={()=>setLoginType('doctorCreate')} style={styles.link}>create Here</button></p>
                </div>
            </div>
            )
        },
        doctorCreate:()=> {
            return(
            <div style={{display:'flex',flexDirection:'column',marginTop:80}}>
                <h5>Create a doctor account</h5>
            <AddDoctor />
            <p>Already have an account ? <button onClick={()=>setLoginType('doctorLogin')} style={styles.link}>Login here</button></p>
            </div>)
        }

    }
 
  return (
    
  
    <Container >
            
        <div style={{display:'flex',flexDirection:'row',justifyContent:'center',alignItems:'center',height:'50vh',}}>
            {loginCase[loginType]()}
           
        </div>
    </Container>


  )
}
