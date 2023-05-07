import React, { useContext } from 'react'
import AppContext from '../../context/AppContext'
import { useNavigate } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import {FaUserCircle} from 'react-icons/fa'


const getInformation =(type,profile)  => {
  
    return (
      <div style={{display:'flex',flexDirection:'column',alignItems:'center'}}>
          <div style={{width:150,height:150,borderRadius:'50%',display:'flex',flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
            {type==='doctor' ? 
              <img src='https://cdn.pixabay.com/photo/2016/09/02/14/26/doctor-1639328_1280.png' style={{width:'100%',height:'100%',borderRadius:'50%'}} />
              :
              <FaUserCircle size={100} />
            }
          </div>
          <div style={{display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center'}}>

          <div style={{display:'flex',flexDirection:'column',alignItems:'center'}}>
            {type==='doctor' ? 
            <h4>{profile.name.toUpperCase()} - {profile.specialty}</h4> :
            <h4>{profile.first_name} {profile.last_name}</h4>
          }
            <h5>{profile.email}</h5>
         

          </div>
          </div>

        </div>
    )
  
}
export default function Profile() {
    const {authenticated:{type,loggedIn,profile},changeAuthentication} = useContext(AppContext)
    console.log(loggedIn,profile);
    const navigate = useNavigate();


    const logout = () =>{
      localStorage.removeItem("person");
      changeAuthentication({
        loggedIn:false,
        type:'',
        profle:{}
      })
      navigate('/login');
      
    }
  return (
    <Container>
      <div style={{display:'flex',flexDirection:'column',justifyContent:'space-between',alignItems:'center'}}>


      {getInformation(type,profile)}
     
      {/* {type==='doctor' ? (
        <div style={{display:'flex',flexDirection:'column',alignItems:'center'}}>
          <div style={{width:150,height:150,borderRadius:'50%',display:'flex',flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
            <img src='https://cdn.pixabay.com/photo/2016/09/02/14/26/doctor-1639328_1280.png' style={{width:'100%',height:'100%',borderRadius:'50%'}} />
          </div>
          <div style={{display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center'}}>

          <div style={{display:'flex',flexDirection:'column',alignItems:'center'}}>
            
            <h4>{profile.name.toUpperCase()} - {profile.specialty}</h4>
            <h5>{profile.email}</h5>
         

          </div>
          </div>

        </div>
      ) :(
        <div>
          <div>
            
          </div>
          <h4>{profile.first_name} {profile.last_name}</h4>
          <h5>{profile.email}</h5>
        </div>

      )} */}


        <button onClick={logout} style={{margin:20}}>logout</button>
        </div>
    </Container>
  )
}
