import React, { useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import Header from './components/Header';
import Books from './components/Books/Books';
import Cart from './components/Cart/Cart';
import Checkout from './components/Checkout/Checkout';
import Home from './components/Home/Home';
import LogIn from './components/LogIn';
import SignUp from './components/SignUp';
import Admin from './components/Admin/Admin';
import ProfileUpdate from './components/UpdateProfile/ProfileUpdate';
import Order from './components/Orders/Orders';
import Payment from './components/Payment/Payment';
import PlaceOrders from './components/PlaceOrders/PlaceOrders';
import MyPastOrders from './components/MyPastOrders/MyPastOrders';

function App() {

  return (
    <div className="App">
      <Router>
        <Route path="/" exact component={LogIn} />
        <Route path="/SignUp" component={SignUp} />
        <Route path="/admin" component={Admin}/>
        <Route path="/profile" component={ProfileUpdate}/>
        <Route path="/orders" component={Order} />
        <Route path="/Payment" component={Payment} />
        <Route path="/PlaceOrders" component={PlaceOrders} />
        <Route path= "/Books"><Books/></Route>
        <Route path= "/Cart"><Cart/></Route>
        <Route path= "/Checkout"><Checkout/></Route>
        <Route path="/Home"><Home/></Route>
        <Route path="/my_orders"><MyPastOrders/></Route>
      </Router>

    </div>
  );
}

export default App;