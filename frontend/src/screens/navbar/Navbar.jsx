import React, { useContext } from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import {Link} from 'react-router-dom';
import AppContext from '../../context/AppContext';

export default function NavigationBar(props) {
  const appContext = useContext(AppContext);
  console.log(appContext)
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" style={{marginBottom:30}}>
    <Container>
      <Link to="/" className='navbar-brand'>HMS</Link>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse style={{flexDirection:'row',justifyContent:appContext.authenticated?.loggedIn ? 'space-between' : 'flex-end',alignItems:'center'}}>
        {appContext.authenticated?.loggedIn  && 
        <Nav className="justify-content-end">
          {appContext.authenticated?.type==='patient' ? 
          <>
        <Link className='nav-link' to="/doctors" style={{textDecoration:'none'}}>Doctors</Link>
       
        <Link className='nav-link' to="/doctors" style={{textDecoration:'none'}}>Medical test</Link>
          </>
          :
        <Link className='nav-link' to="/patients" style={{textDecoration:'none'}}>Patients</Link>
          }
        <Link className='nav-link' to="/appointments" style={{textDecoration:'none'}}>Appointments</Link>
        <Link className='nav-link' to="/prescriptions" style={{textDecoration:'none'}}>Prescriptions</Link>
        

         
        </Nav>
        }
         {!appContext.authenticated.loggedIn ?
        <Nav>
          <Link to="/login" className='nav-link' style={{textDecoration:'none'}}>Login</Link>
        </Nav> :
        <Nav>
          <Link to="/profile" className='nav-link' style={{textDecoration:'none'}}>Profile</Link>
        </Nav>
          }
      </Navbar.Collapse>
    </Container>
  </Navbar>
  )
}
