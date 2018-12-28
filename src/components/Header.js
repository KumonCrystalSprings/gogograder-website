import React from "react"
import PropTypes from 'prop-types'

import { Navbar, NavbarBrand } from "reactstrap"
import { Link } from "react-router-dom";

function Header(props) {
  return (
    <Navbar color="light" light>
      <NavbarBrand tag={Link} to="/">GoGoGrader</NavbarBrand>
      {props.children}
    </Navbar>
  )
}

Header.propTypes = {
  children: PropTypes.any.isRequired
}

export default Header