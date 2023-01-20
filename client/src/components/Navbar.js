import React, { useEffect, useState } from 'react'
import { Container, Nav, Navbar } from 'react-bootstrap'
import Cookies from 'universal-cookie'
import logo from '../assets/images/logo_color.min-01-01.png'

const NavbarCont = () => {
  const [isActive, setIsActive] = useState('')
  const cookies = new Cookies()
  useEffect(() => {
    const token = cookies.get('jwt-auth')
    setIsActive(token)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="navbar-container">
      <div className="navbar-section">
        <div className="navbar-row">
          <div className="navbar-body">
            <Navbar bg="transparent" expand="lg">
              <Container>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                  <Nav className="me-auto">
                    <Nav.Link href="/home" className="nav-option">
                      Home
                    </Nav.Link>
                    <Nav.Link href="/http-cats">Cats</Nav.Link>
                    <Nav.Link href="/dogs">Dogs</Nav.Link>
                    <Nav.Link href="/clients">Clients</Nav.Link>
                    {isActive && <Nav.Link href="/logout">Logout</Nav.Link>}
                  </Nav>
                </Navbar.Collapse>
              </Container>
            </Navbar>
          </div>
          <div className="navbar-img">
            <figure className="navbar-figure">
              <img src={logo} alt="" />
            </figure>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NavbarCont
