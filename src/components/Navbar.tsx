import React from 'react'
import { Container,Button,Nav,Navbar as NavbarBs } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'
import {MdLocalGroceryStore} from "react-icons/md"
const Navbar = () => {
  return (
    <NavbarBs sticky="top" className="bg-white shadow-sm mb-3">
    <Container>
        <Nav className="me-auto">
            <Nav.Link to="/" as={NavLink}>Home</Nav.Link>
            <Nav.Link to="/store" as={NavLink}>Store</Nav.Link>
            <Nav.Link to="/about" as={NavLink}>About</Nav.Link>
        </Nav>
    </Container>
    <Button style={{width:"3rem",height:"3rem", position:"relative"}} variant="outline-primary" className="rounded-circle me-5">
        <MdLocalGroceryStore style={{width:"1.5rem",height:"1.5rem"}} />
        <div className='rounded-circle d-flex bg-danger justify-content-center align-items-center'
        style={{width:"1.5rem",height:"1.5rem",color:"white",position:"absolute",bottom:0,right:0,transform:"translate(25%,25%)"}}
        >3</div>
    </Button>
    </NavbarBs>
  )
}

export default Navbar
