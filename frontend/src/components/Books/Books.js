import React, { Component } from 'react';
import { FormText } from 'react-bootstrap';
import './Books.css';
import Header1 from '../Header1/Header';
import bookimg from '../../images/book.jpeg';
import axios from 'axios';
// import BooksData from './BooksData.json';
class Books extends Component {
  
   
    constructor(props) {
        super(props);
        this.backendUrl = "http://localhost:4000" 
        this.state = {first : 0, second: 0, BooksData: []}
    };

    componentWillMount = () => {
        fetch(this.backendUrl+"/books/"+(localStorage.getItem("searchBook") ? localStorage.getItem("searchBook") : "-empty-"))
        .then((res)=>res.json())
        .then((data)=>{
            let first = Math.ceil(data.books.length/3)
            let second = Math.ceil((data.books.length - first)/2)
            console.log(data.books)
            this.setState({first: first , second: second, BooksData : data.books})
        })
    }

    addBook = async (event) => {
        let id = event.target.id

        await fetch(this.backendUrl+"/users/"+localStorage.getItem("email"))
        .then((res)=>res.json())
        .then(async (data)=>{
            let user = data.user[0]
            let cart = user.cart

            let found = false;
            for(let i=0;i<cart.length;i++)
            {
                if(cart[i].bookId == id){
                    cart[i].quantity += 1
                    found = true;
                    break;
                }
            }

            if(!found){
                cart.push({
                    "bookId": id,
                    "quantity": 1
                })
            }
            user.cart = cart;
            await axios.post(this.backendUrl+"/users/addToCart", user)
            .then((data1)=>{
                console.log("Book added successfully")
                window.location.reload()
            })
        })
    }

    
    htmlContent = () => {

      
        return (  <div>
             <Header1/>  
               
            <div className="row col-md-12 set-row-style">
                <div className="col-md-4">
                    {
                        this.state.BooksData.slice(0,this.state.first).map((book)=>{
                        return <div class="card set-card-style custom-classs" >
                                <img class="card-img-top set-img-style" src={bookimg} alt="Card image cap"/>
                                <div class="card-body">
                                    <table className="table table-borderless">
                                        <tbody>
                                            <tr>
                                                <td className="c1">Title</td>
                                                <td>:</td>
                                                <td className="c2">{book.Title}</td>
                                            </tr>
                                            <tr>
                                                <td className="c1">Description</td>
                                                <td>:</td>
                                                <td className="c2">{book.Description}</td>
                                            </tr>
                                            <tr>
                                                <td className="c1">Genre</td>
                                                <td>:</td>
                                                <td className="c2">{book.Genre}</td>
                                            </tr>
                                            <tr>
                                                <td className="c1">Price</td>
                                                <td>:</td>
                                                <td className="c2">{book.Price}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <button className="btn btn-default custom-btn-color" id={book._id} onClick={this.addBook}>Add to cart</button>
                                </div>
                            </div>
                        })
                    }
                </div>
                <div className="col-md-4">
                    {
                        this.state.BooksData.slice(this.state.first, this.state.first + this.state.second).map((book)=>{
                        return <div class="card set-card-style custom-classs">
                                <img class="card-img-top set-img-style" src={bookimg} alt="Card image cap"/>
                                <div class="card-body">
                                    <table className="table table-borderless">
                                        <tbody>
                                            <tr>
                                                <td className="c1">Title</td>
                                                <td>:</td>
                                                <td className="c2">{book.Title}</td>
                                            </tr>
                                            <tr>
                                                <td className="c1">Description</td>
                                                <td>:</td>
                                                <td className="c2">{book.Description}</td>
                                            </tr>
                                            <tr>
                                                <td className="c1">Genre</td>
                                                <td>:</td>
                                                <td className="c2">{book.Genre}</td>
                                            </tr>
                                            <tr>
                                                <td className="c1">Price</td>
                                                <td>:</td>
                                                <td className="c2">{book.Price}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <button className="btn btn-default custom-btn-color" id={book._id} onClick={this.addBook}>Add to cart</button>
                                </div>
                            </div>
                        })
                    }
                </div>
                <div className="col-md-4">
                    {
                        this.state.BooksData.slice(this.state.first + this.state.second , this.state.BooksData.length).map((book)=>{
                        return <div class="card set-card-style custom-classs">
                               <img class="card-img-top set-img-style" src={bookimg} alt="Card image cap"/>
                                <div class="card-body">
                                    <table className="table table-borderless">
                                        <tbody>
                                            <tr>
                                                <td className="c1">Title</td>
                                                <td>:</td>
                                                <td className="c2">{book.Title}</td>
                                            </tr>
                                            <tr>
                                                <td className="c1">Description</td>
                                                <td>:</td>
                                                <td className="c2">{book.Description}</td>
                                            </tr>
                                            <tr>
                                                <td className="c1">Genre</td>
                                                <td>:</td>
                                                <td className="c2">{book.Genre}</td>
                                            </tr>
                                            <tr>
                                                <td className="c1">Price</td>
                                                <td>:</td>
                                                <td className="c2">{book.Price}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <button className="btn btn-default custom-btn-color" id={book._id} onClick={this.addBook}>Add to cart</button>
                                </div>
                            </div>
                        })
                    }
                </div>
            </div>
            </div> 
        ) 
    }

    render() {
        return (this.htmlContent());
    }
}
export default Books;