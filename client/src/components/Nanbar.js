import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import './Navbar.css'
import { NavLink } from 'react-router-dom';

const Nanbar = () => {
      return (
            <div className="container">
                 <nav class="navbar navbar-light bg-secondary">
  <a className="navbar-brand" href="#">
    <img src="https://www.pngfind.com/pngs/m/274-2749542_my-student-record-circle-hd-png-download.png" width="30" height="30" className="d-inline-block align-top" alt="logo"/>
    <NavLink to="/" className="record">Student Record</NavLink>
  </a>
</nav>
            </div>
      )
}

export default Nanbar
