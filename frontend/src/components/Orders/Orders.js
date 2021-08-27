// Author: Dhruvilkumar Savliya

import React, { useState, useEffect } from "react";
import Header1 from '../Header1/Header';
import "./Order.css";
import axios from 'axios';

const Order = () => {
    const [order, setOrder] = useState();
    const [orderList, setOrderList] = useState([]);
    const [flag, setFlag] = useState(true);

    useEffect(() => {

        axios.get('https://group14-thedalbookbarn-bkend.herokuapp.com/order')
            .then((res) => {

                console.log(res.data.orders);
                setOrderList(res.data.orders);

            })
            .catch(err => { console.log(err); });

        setFlag(false);


    });



    const handleStatus = (e, order) => {
        console.log(order);
        order.status = e.target.value;
        console.log(order)

        axios.put("https://group14-thedalbookbarn-bkend.herokuapp.com/orderes/" + order.ref, order)

    }
    return (
        <>
            <Header1 />
            <div className="col-md-10  my-3 custom-order">
                <h2 style={{ marginBottom: "20px" }}>List of Orders</h2>
                <div claasName='table-responsive-sm custom-shadow'>
                    <table className="table table-hover" border='1'>
                        <thead>
                            <tr>
                                <th scope="col">Index</th>
                                <th scope="col">Order ID</th>
                                <th scope="col">Date</th>
                                <th scope="col">Status</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                orderList.map((order, index) => {
                                    return <tr>
                                        <td>{index + 1}</td>
                                        <td>{order.ref}</td>
                                        <td>{order.date}</td>
                                        <td>{order.status}</td>


                                        <select onChange={(e) => handleStatus(e, order)}  >
                                            <option value="Select">Select</option>
                                            <option value="Delivered">Delivered</option>
                                            <option value="canceled">Cancled</option>
                                            <option value="Returned">Returned</option>
                                            <option value="Processing">Processing</option>
                                        </select>

                                    </tr>
                                })
                            }

                        </tbody>
                    </table>

                </div>
            </div>
        </>
    );
}

export default Order;