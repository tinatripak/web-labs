import React, { useEffect, useState } from "react";
import { Form, Button, NavDropdown, Nav, InputGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import validator from 'validator';
import FontAwesome from 'react-fontawesome'
import Cookies from "universal-cookie";
import './profile.css'
import './auth.css'
const cookies = new Cookies();
const token = cookies.get("TOKEN");

const Profile = () => {
    const [name, setName] = useState("");
    const [group, setGroup] = useState("");
    const [variant, setVariant] = useState("");
    const [phone, setPhone] = useState("");
    const [photo, setPhoto] = useState("");
    const [role, setRole] = useState("");
    const [allUsers, setAllUsers] = useState("");
    let userList = {};
    let isLoading = true;
    const [userInfo, setUserInfo] = useState();
    const [email, setEmail] = useState("");
    const [update, setUpdate] = useState(false);
    const [delete_, setDelete] = useState(false);
    let message = '';

    // let role ='';
    let isError = {
        nameUser: '',
        groupUser: '',
        variantUser: '',
        phoneUser: '',
        emailUser: ''
    }
    let isValidated = {
        nameUser: false,
        groupUser: false,
        variantUser: false,
        phoneUser: false,
        emailUser: false
    }
    document.body.classList.remove('white-color');
    
    const blurHandler = (e) => {
        const fullNameRegex = /^[a-zA-Z]+\s[a-zA-Z]\.[a-zA-Z]\./;
        if (validator.isEmpty(name)) {
          isError.nameUser = " "
          isValidated.nameUser = true
        } else if (!validator.isLength(name, { min: 6 }) && !validator.isEmpty(name)) {
          isError.nameUser = "At least 6 characaters required"
          isValidated.nameUser = false
        } else if(!fullNameRegex.test(name) && name.length>0){
          isError.nameUser = 'Name should be written like Santa K.O.'
          isValidated.nameUser = false
        } else{
            isValidated.nameUser = true
        }
    
        const groupRegex = /^[a-zA-Z]{2}-\d{2}/;
        if (validator.isEmpty(group)) {
          isError.groupUser = " "
          isValidated.groupUser = true
        } else if (!validator.isLength(group, { min: 5, max:7 }) && !validator.isEmpty(group)) {
          isError.groupUser = "At least 5 characaters required and less 7 characters"
          isValidated.groupUser = false
        } else if (!groupRegex.test(group) && group.length>0) {
          isError.groupUser = 'Group should be written like IT-94';
          isValidated.groupUser = false
        } else{
            isValidated.groupUser = true
        }
    
        if (validator.isEmpty(variant)) {
          isError.variantUser = " "
          isValidated.variantUser = true
        } else if ((variant < 1 || variant > 11) && !validator.isEmpty(variant)) {
          isError.variantUser = 'Variant is more 0 and less than 11';
          isValidated.variantUser = false
        } else{
            isValidated.variantUser = true
        }
    
        const phoneRegex = /^\((\d{3})\)-\d{3}-\d{2}-\d{2}/;
        if (validator.isEmpty(phone)) {
          isError.phoneUser = " "
          isValidated.phoneUser = true
        } else if (!phoneRegex.test(phone) && phone.length>0) {
          isError.phoneUser = 'Phone should be Ukrainian like (099)-771-62-95';
          isValidated.phoneUser = false
        } else{
            isValidated.phoneUser = true
        }
    
        if (validator.isEmpty(email)) {
          isError.emailUser = " "
          isValidated.emailUser = true
        } else if (!validator.isEmail(email) && email.length>0) {
          isError.emailUser = 'Email should be written like "pretty@gmail.com"';
          isValidated.emailUser = false
        } else{
            isValidated.emailUser = true
        }
      }
    
      const getAllUsers = () => {
        const configurationGetUsers = {
            method: "get",
            url: "http://127.0.0.1:5000/getUsersList",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        

        axios(configurationGetUsers)
            .then((result) => {
                userList = result.data.usersList
            })
            .catch((error) => {
                error = new Error();
            });
    }
    useEffect(() => {
        const configuration = {
            method: "get",
            url: "http://127.0.0.1:5000/auth-endpoint",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        

        axios(configuration)
            .then((result) => {
                const user = result.data.userData
                setRole(user.role)
                console.log(user.role=='admin')
                console.log(userList)
                if(user.role=='admin'){
                    setAllUsers(`Our users are ${Object.values(userList).join(', ')}`)
                }
                setName(user.name);
                setGroup(user.group);
                setVariant(user.variant);
                setPhone(user.phone);
                setEmail(user.email);
                setPhoto(user.photo)
                setUserInfo(user);

                isLoading = false;
            })
            .catch((error) => {
                error = new Error();
            });
        }, []);
    
    const logout = () => {
        cookies.remove("TOKEN", { path: "/" });
        window.location.href = "/";
    }

    
    const deleteAccount = () => {

        const configurationDelete = {
            method: "post",
            url: "http://127.0.0.1:5000/delete",
            headers: {
                Authorization: `Bearer ${token}`,
            },
          };
        
        axios(configurationDelete)
        .then((result) => {
            cookies.set("TOKEN", result.data.token, {
            path: "/",
            });
            setDelete(true);
        })
        .catch((error) => {
            error = new Error();
        });
        cookies.remove("TOKEN", { path: "/" });
        window.location.href = "/";
    }

    if (userInfo === undefined) {
        return <>Still loading...</>;
    }

    const submitHandler = (e) => {
        const configurationUpdate = {
            method: "post",
            url: "http://127.0.0.1:5000/change",
            data: {
                name: name,
                group: group,
                variant: variant,
                phone: phone,
                email: email,
            },
            headers: {
                Authorization: `Bearer ${token}`,
            },
          };
        
        if(isValidated.nameUser === false ||
            isValidated.groupUser === false ||
            isValidated.variantUser === false ||  
            isValidated.phoneUser === false ||
            isValidated.emailUser === false){
            message = 'User cant be changed'
            toast.error(message, {
                position: toast.POSITION.TOP_RIGHT
            });
        } else{
            axios(configurationUpdate)
            .then((result) => {
                cookies.set("TOKEN", result.data.token, {
                path: "/",
                });
                setUpdate(true);
                message = 'User changed'
                toast.success(message, {
                position: toast.POSITION.TOP_RIGHT
                });
            })
            .catch((error) => {
                message = 'Cant change user'
                toast.error(message, {
                position: toast.POSITION.TOP_RIGHT
                });
            });
        }
    }

    const resetName = () => {
        setName("");
    };
    const resetGroup = () => {
        setGroup("");
    };
    const resetVariant = () => {
        setVariant("");
    };
    const resetPhone = () => {
        setPhone("");
    };
    const resetEmail = () => {
        setEmail("");
    };
    const nameInP = `Your name: ${userInfo.name}`

    return (
        <div className='container main-block'>
            <div className="white-color py-5 px-5 mb-5">
                <Nav>
                    <NavDropdown title={name}>
                        <Nav.Link>
                            <Link to='/bio'>My bio</Link>
                        </Nav.Link>
                        <NavDropdown.Divider/>
                        <Nav.Link>
                            <Link to='/products'>Products</Link>
                        </Nav.Link>
                    </NavDropdown>
                </Nav>
                <p className="text-center">Your role is {role}</p>
                <p 
                className="text-center"
                onBlur={getAllUsers()}>
                    {allUsers}
                </p>
                <div className='row mb-5 ml-5 mx-0'>
                    <img className="col-5 w-100 mt-5 round-photo" src={photo} alt="icon on people" />
                    <div className='right-block col-7 pb-4'>
                        <Form onSubmit={submitHandler}>
                        <Form.Group controlId="formBasicName">
                            <Form.Label>Name</Form.Label>
                            <InputGroup className="mb-3">
                                <Form.Control
                                    type="text"
                                    name="name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    onBlur={blurHandler()}
                                    placeholder="Enter name"
                                    className={isError.nameUser.length > 0 ? "form-control border-danger" : "border-success form-control "}
                                />
                                {isError.nameUser.length > 0 && (
                                    <span className="invalid-feedback">{isError.nameUser}</span>
                                )} 

                                <Button className="close-button-red" onClick={resetName}><span><FontAwesome name="xmark" /></span></Button>
                            </InputGroup>
                        </Form.Group>
                        <Form.Group controlId="formBasicGroup">
                            <Form.Label>Group</Form.Label>
                            <InputGroup className="mb-3">
                                <Form.Control
                                    type="text"
                                    name="group"
                                    value={group}
                                    onChange={(e) => setGroup(e.target.value)}
                                    onBlur={blurHandler()}
                                    placeholder="Enter group"
                                    className={isError.groupUser.length > 0 ? "form-control border-danger" : "border-success form-control "}
                                />
                                {isError.groupUser.length > 0 && (
                                    <span className="invalid-feedback">{isError.groupUser}</span>
                                )} 
                                <Button className="close-button-red" onClick={resetGroup}><span><FontAwesome name="xmark" /></span></Button>
                            </InputGroup>
                        </Form.Group>
                        <Form.Group controlId="formBasicVariant">
                            <Form.Label>Variant</Form.Label>
                            <InputGroup className="mb-3">
                                <Form.Control
                                    type="number"
                                    name="variant"
                                    value={variant}
                                    onChange={(e) => setVariant(e.target.value)}
                                    onBlur={blurHandler()}
                                    placeholder="Enter variant"
                                    className={isError.variantUser.length > 0 ? "form-control border-danger" : "border-success form-control "}
                                />
                                {isError.variantUser.length > 0 && (
                                    <span className="invalid-feedback">{isError.variantUser}</span>
                                )} 
                                <Button className="close-button-red" onClick={resetVariant}><span><FontAwesome name="xmark" /></span></Button>
                            </InputGroup>
                        </Form.Group>
                        <Form.Group controlId="formBasicPhone">
                            <Form.Label>Phone</Form.Label>
                            <InputGroup className="mb-3">
                                <Form.Control
                                    type="tel"
                                    name="phone"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    onBlur={blurHandler()}
                                    placeholder="Enter phone"
                                    className={isError.phoneUser.length > 0 ? "form-control border-danger" : "border-success form-control "}
                                />
                                {isError.phoneUser.length > 0 && (
                                    <span className="invalid-feedback">{isError.phoneUser}</span>
                                )} 
                                <Button className="close-button-red" onClick={resetPhone}><span><FontAwesome name="xmark" /></span></Button>
                            </InputGroup>
                        </Form.Group>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <InputGroup className="mb-3">
                                <Form.Control
                                    type="email"
                                    name="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    onBlur={blurHandler()}
                                    placeholder="Enter email"
                                    className={isError.emailUser.length > 0 ? "form-control border-danger" : "border-success form-control "}
                                />
                                {isError.emailUser.length > 0 && (
                                    <span className="invalid-feedback">{isError.emailUser}</span>
                                )} 
                                <Button className="close-button-red" onClick={resetEmail}><span><FontAwesome name="xmark" /></span></Button>
                            </InputGroup>
                        </Form.Group>
                        <Button
                            type="submit"
                            className="mb-0 rounded btn-success d-flex mx-auto text-center px-auto"
                        >
                            Save
                        </Button>
                        </Form>

                    </div>
                </div>
                <div className="d-flex mx-auto justify-content-center"> 
                    <Button 
                        type="submit"
                        variant="warning"
                        className="d-flex mx-1 my-1"
                        onClick={() => deleteAccount()}
                    >
                        Delete account
                    </Button>

                    <Button 
                        type="submit"
                        variant="danger"
                        className="d-flex mx-1 my-1"
                        onClick={() => logout()}
                    >
                        Logout
                    </Button>
                    <ToastContainer closeButton={false}/>
                </div>
            </div>
        </div>
    );
}


export default Profile