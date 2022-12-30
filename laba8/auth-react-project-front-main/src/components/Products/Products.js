import JsonProduct from "./JsonProduct"

import React, { useEffect, useState} from "react";
import { Button , NavDropdown, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import Cookies from "universal-cookie";
import "./products.css"
const cookies = new Cookies();

const token = cookies.get("TOKEN");


function Products() {
    const [message, setMessage] = useState("");
    useEffect(() => {
        document.body.classList.add('white-color');
        const configuration = {
        method: "get",
        url: "http://127.0.0.1:5000/auth-endpoint",
        headers: {
            Authorization: `Bearer ${token}`,
        },
        };

        axios(configuration)
        .then((result) => {
            setMessage(result.data.message);
        })
        .catch((error) => {
            error = new Error();
        });
    }, []);

    const logout = () => {
        cookies.remove("TOKEN", { path: "/" });
        window.location.href = "/";
    }
    return (
        <div>
            <div className="name">
                <h2 className="h-75">Products</h2>
                
            <Nav>
                <NavDropdown>
                    <Nav.Link>
                        <Link to='/bio'>My bio</Link>
                    </Nav.Link>
                    <NavDropdown.Divider/>
                    <Nav.Link>
                        <Link to='/profile'>My profile</Link>
                    </Nav.Link>
                </NavDropdown>
            </Nav>
            </div>
            <JsonProduct/>
            <Button 
                type="submit"
                variant="danger"
                className="d-flex mx-auto my-3"
                onClick={() => logout()}
            >
                Logout
            </Button>
        </div>
    )
}

export default Products
