import React, {Component} from 'react';
import {useState, setState} from 'react';
import {useHistory} from 'react-router-dom';
import axios from 'axios'

const useForm = () => {
    const history = useHistory();

    const [values, setValues] = useState ({
        firstname: '',
        lastname: '',
        email: '',
        password: '',
        password2: ''
    });

    const [errors, setErrors] = useState ({
        firstname: '',
        lastname: '',
        email: '',
        password: '',
        password2: ''
    });

    const handleClose = () => setShow(false);

    const [show, setShow] = useState(false);

    const handleChange = e => {
        e.preventDefault();

        setValues({
            ...values,
            [e.target.name]: e.target.value
        });       
    }

    const handleSubmit = e => {
        e.preventDefault();
        
        var i = true;
        i = validateInfo(values);

        if(!i) {
            setErrors({
                ...errors,
                [e.target.name]: e.target.value
            });
        } else{
            axios.post('http://localhost:4000/signup', values)
            .then((res) => {
                console.log(res);
                localStorage.setItem('username', res.data.user.firstname)
                localStorage.setItem('email', res.data.user.email)
                localStorage.setItem('password', res.data.user.password)
                history.push("/Home", values);
            })
            .catch((error) => {
                alert("User already exists!");
                console.log(error);
            })
        }
    
    };

    function validateInfo(values) {
    var f = true;

    if(!values.firstname.trim()) {
        errors.firstname = "Username required!"
        f = false;
    } else if(!/^[B+0-9]*$/i.test(values.firstname)) {
        errors.firstname = "Username is invalid!"
        f = false;
    } else {
        errors.firstname = "";
    }
    
    if(!values.email.trim()) {
        errors.email = "Email required!"
        f = false;
    } else if(!/\S+@dal.ca/i.test(values.email)) {
        errors.email = "Email address is invalid!"
        f = false;
    } else {
        errors.email = "";
    }
    
    if(!values.password) {
        errors.password = "Password required!"
        f = false;
    } else if(!/^[A-Za-z0-9_@./#&+-]*$/i.test(values.password)) {
        errors.password = "Password is invalid!"
        f = false;
    } else {
        errors.password = "";
    }

     
    if(values.password.length<8) {
        errors.password = "Weak Password! Should be atleast 8 characters!"
        f = false;
    } else {
        errors.password = "";
    }
    
    if(!values.password2) {
        errors.password2 = "Password required!"
        f = false;
    } else {
        errors.password2 = "";
    }
    
    if(values.password2 !== values.password) {
        errors.password2 = "Passwords do not match!"
        f = false;
    } else {
        errors.password2 = "";
    }

    if(errors.firstname=="" && errors.lastname=="" && errors.email=="" && errors.password=="" && errors.password2=="") {
        f=true;
    }

    return f;
}

    return {handleChange, values, handleSubmit, errors}
};

export default useForm
