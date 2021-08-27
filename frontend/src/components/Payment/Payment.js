import React, { useState } from "react";
import Header1 from "../Header1/Header";
import { Form, Button, Col } from "react-bootstrap";
import { useHistory } from 'react-router-dom';

const Payment = () => {

    const history = useHistory();

    const [paymentMethod, setPaymentMethod] = useState('Cash');

    const submitHandler = (e) => {
        localStorage.setItem('paymentMethod', paymentMethod)
        history.push('/PlaceOrders');
    };

  return (
    <div>
      <Header1 />
      <h1>Payment</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group>
          <Form.Label as='legend'>Select Method</Form.Label>
        </Form.Group>
        <Col>
            <Form.Check type='radio' label='PayPal or Card' id='PayPal'
            name='paymentMethod' value='PayPal'
            checked onChanged={(e) => setPaymentMethod(e.target.value)}></Form.Check>
        </Col>
        <Button type="submit" variant="primary">
          Continue
        </Button>
      </Form>
    </div>
  );
};

export default Payment;
