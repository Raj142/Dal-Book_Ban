import React, { useState, useEffect } from 'react'
import { Button, Row, Col, ListGroup, Image, Card} from 'react-bootstrap';
import Header1 from "../Header1/Header";
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import alertify from 'alertifyjs';

const PlaceOrders = () => {

    const history = useHistory();

    const [data, setData] = useState([]);
    const [flag, setFlag] = useState(true);
    // var data;
    useEffect(() => {
        if (flag) {
            setData(JSON.parse(localStorage.getItem('mycart')));
            setFlag(false);
        }
        // console.log(data);
    });

    const clearCart = async () => {
        localStorage.removeItem('address');
        localStorage.removeItem('city');
        localStorage.removeItem('country');
        localStorage.removeItem('totalBill');
        localStorage.removeItem('mycart');

        await fetch("http://localhost:4000/users/"+localStorage.getItem("email"))
        .then((res)=>res.json())
        .then(async (data)=>{
            let user = data.user[0]
            user.cart = [];
            await axios.post("http://localhost:4000/users/addToCart", user)
            .then((data1)=>{
                console.log("Book removed successfully")
                history.push('/Home');
            })
        })
    };

    const placeOrder = () => {
        const userEmail = localStorage.getItem('email');
        let orderItems = [];
        
        data.map(d => {
            const obj = {
                name: d.title,
                desc: d.description,
                qty: d.quantity,
                price: d.price,
                book: d.bookId
            };
            orderItems.push(obj);
        });

        const objToBeSend = {
            email: userEmail,
            orderItems,
            address: localStorage.getItem('address'),
            city: localStorage.getItem('city'),
            country: localStorage.getItem('country'),
            paymentMethod: 'Cash',
            totalPrice: localStorage.getItem('totalBill'),
            isPaid: false
        };

        const headers = { 
            'Content-Type': 'application/json'
          };

        axios.post('http://localhost:4000/order/add', objToBeSend, headers)
          .then(res => {
              const data = res.data;
            
            clearCart()
          })
          .catch(err => alertify.error('Something went wrong! Please try again'));
        // console.log(objToBeSend);
    };

    return (
        <>
        <Header1/>
            <h1>Place Orders</h1>
            <Row>
                <Col md={8}>
                <ListGroup 
                    variant='flush'
                    style={{width:"90%",height:"100%", marginLeft:"30px" , boxShadow:"3px 3px 12px 3px"}}>
                        <ListGroup.Item>
                            <h2>Shipping</h2>
                            <p>
                                <strong>Address: </strong>
                                {localStorage.getItem('address')}, {localStorage.getItem('city')}, {localStorage.getItem('country')}
                            </p>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <h2>Payment Method</h2>
                            <strong>Method: </strong>
                            Cash
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <h2>OrderItem</h2>
                            <Row >
                                                    <Col md={3}>
                                                      <h5>Title</h5> 
                                                    </Col>
                                                    <Col md={3}>
                                                       <h5>Description</h5> 
                                                    </Col>
                                                    <Col md={3}>
                                                    <h5> Quantity</h5> 
                                                    </Col>
                                                    <Col md={3}>
                                                    <h5>Price</h5>
                                                    </Col>
                                                </Row>
                            {data.length === 0 ? <p>Cart is empty</p>
                            : (
                                <ListGroup variant='flush'>
                                    {
                                        data.map((item, index) => {
                                            return <ListGroup.Item key={index}>
                                                <Row>
                                                    <Col md={3}>
                                                        {item.title}
                                                    </Col>
                                                    <Col md={3}>
                                                        {item.description}
                                                    </Col>
                                                    <Col md={3}>
                                                        {item.quantity}
                                                    </Col>
                                                    <Col md={3}>
                                                        {item.price}
                                                    </Col>
                                                </Row>
                                            </ListGroup.Item>
                                        })
                                    }
                                </ListGroup>
                            )}
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
                <Col md={4} style={{marginTop:"100px", marginLeft:"-20px"}}>
                    <Card style={{boxShadow:"3px 3px 12px 3px"}} >
                        <ListGroup variant='flush' 
                        >
                            <ListGroup.Item>
                                <h2>Summary of order</h2>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Total Bill:</Col>
                                    <Col>${localStorage.getItem('totalBill')}</Col>
                                </Row>
                                <Row>
                                    <Col>Address:</Col>
                                    <Col>{localStorage.getItem('address')}</Col>
                                </Row>
                                <Row>
                                    <Col>City:</Col>
                                    <Col>{localStorage.getItem('city')}</Col>
                                </Row>
                                <Row>
                                    <Col>Country:</Col>
                                    <Col>{localStorage.getItem('country')}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Button type='button' className='btn-block' onClick={placeOrder}>Place Order</Button>
                                <Button type='button' className='btn-block' onClick={clearCart}>Clear Cart</Button>
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </>
    )
}

export default PlaceOrders
