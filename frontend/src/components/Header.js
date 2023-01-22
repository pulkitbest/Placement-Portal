import React from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Link} from 'react-router-dom'
import {Navbar, Nav, Container, NavDropdown} from 'react-bootstrap'
import { logout } from '../actions/userActions'

const Header = () => {
  const dispatch = useDispatch()

  const userLogin = useSelector(state => state.userLogin)
  const {userInfo} = userLogin

  const logoutHandler = () => {
    dispatch(logout())
  }

  return (
    <header>
      <Navbar bg="dark" variant='dark' expand="lg" collapseOnSelect>
        <Container>
          <Nav.Link as={Link} to="/">
            <Navbar.Brand>Proshop</Navbar.Brand>
          </Nav.Link>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className='ms-auto'>
              {userInfo && userInfo.isAdmin && (
                <NavDropdown title='Admin Controls' id='adminmenu'>
                  <NavDropdown.Item>
                    <Nav.Link as={Link} to='/admin/userlist'>
                      <h6>Users</h6>
                    </Nav.Link>
                  </NavDropdown.Item>
                  <NavDropdown.Item>
                    <Nav.Link as={Link} to='/admin/productlist'>
                      <h6>Products</h6>
                    </Nav.Link>
                  </NavDropdown.Item>
                  <NavDropdown.Item>
                    <Nav.Link as={Link} to='/admin/orderlist'>
                      <h6>Orders</h6>
                    </Nav.Link>
                  </NavDropdown.Item>
                </NavDropdown>
              )}
              <Nav.Link as={Link} to="/cart">
                <i className='fas fa-shopping-cart'></i> Cart
              </Nav.Link>
              {userInfo ? (
                <NavDropdown title={userInfo.name} id='username'>
                  <NavDropdown.Item>
                    <Nav.Link as={Link} to='/profile'>
                      <h6>Profile</h6>
                    </Nav.Link>
                  </NavDropdown.Item>
                  <NavDropdown.Item onClick={logoutHandler}>
                    <Nav.Link>
                      <h6>Log Out</h6>
                    </Nav.Link>
                  </NavDropdown.Item>
                </NavDropdown>
              ) :
                <Nav.Link as={Link} to="/login">
                  <i className='fas fa-user'></i> Sign In
                </Nav.Link>
              }
            </Nav>
          </Navbar.Collapse>
          
        </Container>
      </Navbar>
    </header>
  )
}

export default Header
