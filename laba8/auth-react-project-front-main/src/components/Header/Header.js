import React from "react"
import "./header.css"
import {NavDropdown, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";


function Header() {
    return (
        <div className="name">
            <h2 className="h-75">Kristina Tripak Yuriivna</h2>
            {/* <a className="menu-href h-75" href="/products">Products</a> */}
            
            <Nav>
                <NavDropdown>
                    <Nav.Link>
                        <Link to='/products'>Products</Link>
                    </Nav.Link>
                    <NavDropdown.Divider/>
                    <Nav.Link>
                        <Link to='/profile'>My profile</Link>
                    </Nav.Link>
                </NavDropdown>
            </Nav>
        </div>
    )
}

export default Header
