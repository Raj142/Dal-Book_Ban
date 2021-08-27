import React, { useState, useEffect } from "react";
import { Row, Col, ListGroup, Form, Button, Alert } from "react-bootstrap";
import axios from 'axios';
import alertify from 'alertifyjs';

const ChangePassword = () => {
    const [isActive, setIsActive] = useState(true);
    const [password, setPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [passwordError, setPasswordError] = useState({});
    const [newPasswordError, setNewPasswordError] = useState({});
    const [confirmPasswordError, setConfirmPasswordError] = useState({});
  
    const handleChange = (e) => {
        const { name, value } = e.target;
        console.log(name);
    
        switch (name) {
          case "Curr_Password":
            setPassword(value);
            break;
          case "new_Password":
            setNewPassword(value);
            break;
          case "Confirm_Password":
            setConfirmPassword(value);
            break;
          default:
            break;
        }
      };

      const validation = () => {
        const passwordError = {};
        const newPasswordError = {};
        const confirmPasswordError = {};
    
        let result = true;
    
        if (password.trim().length < 1) {
          result = false;
          passwordError.passwordIsRequired = "Current Password is required.";
        }

        if (newPassword.trim().length < 1) {
            result = false;
            newPasswordError.newPasswordIsRequired = "New Password is required.";
          }

          if (confirmPassword.trim().length < 1) {
            result = false;
            confirmPasswordError.confirmPasswordIsRequired = "Confirm Password is required.";
          } else {
            if(newPassword !== confirmPassword){
                result = false;
                confirmPasswordError.wrongPassword = "Passwords donot match";
            }
          }

          // check both are match or not
        
    
        setPasswordError(passwordError);
        setNewPasswordError(newPasswordError);
        setConfirmPasswordError(confirmPasswordError);
        return result;
      };

    const submitForm = (e) => {
        e.preventDefault();
        const isFormValid = validation();
        if(isFormValid) {

          const userEmail = localStorage.getItem('email');
          const passwordObj = {
            currentPassword: password,
            newPassword,
            confirmPassword
          };

          // console.log(userEmail);
          // console.log(passwordObj);
          
          const headers = { 
            'Content-Type': 'application/json'
        };
          axios.post('http://localhost:4000/changePassword/' +userEmail, passwordObj, {headers})
            .then(res => {
              const data = res.data;
              // console.log(data);
              // alert(data.message);
              if(data.message == "Password updated") {
                alertify.success(data.message);
              } else {
                alertify.error(data.message);
              }
              
            })
            .catch(err => alertify.error(err.message));
            clearForm();
            // alert("You Password has been changed!!")
        }
    }
    const handleClick = () => {
        setIsActive(!isActive);
    };

    const clearForm = () => {
        setPassword("");
        setNewPassword("");
        setConfirmPassword("");
    
        setPasswordError({});
        setNewPasswordError({});
        setConfirmPasswordError({});
      };

  return (
    <div>
        <h5 className="mt-5 mb-5 custom_heading">
            You want to <strong>change</strong> your Password? Its always good to keep changing your password for more security
          </h5>
      <form onSubmit={submitForm}>
            <Form.Group controlId="name">
              <Form.Label>Current Password</Form.Label>
              <Form.Control
                type="password"
                name="Curr_Password"
                placeholder="Enter your current password"
                value={password}
                onChange={handleChange}
              />
              {Object.keys(passwordError).map((key) => {
                return (
                  <Alert variant="danger" key={key}>
                    {passwordError[key]}
                  </Alert>
                );
              })}
            </Form.Group>
            <Form.Group controlId="email">
            <Form.Label>New Password</Form.Label>
              <Form.Control
                type="password"
                name="new_Password"
                placeholder="Enter your new password"
                value={newPassword}
                onChange={handleChange}
              />
              {Object.keys(newPasswordError).map((key) => {
                return (
                  <Alert variant="danger" key={key}>
                    {newPasswordError[key]}
                  </Alert>
                );
              })}
            </Form.Group>
            <Form.Group controlId="email">
            <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                name="Confirm_Password"
                placeholder="Retype password"
                value={confirmPassword}
                onChange={handleChange}
              />
              {Object.keys(confirmPasswordError).map((key) => {
                return (
                  <Alert variant="danger" key={key}>
                    {confirmPasswordError[key]}
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
    </div>
  );
};

export default ChangePassword;
