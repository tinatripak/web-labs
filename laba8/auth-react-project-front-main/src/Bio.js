import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import axios from "axios";
import Cookies from "universal-cookie";
import Header from './components/Header/Header'
import Content from "./components/Content/Content"
import Image from "./components/Image/Image"
import './profile.css'
const cookies = new Cookies();

const token = cookies.get("TOKEN");

export default function Bio() {
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
     <div>
        <Header />
        <Content />
        <Image />
      </div>
      <Button 
        type="submit"
        variant="danger"
        className="d-flex mx-auto my-3"
        onClick={() => logout()}
      >
        Logout
      </Button>
    </div>
  );
}
