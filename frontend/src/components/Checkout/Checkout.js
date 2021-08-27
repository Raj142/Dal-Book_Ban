import React, { Component, useState } from 'react';
import Header1 from '../Header1/Header';
import { Form, Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

const Checkout = () => {

    const history = useHistory();
    
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [country, setCountry] = useState('');
    const [errorcity , setErrorCity] = useState('');
    const [errorAddress , setErrorAddress] = useState('');
    const [errorCountry , setErrorCountry] = useState('');

    const goToBooks = () => {
        window.location.href = "/Books"
    }

    const submitHandler = (e) => {
        e.preventDefault();
        var letterNumber = /^[a-zA-z]+$/;
        var t = 0 ;
        if(!country.match(letterNumber))
        {
            setErrorCountry("Country name is not valid")
            t = 1;
        }
        else if (country == "")
        {
            t = 1;
            setErrorCountry("Please enter country name")
        }

        if (city == "")
        {
            t = 1;
            setErrorCity("Please enter city name")
        }

        if (address == "")
        {
            t = 1;
            setErrorAddress("Please enter Address")
        }

        if (t==0){
            localStorage.setItem('address', address)
            localStorage.setItem('city', city)
            localStorage.setItem('country', country)
            history.push("/PlaceOrders");
        }
    };

    return (
        <div className="">
                <Header1/>
                <div class="jumbotron">
                    <h1 class="display-4">Shipping Screen</h1>
                    <Form onSubmit={submitHandler}>
                        <Form.Group controlId='address'>
                            <Form.Label>Address</Form.Label>
                            <Form.Control type='text' placeholder='Enter Address'
                                value={address}
                                onChange={(e) =>{ setAddress(e.target.value) 
                                    setErrorAddress("") }} 
                                style={{width:"35%", alignContent:"center", marginLeft:"550px"}}
                                >
                            </Form.Control>
                            <span style={{color:"red", marginRight:"380px"}}>{errorAddress}</span>
                        </Form.Group>
                        <Form.Group controlId='city'>
                            <Form.Label>City</Form.Label>
                            <Form.Control type='text' placeholder='Enter City'
                                value={city}
                                onChange={(e) => {setCity(e.target.value)
                                    setErrorCity("")} } 
                                   style={{width:"35%", alignContent:"center", marginLeft:"550px"}}
                                   >   
                            </Form.Control>
                            <span style={{color:"red", marginRight:"380px"}}>{errorcity}</span>
                        </Form.Group>
                        <Form.Group controlId='country'>
                            <Form.Label>Country</Form.Label>
                            <Form.Control type='text' placeholder="Enter Country"
                                value={country}
                                onChange={(e) =>{ setCountry(e.target.value)
                                setErrorCountry("")
                                }}
                              style={{width:"35%", alignContent:"center", marginLeft:"550px"}}
                                 >
                            </Form.Control>
                            <span style={{color:"red", marginRight:"380px"}}>{errorCountry}</span>
                        </Form.Group>
                        <Button type='submit' variant='primary'>Continue</Button>
                    </Form>
                    <hr class="my-4"/>
                    <p>Explore what we have !</p>
                    <button className="btn btn-info" onClick={goToBooks}>Go to Books</button>
                </div>
            </div>
    )
}

export default Checkout