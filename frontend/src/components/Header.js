import React from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Link} from 'react-router-dom'
import {Navbar, Nav, Container, NavDropdown} from 'react-bootstrap'
import { logout } from '../actions/userActions'
import { recruiterLogout } from '../actions/recruiterActions'

const Header = () => {
  const dispatch = useDispatch()

  const userLogin = useSelector(state => state.userLogin)
  const {userInfo} = userLogin

  const recruiterLogin = useSelector(state => state.recruiterLogin)
  const {recruiterInfo} = recruiterLogin

  const logoutHandler = () => {
    dispatch(logout())
  }

  const recruiterLogoutHandler = () => {
    dispatch(recruiterLogout())
  }

  return (
    <header>
      <Navbar bg="dark" variant='dark' expand="lg" collapseOnSelect> 
        <Container>
          <Nav.Link as={Link} to="/">
            <Navbar.Brand>Placement Portal</Navbar.Brand>
          </Nav.Link>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className='ms-auto'>
              {userInfo && userInfo.isAdmin && (
                <NavDropdown title='Admin Controls' id='adminmenu'>
                  <NavDropdown.Item>
                    <Nav.Link as={Link} to='/admin/userlist'>
                      <h6><i class="fa fa-user" aria-hidden="true"></i> Students</h6>
                    </Nav.Link>
                  </NavDropdown.Item>
                  <NavDropdown.Item>
                    <Nav.Link as={Link} to='/admin/recruiterList'>
                      <h6><i class="fa-solid fa-mug-saucer"></i> Recruiters</h6>
                    </Nav.Link>
                  </NavDropdown.Item>
                </NavDropdown>
              )}
              {userInfo ? (
                <NavDropdown title={userInfo.name} id='username'>
                  <NavDropdown.Item>
                    <Nav.Link as={Link} to='/student/profile'>
                      <h6><i class="fa fa-user" aria-hidden="true"></i> Profile</h6>
                    </Nav.Link>
                  </NavDropdown.Item>
                  <NavDropdown.Item>
                    <Nav.Link as={Link} to='/student/applications'>
                      <h6><i className='fa fa-newspaper'></i> My Applications</h6>
                    </Nav.Link>
                  </NavDropdown.Item>
                  <NavDropdown.Item>
                    <Nav.Link as={Link} to='/student/profile/update'>
                      <h6><i class="fa fa-cog" aria-hidden="true"></i> Update Profile</h6>
                    </Nav.Link>
                  </NavDropdown.Item>
                  <NavDropdown.Item onClick={logoutHandler}>
                    <Nav.Link>
                      <h6><i class="fa fa-sign-out" aria-hidden="true"></i> Log Out</h6>
                    </Nav.Link>
                  </NavDropdown.Item>
                </NavDropdown>
              ) : recruiterInfo ? (
                <NavDropdown title={recruiterInfo.name} id='username'>
                  <NavDropdown.Item>
                    <Nav.Link as={Link} to='/recruiter/profile'>
                      <h6><i class="fa fa-user" aria-hidden="true"></i> Profile</h6>
                    </Nav.Link>
                  </NavDropdown.Item>
                  <NavDropdown.Item>
                    <Nav.Link as={Link} to='/recruiter/profile/update'>
                      <h6><i class="fa fa-cog" aria-hidden="true"></i> Update Profile</h6>
                    </Nav.Link>
                  </NavDropdown.Item>
                  <NavDropdown.Item onClick={recruiterLogoutHandler}>
                    <Nav.Link>
                      <h6><i class="fa fa-sign-out" aria-hidden="true"></i> Log Out</h6>
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
