import React, { useState } from "react";
import { Row, Col, ListGroup, Form, Button, Alert } from "react-bootstrap";
import './ProfileUpdate.css';
import ChangePassword from '../ChangePassword/ChangePassword';
import Header1 from '../Header1/Header';
import axios from 'axios';
import alertify from 'alertifyjs';

const ProfileUpdate = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [phone, setPhone] = useState("");
  const [isActive, setIsActive] = useState(true);

  const [nameError, setNameError] = useState({});
  const [emailError, setEmailError] = useState({});
  const [genderError, setGenderError] = useState({});
  const [phoneError, setphoneError] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name);

    switch (name) {
      case "Name":
        setName(value);
        break;
      case "Email":
        setEmail(value);
        break;
      case "Gender":
        setGender(value);
        break;
      case "Phone":
        setPhone(value);
        break;
      default:
        break;
    }
  };

  const validation = () => {
    const nameError = {};
    const emailError = {};
    const genderError = {};
    const phoneError = {};

    let result = true;

    if (name.trim().length < 1) {
      // result = false;
      // nameError.nameIsRequired = "Name is required.";
    }

    // check for alpha numeric chars
    if (/[^0-9a-zA-Z]/.test(name)) {
      result = false;
      nameError.nameIsInvalid =
        "Name should contains only alpha-numeric characters only)";
    }

    if (email.trim().length < 1) {
      // result = false;
      // emailError.emailIsRequired = "Email is required.";
    } else {
      //EMAIL VALIDATION
      if (!email.includes("@")) {
        result = false;
        emailError.emailInvalid = "Email is invalid";
      }
    }

    if (gender === "") {
      result = false;
      genderError.genderIsRequired = "Please select the gender";
    }

    if (phone.trim().length < 1) {
      result = false;
      phoneError.phoneIsRequired = "Phone is required.";
    } else {
      if (/[^0-9]/.test(phone) || phone.trim().length < 10) {
        result = false;
        phoneError.phoneIsInvalid = "Phone Number is invalid and should be of 10 characters";
      }
    }

    if (phone.trim().length > 10) {
      result = false;
      phoneError.phoneIsRequired = "Phone No should not more than 10 characters";
    }

    setNameError(nameError);
    setEmailError(emailError);
    setGenderError(genderError);
    setphoneError(phoneError);
    return result;
  };

  const submitForm = (e) => {
    e.preventDefault();
    const isFormValid = validation();
    if(isFormValid) {
      const userEmail = localStorage.getItem('email');
      const profileObj = {
        username: name,
        email,
        gender,
        phone
      };

      const headers = { 
        'Content-Type': 'application/json'
      };

      axios.post('http://localhost:4000/changeProfile/' +userEmail, profileObj, {headers})
        .then(res => {
          const data = res.data;

          if(data.message == "Profile Updated") {
            if(email.length > 0) {
              localStorage.setItem('email', email);
            }
            console.log('===========')
            console.log(data);
            alertify.success(data.message);
          }

        })
        .catch(err => alertify.error('Something went wrong! Please try again or email already exist'));;
      clearForm();
      // alert("You Profile has been updated!!")
  }
  };

  const clearForm = () => {
    setName("");
    setEmail("");
    setGender("");
    setPhone("");

    setNameError({});
    setEmailError({});
    setGenderError({});
    setphoneError({});
  };

  const handleClick = () => {
    setIsActive(!isActive);
  };

  return (
    <div>
        <Header1/>  
      <Row className="mt-5 pd">
        <Col sm={12} md={3} lg={3}>
          <h3 className="mb-5">Manage Profile</h3>
          <ListGroup>
            <ListGroup.Item action className={isActive ? '' : 'active'} href="#link1" onClick={handleClick}>
              Change Password
            </ListGroup.Item>
            <ListGroup.Item action className={isActive ? 'active' : ''} href="#link2" onClick={handleClick}>
              Profile Update
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col sm={12} md={9} lg={9}>
          { isActive ? <div>
            <h5 className="mt-5 mb-5 custom_heading">
            You want to <strong>change</strong> your details? Its super easy
            just update the information below and we will change it for you
            now!!
          </h5>

          <form onSubmit={submitForm}>
            <Form.Group controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="Name"
                value={name}
                placeholder="Enter your name (optional)"
                onChange={handleChange}
              />
              {Object.keys(nameError).map((key) => {
                return (
                  <Alert variant="danger" key={key}>
                    {nameError[key]}
                  </Alert>
                );
              })}
            </Form.Group>
            <Form.Group controlId="email">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="example@dal.ca (optional)"
                onChange={handleChange}
                name="Email"
                value={email}
              />
              {Object.keys(emailError).map((key) => {
                return (
                  <Alert variant="danger" key={key}>
                    {emailError[key]}
                  </Alert>
                );
              })}
            </Form.Group>
            <Form.Group controlId="gender">
              <Form.Label>Gender</Form.Label>
              <Form.Control as="select" name="Gender" value={gender} onChange={handleChange}>
                <option value="">Select gender</option>
                <option value="female">Female</option>
                <option value="male">Male</option>
              </Form.Control>
              {Object.keys(genderError).map((key) => {
                return (
                  <Alert variant="danger" key={key}>
                    {genderError[key]}
                  </Alert>
                );
              })}
            </Form.Group>
            <Form.Group controlId="number">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your number"
                name="Phone"
                value={phone}
                onChange={handleChange}
              />
              {Object.keys(phoneError).map((key) => {
                return (
                  <Alert variant="danger" key={key}>
                    {phoneError[key]}
                  </Alert>
                );
              })}
            </Form.Group>
            <Button className="color" type="submit">
              Update
            </Button>
            <Button className="color" variant="secondary" onClick={clearForm}>
              Clear
            </Button>
          </form>
          </div> : <ChangePassword />}
          
        </Col>
      </Row>
    </div>
  );
};

export default ProfileUpdate;
