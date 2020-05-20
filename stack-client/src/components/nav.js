import React from 'react';
import '../App.css';
import { Navbar , Nav } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

class nav extends React.Component {
  
  Logout = () => {
    localStorage.clear();
    window.location.href = '/login'
  }

  render() {
    if(localStorage.getItem('userEmail')){
      return (
        <Navbar bg="light" variant="light">
          <Navbar.Brand >Online Store</Navbar.Brand>
    
          <Navbar.Collapse class="collapse navbar-collapse">
            <Nav class="navbar-nav ml-auto">
              <Nav.Link onClick={ this.Logout } >Logout</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      );
    }else{
      return (
        <Navbar bg="light" variant="light">
          <Navbar.Brand >Online Store</Navbar.Brand>
    
          <Navbar.Collapse class="collapse navbar-collapse">
            <Nav class="navbar-nav ml-auto">
              <Nav.Link href="/login">Login</Nav.Link>
              <Nav.Link href="/register">Register</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      );
    }

  }
}

export default nav;