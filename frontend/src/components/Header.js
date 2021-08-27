import React, { Component } from 'react';
import {DropdownButton,Dropdown} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import './Header.css';
class Header extends Component {


    constructor(props) {

        super(props);
        this.state = {
            cartItems: 0
        }
    };

    cartClicked = () => {
        window.location.href = "/Cart"
    }
    showMessage = () => {
        alert("Sorry! Database hasn't been added ");
    }


    htmlContent = () => {
        return (
            <div>
                <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
                    <a class="navbar-brand" href="/Home">The Dal Book Barn</a>
                </nav>
            </div>
        )
    }

    render() {
        return (this.htmlContent());
    }
}
export default Header;