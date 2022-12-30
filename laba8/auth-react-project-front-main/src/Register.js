import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import validator from 'validator';
import "./login.css"
import './sign.css'

export default function Register() {
  const [name, setName] = useState("");
  const [group, setGroup] = useState("");
  const [variant, setVariant] = useState("");
  const [phone, setPhone] = useState("");
  const [photo, setPhoto] = useState("");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [register, setRegister] = useState(false);
  let message = '';
  let isError = {
    nameUser: '',
    groupUser: '',
    variantUser: '',
    phoneUser: '',
    photoUser: '',
    emailUser: '',
    passwordUser: ''
  }
  document.body.classList.remove('white-color');
  
  const blurHandler = (e) => {
    const fullNameRegex = /^[а-щА-ЩЬьЮюЯяЇїІіЄєҐґ]+\s[а-щА-ЩЬьЮюЯяЇїІіЄєҐґ]\.[а-щА-ЩЬьЮюЯяЇїІіЄєҐґ]\./;
    if (validator.isEmpty(name)) {
      isError.nameUser = " "
    } else if (!validator.isLength(name, { min: 6 }) && !validator.isEmpty(name)) {
      isError.nameUser = "At least 6 characaters required"
    } else if(!fullNameRegex.test(name) && name.length>0){
      isError.nameUser = 'Name should be written like Santa K.O.'
    }

    const groupRegex = /^[а-щА-ЩЬьЮюЯяЇїІіЄєҐґ]{2}-\d{2}/;
    if (validator.isEmpty(group)) {
      isError.groupUser = " "
    } else if (!validator.isLength(group, { min: 5, max:7 }) && !validator.isEmpty(group)) {
      isError.groupUser = "At least 5 characaters required and less 7 characters"
    } else if (!groupRegex.test(group) && group.length>0) {
      isError.groupUser = 'Group should be written like IT-94';
    } 

    if (validator.isEmpty(variant)) {
      isError.variantUser = " "
    } else if ((variant < 1 || variant > 11) && !validator.isEmpty(variant)) {
      isError.variantUser = 'Variant is more 0 and less than 11';
    }

    const phoneRegex = /^\((\d{3})\)-\d{3}-\d{2}-\d{2}/;
    if (validator.isEmpty(phone)) {
      isError.phoneUser = " "
    } else if (!phoneRegex.test(phone) && phone.length>0) {
      isError.phoneUser = 'Phone should be Ukrainian like (099)-771-62-95';
    }

    const ext = photo.split('.').pop().toLowerCase()
    if (validator.isEmpty(photo)) {
      isError.photoUser = " "
    } else if (ext!=="jpg" && ext!=="jpeg" && ext!=="png" && !validator.isEmpty(photo)) {
      isError.photoUser = 'Phone should have extension jpg, jpeg or png';
    }

    if (validator.isEmpty(email)) {
      isError.emailUser = " "
    } else if (!validator.isEmail(email) && email.length>0) {
      isError.emailUser = 'Email should be written like "pretty@gmail.com"';
    }

    if (validator.isEmpty(password)) {
      isError.passwordUser = " "
    } else if (!validator.isLength(password, { min: 6 }) && password.length>0) {
      isError.passwordUser = 'Password should be minimum 6 characters';
    }
  }

  const handleSubmit = (e) => {
    const configuration = {
      method: "post",
      url: "http://127.0.0.1:5000/register",
      data: {
        name: name,
        group: group,
        variant: variant,
        phone: phone,
        photo: photo,
        email: email,
        password: password,
      },
    };

    axios(configuration)
      .then((result) => {
        setRegister(true);
        window.location.href = "/";
      })
      .catch((error) => {
        message = error.response.data.message;
        toast.error(message, {
          position: toast.POSITION.TOP_RIGHT
        });
      });
    
      e.preventDefault();
  };

  return (
    <div>
      <Form onSubmit={(e) => handleSubmit(e)}>
      <Form.Group controlId="formBasicName">
          <Form.Label className="required">Name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onBlur={blurHandler()}
            placeholder="Enter name"
            className={isError.nameUser.length > 0 ? "is-invalid form-control border-danger" : "is-valid form-control "}
          />
          {isError.nameUser.length > 0 && (
            <span className="invalid-feedback">{isError.nameUser}</span>
          )} 
        </Form.Group>
        <Form.Group controlId="formBasicGroup">
          <Form.Label className="required">Group</Form.Label>
          <Form.Control
            type="text"
            name="group"
            value={group}
            onChange={(e) => setGroup(e.target.value)}
            onBlur={blurHandler()}
            placeholder="Enter group"
            className={isError.groupUser.length > 0 ? "is-invalid form-control border-danger" : "is-valid form-control "}
          />
          {isError.groupUser.length > 0 && (
            <span className="invalid-feedback">{isError.groupUser}</span>
          )} 
        </Form.Group>
        <Form.Group controlId="formBasicVariant">
          <Form.Label className="required">Variant</Form.Label>
          <Form.Control
            type="number"
            name="variant"
            value={variant}
            onChange={(e) => setVariant(e.target.value)}
            onBlur={blurHandler()}
            placeholder="Enter variant"
            className={isError.variantUser.length > 0 ? "is-invalid form-control border-danger" : "is-valid form-control "}
          />
          {isError.variantUser.length > 0 && (
            <span className="invalid-feedback">{isError.variantUser}</span>
          )} 
        </Form.Group>
        <Form.Group controlId="formBasicPhone">
          <Form.Label className="required">Phone</Form.Label>
          <Form.Control
            type="tel"
            name="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            onBlur={blurHandler()}
            placeholder="Enter phone"
            className={isError.phoneUser.length > 0 ? "is-invalid form-control border-danger" : "is-valid form-control "}
          />
          {isError.phoneUser.length > 0 && (
            <span className="invalid-feedback">{isError.phoneUser}</span>
          )} 
        </Form.Group>
        <Form.Group controlId="formBasicPhoto">
          <Form.Label className="required">Photo</Form.Label>
          <Form.Control
            type="text"
            name="photo"
            value={photo}
            onChange={(e) => setPhoto(e.target.value)}
            onBlur={blurHandler()}
            placeholder="Paste URL photo"
            className={isError.photoUser.length > 0 ? "is-invalid form-control border-danger" : "is-valid form-control"}
          />
          {isError.photoUser.length > 0 && (
            <span className="invalid-feedback">{isError.photoUser}</span>
          )} 
        </Form.Group>
        <Form.Group controlId="formBasicEmail">
          <Form.Label className="required">Email address</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onBlur={blurHandler()}
            placeholder="Enter email"
            className={isError.emailUser.length > 0 ? "is-invalid form-control border-danger" : "is-valid form-control "}
          />
          {isError.emailUser.length > 0 && (
            <span className="invalid-feedback">{isError.emailUser}</span>
          )} 
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label className="required">Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onBlur={blurHandler()}
            placeholder="Password"
            className={isError.passwordUser.length > 0 ? "is-invalid form-control border-danger" : "is-valid form-control "}
          />
          {isError.passwordUser.length > 0 && (
            <span className="invalid-feedback">{isError.passwordUser}</span>
          )} 
        </Form.Group>

        <Button
          variant="outline-secondary"
          type="submit"
          className="mb-4 border border-1 grey-button"
          onClick={(e) => handleSubmit(e)}
        >
          Sign up
        </Button>
        <ToastContainer closeButton={false}/>
      </Form>
    </div>
  );
}