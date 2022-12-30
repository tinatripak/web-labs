import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import Cookies from "universal-cookie";
import "./login.css"
const cookies = new Cookies();

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [login, setLogin] = useState(false);
  let message = '';

  document.body.classList.remove('white-color');

  const handleSubmit = (e) => {
    e.preventDefault();

    const configuration = {
      method: "post",
      url: "http://127.0.0.1:5000/login",
      data: {
        email,
        password,
      },
    };

    axios(configuration)
      .then((result) => {
        cookies.set("TOKEN", result.data.token, {
          path: "/",
        });
        window.location.href = "/profile";
        setLogin(true);
      })
      .catch((error) => {
        message = error.response.data.message;
        toast.error(message, {
          position: toast.POSITION.TOP_RIGHT
        });
      });
  };

  return (
    <div>
      <p className='text-center'>Welcome to lovebirds</p>
      <Form onSubmit={(e) => handleSubmit(e)}>
      <div className="container">
        <Form.Group controlId="formBasicEmail">
          <Form.Label className="required">Email address</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter email"
            required
          />
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label className="required">Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
          />
        </Form.Group>
        <a className='no-account d-block' href='/signup'>Don't have an account?</a>
        <Button
          variant="outline-secondary"
          type="submit"
          className="grey-button"
          onClick={(e) => handleSubmit(e)}
        >
          Sign in
        </Button>
        <ToastContainer closeButton={false}/>
        </div>
      </Form>
      
    </div>
  );
}