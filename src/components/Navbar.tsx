import React from 'react'
import { Container,Button,Nav,Navbar as NavbarBs } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'
import {MdLocalGroceryStore} from "react-icons/md"
import { useShoppingCart } from '../context/ShppingCartContext'
import {AiOutlineUserAdd} from "react-icons/ai"


const Navbar = () => {
  const {openCart,cartQuantity} = useShoppingCart()
  return (
    <NavbarBs sticky="top" className="bg-white shadow-sm mb-3">
    <Container>
        <Nav className="me-auto">
            <Nav.Link to="/" as={NavLink}>MiniGame</Nav.Link>
            <Nav.Link to="/store" as={NavLink}>Store</Nav.Link>
            <Nav.Link to="/mark" as={NavLink}>Mark</Nav.Link>
            <Nav.Link to="/notes" as={NavLink}>Notes</Nav.Link>
            <Nav.Link to="/dashboard" as={NavLink}>Dashboard</Nav.Link>
        </Nav>
    </Container>  
    <Nav.Link to="/register" as={NavLink}>
    <AiOutlineUserAdd style={{width:"3rem",height:"2.5rem",marginLeft:"-25%"}} />
    </Nav.Link>
    <Button 
    onClick={openCart}
    style={{width:"3rem",height:"3rem", position:"relative"}} variant="outline-primary" className="rounded-circle me-5">
        <MdLocalGroceryStore style={{width:"1.5rem",height:"1.5rem"}} />
        <div className='rounded-circle d-flex bg-danger justify-content-center align-items-center'
        style={{width:"1.5rem",height:"1.5rem",color:"white",position:"absolute",bottom:0,right:0,transform:"translate(25%,25%)"}}
        >{cartQuantity}</div>
    </Button>
    </NavbarBs>
  )
}

export default Navbar
