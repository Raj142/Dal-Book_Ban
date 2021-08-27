import React, { Component } from 'react';
import {Button} from 'react-bootstrap';
import Header1 from '../Header1/Header';
import book from '../../images/book.jpeg';
import './MyPastOrders.css';
import axios from 'axios';
import {AgGridColumn, AgGridReact} from 'ag-grid-react';
import { Modal, ModalHeader, ModalBody} from 'reactstrap';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';

class MyPastOrders extends Component {
  
    constructor(props) {

        super(props); 
        this.backendUrl = "http://localhost:4000"
        this.state = {orders: [], loading: true,
            defaultColDef: {
                resizable: true,
                filter: true,
                sortable: true
            },
            flag: false,
            selectedId: "",
            selectedData: []
        }
    };

    componentWillMount = async () => {
        await this.setState({loading: true})
        await fetch(this.backendUrl+"/past_orders")
        .then((res)=>res.json())
        .then(async (data)=>{
            let orders = data.orders
            let res = []
            for(let i=0;i<orders.length;i++)
            {
                if(orders[i].email==localStorage.getItem("email"))
                {
                    res.push(orders[i])
                }
            }
            await this.setState({orders : res, loading: false})
        })
    }
    onFirstDataRendered = (params) => {
        params.api.sizeColumnsToFit();
    }

    orderItem = (event) => {
        return "<span>"+event.value.length+"</span>"
    }

    paid = (event) => {
        return "<span>"+(event.value ? "Paid" : "Not paid")+"</span>"
    }

    toggle = () => {
        this.setState({flag : !this.state.flag})
    }

    clickedRow = async (event) => {
        await this.setState({selectedData: event.data.orderItems, selectedId: event.data._id})
        await this.toggle()
    }

    price = (event) => {
        return "<span>$"+event.value+"</span>"
    }

    htmlContent = () => {
        return (  
                <div>
                    <Header1/>
               
                    <div className="row col-md-12 set-row-style" style={{textAlign: "center"}}>
                        {
                            this.state.loading ?
                            ""
                            :
                            <React.Fragment>
                                <div className="ag-theme-material set-table-order">
                                    <AgGridReact
                                        rowData={this.state.orders}
                                        defaultColDef={this.state.defaultColDef}
                                        onFirstDataRendered={this.onFirstDataRendered}

                                        >
                                        <AgGridColumn field="_id" cellClass="o-1" onCellClicked={this.clickedRow}></AgGridColumn>
                                        <AgGridColumn field="paymentMethod" cellClass="o-2"></AgGridColumn>
                                        <AgGridColumn field="address" cellClass="o-3"></AgGridColumn>
                                        <AgGridColumn field="city" cellClass="o-4"></AgGridColumn>
                                        <AgGridColumn field="country" cellClass="o-5"></AgGridColumn>
                                        <AgGridColumn field="isPaid" cellClass="o-6" cellRenderer={this.paid}></AgGridColumn>
                                        <AgGridColumn field="orderItems" cellClass="o-7" onCellClicked={this.clickedRow} cellRenderer={this.orderItem}></AgGridColumn>
                                        <AgGridColumn field="totalPrice" cellClass="o-8" onCellClicked={this.clickedRow} cellRenderer={this.price}></AgGridColumn>
                                    </AgGridReact>
                                </div>
                            </React.Fragment>
                        }
                    </div>

                    <Modal isOpen={this.state.flag} toggle={this.toggle} className="set-modal-order">
                        <ModalHeader toggle={this.toggle}>Order detail of #{this.state.selectedId}</ModalHeader>
                        <ModalBody>
                            {
                                this.state.selectedData.length == 0
                                ?
                                ""
                                :
                                <React.Fragment>
                                    <table className="table table-borderless set-table-order-1">
                                        <tbody className="set-body-table-order">
                                            {
                                                this.state.selectedData.map((data)=>{
                                                    return <tr>
                                                        <td className="set-to-1"><img className="set-img-order" src={book}/></td>
                                                        <td className="set-to-2">{data.name}</td>
                                                        <td className="set-to-3">{data.desc}</td>
                                                        <td className="set-to-4">#{data.qty}</td>
                                                        <td className="set-to-5">${data.price}</td>
                                                    </tr>
                                                })
                                            }
                                        </tbody>
                                    </table>
                                </React.Fragment>
                            }
                        </ModalBody>
                    </Modal>

                </div>
           
        ) 
    }

    render() {
        return (this.htmlContent());
    }
}
export default MyPastOrders;