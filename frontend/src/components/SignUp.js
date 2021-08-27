import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import './SignUp.css';
import Header from './Header';
import 'bootstrap/dist/css/bootstrap.min.css'
import useForm from './useForm';
import { useHistory } from 'react-router-dom';
import { Button, Container } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';


function SignUp() {

    const { handleChange, values, handleSubmit, errors } = useForm();
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

    const handleClose = () => setShow(false);

    const [show, setShow] = useState(false);

    const handlePass = e => {
        e.preventDefault();

        var j = true;
        j = validatePassInfo(passvalues);

        if (!j) {
            passsetErrors({
                ...passerrors,
                [e.target.name]: e.target.value
            });
        } else {
            handleClose();
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
            history.push("/Books", logInvalues);
        } else {
            logInsetErrors({
                ...logInerrors,
                [e.target.name]: e.target.value
            });
        }

    }

    function validatePassInfo(passvalues) {
        var g = true;

        if (!passvalues.email.trim()) {
            passerrors.email = "Email required!"
            g = false;
        } else if (!/\S+@dal.ca/i.test(passvalues.email)) {
            passerrors.email = "Email address is invalid!"
            g = false;
        } else {
            passerrors.email = "";
        }

        if (!passvalues.password) {
            passerrors.password = "Password required!"
            g = false;
        } else if (!/^[A-Za-z0-9_@./#&+-]*$/i.test(passvalues.password)) {
            passerrors.password = "Password is invalid!"
            g = false;
        } else {
            passerrors.password = "";
        }


        if (passvalues.password.length < 8) {
            passerrors.password = "Weak Password! Should be atleast 8 characters!"
            g = false;
        } else {
            passerrors.password = "";
        }

        if (!passvalues.password2) {
            passerrors.password2 = "Password required!"
            g = false;
        } else {
            passerrors.password2 = "";
        }

        if (passvalues.password2 !== passvalues.password) {
            passerrors.password2 = "Passwords do not match!"
            g = false;
        } else {
            passerrors.password2 = "";
        }

        if (passerrors.email == "" && passerrors.password == "" && passerrors.password2 == "") {
            g = true;
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

    return (
        <React.Fragment>
            <Header />
            <div className="center-container">
                <div className="form-content-center">
                    <form className="form" onSubmit={handleSubmit}>
                        <h1>Sign Up!</h1>
                        <div className="form-input-container">
                            <div className="form-inputs">
                                <label htmlFor="username" className="form-label"> Username </label>
                                <input type="text" id="username" name="firstname" className="form-input" placeholder="Enter your Banner ID" value={values.firstname} onChange={handleChange} name="firstname" />
                            </div>
                            <div className={"form-input-errors" + (errors.firstname ? "" : " form-hidden-errors")}>
                                <p>{errors.firstname}</p>
                            </div>
                            <div className="form-inputs">
                                <label htmlFor="email" className="form-label"> Email </label>
                                <input type="text" id="email" name="email" className="form-input" placeholder="Enter your Dal email address" value={values.email} onChange={handleChange} email="email" />
                            </div>
                            <div className={"form-input-errors" + (errors.email ? "" : " form-hidden-errors")}>
                                <p>{errors.email}</p>
                            </div>
                            <div className="form-inputs">
                                <label htmlFor="password" className="form-label"> Password </label>
                                <input type="password" id="password" name="password" className="form-input" placeholder="Enter your password" value={values.password} onChange={handleChange} />
                            </div>
                            <div className={"form-input-errors" + (errors.password ? "" : " form-hidden-errors")}>
                                <p>{errors.password}</p>
                            </div>
                            <div className="form-inputs">
                                <label htmlFor="password2" className="form-label"> Confirm Password </label>
                                <input type="password" id="password2" name="password2" className="form-input" placeholder="Re-enter password" value={values.password2} onChange={handleChange} />
                            </div>
                            <div className={"form-input-errors" + (errors.password2 ? "" : " form-hidden-errors")}>
                                <p>{errors.password2}</p>
                            </div>
                            <div className="form-inputs form-Submit">
                                <button className="form-input-btn" type="submit" style={{ width: "50%", boxSizing: "content-box", borderRadius: "0.2rem", height: "30px", color: "white", fontsize: "12px", padding: "0.5rem", backgroundColor: "#343a40" }}>
                                    Register
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </React.Fragment>
    );

}

export default SignUp;

