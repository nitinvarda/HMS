import logo from './logo.svg';
import './App.css';
import {Routes,Route} from 'react-router-dom';
import Home from './screens/home/home';
import Patients from './screens/patients/patients';
import Doctors from './screens/doctors/doctors';
import { Container } from 'react-bootstrap';
import NavigationBar from './screens/navbar/Navbar';
import AddingDoctor from './screens/doctors/AddingDoctor';
import AddingPatient from './screens/patients/AddingPatient';
import Login from './screens/Login/Login';
import AppContext from './context/AppContext';
import { useEffect, useState } from 'react';
import Appointments from './screens/appointments/Appointments';
import AddAppointment from './screens/appointments/AddAppointment';
import Profile from './screens/profile/profile';
import AddPrescription from './screens/prescriptions/AddPrescription';
import Prescriptions from './screens/prescriptions/Prescriptions';
import OldAppointments from './screens/appointments/OldAppointments';

function App() {
  const [authenticated,setAuthenticated] = useState({
    loggedIn:false,
    type:'',
    profile:{}
  });

  useEffect(()=>{
    let profile = localStorage.getItem('person');
    console.log(profile);
    if(profile){
      const parsedProfile = JSON.parse(profile);
      setAuthenticated({
        loggedIn:true,
        type:parsedProfile.type,
        profile:parsedProfile
      })
    }
  },[])


  const changeAuthentication = (value)=>{
    setAuthenticated(value);
    if(value.loggedIn){

      localStorage.setItem("person",JSON.stringify({...value.profile,type:value.type}));
    }
  }
  console.log(authenticated)
  return (
    <AppContext.Provider value={{authenticated,changeAuthentication}}>

   
    <div>
      <NavigationBar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        {authenticated.loggedIn && 
        <>
       
        <Route path='/doctors' element={<Doctors />} />
        <Route path='/patients' element={<Patients />} />

      
        
        <Route path='/addPatient/:id' element={<AddingPatient />} />

        <Route path='/doctors' element={<Doctors />} />
        <Route path='/addDoctor' element={<AddingDoctor />} />
        <Route path='/appointments' element={<Appointments />} />
        <Route path='/appointments/old' element={<OldAppointments />} />
        <Route path='/addAppointment/:id' element={<AddAppointment />} />

        <Route path='/prescriptions' element={<Prescriptions />} />
        <Route path="/addPrescriptions/:id" element={<AddPrescription />} />

        <Route path='/profile' element={<Profile />} />
        </>
        }

      </Routes>
    </div>
    </AppContext.Provider>

  );
}

export default App;
