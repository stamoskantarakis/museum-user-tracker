import React, { useState } from 'react';

import {
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarNav,
  MDBNavItem,
  MDBNavLink,
  MDBNavbarToggler,
  MDBCollapse,
  MDBContainer,
} from 'mdbreact';

import logo from '../images/logo.png';

const Navbar = () => {
  const [collapsed, setCollapsed] = useState(false);

  const handleTogglerClick = () => {
    setCollapsed(!collapsed);
  };

  const activeNavBtn = () => {
    const url = window.location.href;

    if (url === 'http://localhost:8081/login') {
      return (
        <MDBNavbarNav right style={{ marginRight: '5.5rem' }}>
          <MDBNavItem>
            <MDBNavLink to="/signup">Sign Up</MDBNavLink>
          </MDBNavItem>
          <MDBNavItem active>
            <MDBNavLink to="/login">Log In</MDBNavLink>
          </MDBNavItem>
          <MDBNavItem>
            <MDBNavLink to="/info">Info</MDBNavLink>
          </MDBNavItem>
        </MDBNavbarNav>
      );
    } else if (url === 'http://localhost:8081/info') {
      return (
        <MDBNavbarNav right style={{ marginRight: '5.5rem' }}>
          <MDBNavItem>
            <MDBNavLink to="/signup">Sign Up</MDBNavLink>
          </MDBNavItem>
          <MDBNavItem>
            <MDBNavLink to="/login">Log In</MDBNavLink>
          </MDBNavItem>
          <MDBNavItem active>
            <MDBNavLink to="/info">Info</MDBNavLink>
          </MDBNavItem>
        </MDBNavbarNav>
      );
    } else if (url === 'http://localhost:8081/signup') {
      return (
        <MDBNavbarNav right style={{ marginRight: '5.5rem' }}>
          <MDBNavItem active>
            <MDBNavLink to="/signup">Sign Up</MDBNavLink>
          </MDBNavItem>
          <MDBNavItem>
            <MDBNavLink to="/login">Log In</MDBNavLink>
          </MDBNavItem>
          <MDBNavItem>
            <MDBNavLink to="/info">Info</MDBNavLink>
          </MDBNavItem>
        </MDBNavbarNav>
      );
    } else if (url === 'http://localhost:8081/workstation') {
      return (
        <MDBNavbarNav right>
          <MDBNavItem
            style={{ paddingRight: '2px', paddingTop: '9px', color: 'white' }}>
            Hey <i>User</i> !
          </MDBNavItem>
        </MDBNavbarNav>
      );
    } else {
      return (
        <MDBNavbarNav right style={{ marginRight: '5.5rem' }}>
          <MDBNavItem>
            <MDBNavLink to="/signup">Sign Up</MDBNavLink>
          </MDBNavItem>
          <MDBNavItem>
            <MDBNavLink to="/login">Log In</MDBNavLink>
          </MDBNavItem>
          <MDBNavItem>
            <MDBNavLink to="/info">Info</MDBNavLink>
          </MDBNavItem>
        </MDBNavbarNav>
      );
    }
  };

  const overlay = (
    <div
      id="sidenav-overlay"
      style={{ backgroundColor: 'transparent' }}
      onClick={handleTogglerClick}
    />
  );

  return (
    <div>
      <MDBNavbar
        color="black"
        dark
        expand="md"
        fixed="top"
        scrolling
        transparent>
        <MDBContainer>
          <MDBNavbarBrand>
            <a href="http://localhost:8081/">
              <img
                src={logo}
                style={{ height: '2.5rem' }}
                className="img-fluid"
                alt="Logo"
              />
            </a>
          </MDBNavbarBrand>
          <MDBNavbarToggler onClick={handleTogglerClick} />
          <MDBCollapse isOpen={collapsed} navbar>
            {activeNavBtn()}
          </MDBCollapse>
        </MDBContainer>
      </MDBNavbar>
      {collapsed && overlay}
    </div>
  );
};

export default Navbar;
