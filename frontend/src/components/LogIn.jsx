import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import './SignUp.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import { useHistory } from 'react-router-dom';
import { Button, Container } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import SignUp from './SignUp';
import Home from './Home/Home';
import axios from 'axios'
function LogIn() {

    const history = useHistory();

    const [logInvalues, logInsetValues] = useState({
        email: '',
        password: ''
    });

    const [logInerrors, logInsetErrors] = useState({
        email: '',
        password: ''
    });

    const [passvalues, passsetValues] = useState({
        email: '',
        password: '',
        password2: ''
    });

    const [passerrors, passsetErrors] = useState({
        email: '',
        password: '',
        password2: ''
    });

    const handleClose = () => {
        setShow(false);
        passsetValues({
            email: '',
            password: '',
            password2: ''
        });

        passsetErrors({
            email: '',
            password: '',
            password2: ''
        });
    }

    const [show, setShow] = useState(false);

    const handlePass = e => {
        e.preventDefault();
        
        var j = true;
        j = validatePassInfo(passvalues);

        if(!j) {
            passsetErrors({
                ...passerrors,
                [e.target.name]: e.target.value
            });
        } else{
            axios.put('http://localhost:4000/forgotpassword', passvalues)
            .then((res) => {
                console.log(res);
                localStorage.setItem('username', res.data.user_check.username)
                localStorage.setItem('email', res.data.user_check.email)
                localStorage.setItem('password', res.data.user_check.password)
                alert("Password reset successfully!");
                handleClose();
            })
            .catch((error) => {
                alert("Error occured!");
                console.log(error);
            })
        }
    
    };

    const handlePassChange = e => {
        e.preventDefault()

        passsetValues({
            ...passvalues,
            [e.target.name]: e.target.value
        });
    }

    const handleLogInChange = e => {
        e.preventDefault()

        logInsetValues({
            ...logInvalues,
            [e.target.name]: e.target.value
        });
    }


    const handleLogin = e => {

        e.preventDefault();

        var i = true;
        i = validateLogInInfo(logInvalues);

        if (i) {
            axios.post('http://localhost:4000/login', logInvalues)
            .then((res) => {
                console.log(res);
                localStorage.setItem('username', res.data.records[0].username)
                localStorage.setItem('email', res.data.records[0].email)
                localStorage.setItem('token', res.data.token.token)
                history.push("/Home", logInvalues);
            })
            .catch((error) => {
                alert("Invalid credentials!");
                console.log(error);
            })
            
        } else {
            logInsetErrors({
                ...logInerrors,
                [e.target.name]: e.target.value
            });
        }

    }

    const handleSignUp = () => {
        history.push('/SignUp');
    }

    function validatePassInfo(passvalues) {
        var g = true;
            
        if(!passvalues.email.trim()) {
            passerrors.email = "Email required!"
            g = false;
        } else if(!/\S+@dal.ca/i.test(passvalues.email)) {
            passerrors.email = "Email address is invalid!"
            g = false;
        } else {
            passerrors.email = "";
        }
        
        if(!passvalues.password) {
            passerrors.password = "Password required!"
            g = false;
        } else if(!/^[A-Za-z0-9_@./#&+-]*$/i.test(passvalues.password)) {
            passerrors.password = "Password is invalid!"
            g = false;
        } else {
            passerrors.password = "";
        }
    
         
        if(passvalues.password.length<8) {
            passerrors.password = "Weak Password! Should be atleast 8 characters!"
            g = false;
        } else {
            passerrors.password = "";
        }
        
        if(!passvalues.password2) {
            passerrors.password2 = "Password required!"
            g = false;
        } else {
            passerrors.password2 = "";
        }
        
        if(passvalues.password2 !== passvalues.password) {
            passerrors.password2 = "Passwords do not match!"
            g = false;
        } else {
            passerrors.password2 = "";
        }
    
        if(passerrors.email=="" && passerrors.password=="" && passerrors.password2=="") {
            g=true;
        }
    
        return g;
    }    

    function validateLogInInfo(logInvalues) {
        var f = true;

        if (!logInvalues.email.trim()) {
            logInerrors.email = "Email required!"
            f = false;
        } else if (!/\S+@dal.ca/i.test(logInvalues.email)) {
            logInerrors.email = "Email address is invalid!"
            f = false;
        } else {
            logInerrors.email = "";
        }

        if (!logInvalues.password) {
            logInerrors.password = "Password required!"
            f = false;
        } else if (!/^[A-Za-z0-9_@./#&+-]*$/i.test(logInvalues.password)) {
            logInerrors.password = "Password is invalid!"
            f = false;
        } else {
            logInerrors.password = "";
        }

        if (logInerrors.email == "" && logInerrors.password == "") {
            f = true;
        }
        return f;
    }
    const loginhandle = () => {
        window.location.href = "/Cart"
    }

    return (<div className="center-container">
        <div className="loginQuote">
            <h1>The Dal Book Barn</h1>
            <h4>A room without books is like a body without a soul!</h4>
        </div>
        <div className="form-content-center login-form">
            <form className="form" onSubmit={handleLogin}>
                <h1>Log In!</h1>
                <div className="form-input-container">
                    <div className="form-inputs">
                        <label htmlFor="email" className="form-label"> Email </label>
                        <input type="text" id="email" name="email" className="form-input" placeholder="Enter your Dal email address" value={logInvalues.email} onChange={handleLogInChange} email="email" />
                    </div>
                    <div className={"form-input-errors" + (logInerrors.email ? "" : " form-hidden-errors")}>
                            <p>{logInerrors.email}</p>
                    </div>
                    <div className="form-inputs">
                        <label htmlFor="password" className="form-label"> Password </label>
                        <input type="password" id="password" name="password" className="form-input" placeholder="Enter your password" value={logInvalues.password} onChange={handleLogInChange} />
                    </div>
                    <div className={"form-input-errors" + (logInerrors.password ? "" : " form-hidden-errors")}>
                            <p>{logInerrors.password}</p>
                    </div>
                    <div className="form-inputs form-LogIn-Submit">
                        <button className="form-input-btn" type="submit" style={{ width: "50%", boxSizing: "content-box", borderRadius: "0.2rem", height: "30px", color: "white", fontsize: "12px", padding: "0.5rem", backgroundColor: "#343a40", marginBottom:"10px" }}>
                            Log In
                        </button>
                        
                        <button className="signUp" type="button" onClick={handleSignUp} style={{width: "50%", boxSizing: "content-box", borderRadius: "0.2rem", height: "30px", color: "white", fontsize: "12px", padding: "0.5rem", backgroundColor: "#343a40" }}>Sign Up</button>
                        <button className="forgotPass" type="button" onClick={() => {setShow(true)}}>Forgot Password?</button>
                    </div>
                </div>
            </form>
        </div>
        <Modal className="form-forgot-password " show={show} onHide={handleClose} size="md sm" aria-labelledby="contained-modal-title-vcenter" centered>
            <Modal.Title>Reset your password here!</Modal.Title>
            <Modal.Body>
                <form className="form" onSubmit={handlePass}>
                    <div className="form-input-container">
                        <div className="form-inputs">
                            <label htmlFor="email" className="form-label"> Email </label>
                            <input type="text" id="email" name="email" className="form-input" placeholder="Enter your Dal email address" value={passvalues.email} onChange={handlePassChange} email="email" />
                        </div>
                        <div className={"form-input-errors" + (passerrors.email ? "" : " form-hidden-errors")}>
                            <p>{passerrors.email}</p>
                        </div>
                        <div className="form-inputs">
                            <label htmlFor="password" className="form-label"> Password </label>
                            <input type="password" id="password" name="password" className="form-input" placeholder="Enter your password" value={passvalues.password} onChange={handlePassChange} />
                        </div>
                        <div className={"form-input-errors" + (passerrors.password ? "" : " form-hidden-errors")}>
                            <p>{passerrors.password}</p>
                        </div>
                        <div className="form-inputs">
                            <label htmlFor="password2" className="form-label"> Confirm Password </label>
                            <input type="password" id="password2" name="password2" className="form-input" placeholder="Re-enter password" value={passvalues.password2} onChange={handlePassChange} />
                        </div>
                        <div className={"form-input-errors" + (passerrors.password2 ? "" : " form-hidden-errors")}>
                            <p>{passerrors.password2}</p>
                        </div>
                        <div className="form-inputs form-Submit">
                            <button className="form-input-btn" type="submit" style={{boxSizing: "content-box", border:"none", borderRadius: "0.2rem", height: "30px", color: "white", fontsize: "12px", padding: "0.5rem", backgroundColor: "#17a2b86e" }}>
                                Reset Password
                            </button>
                        </div>
                    </div>
                </form>
            </Modal.Body>
        </Modal>
    </div>
    );

}

export default LogIn;

