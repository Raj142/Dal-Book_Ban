import React, { Component } from "react";
import Header1 from "../Header1/Header";
import { Card, Button,Row } from "react-bootstrap";
import bookimg from '../../images/book.jpeg';
import "./Home.css";
import alertify from 'alertifyjs';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  goToBooks = () => {
    window.location.href = "/Books";
  };

   detailbtn() {
    alertify.notify('Not Implement Yet', 'error', 5, function(){  console.log('dismissed')});
  };

  htmlContent = () => {
    return (
      <div>
        <Header1 />
        <div class="jumbotron">
          <h1>Welcome to Book Store !</h1>
          <p>
            <span>A room without books is like a body without a soul.</span>
          </p>

          <p>Explore what we have !</p>
          <button
            className="btn btn-default custom-btn-color"
            onClick={this.goToBooks}
          >
            Go to Books
          </button>
        </div>

        <h2>Top New Arrivals</h2>
        <div class="top-book-div">
            
            <Row>
            <Card style={{ width: "18rem" }}  className="top-books">
            <Card.Img variant="top" src={bookimg} />
            <Card.Body>
              <Card.Title>The Midnight Library</Card.Title>
              <Card.Text>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolores illum natus nam eos recusandae dicta.
              </Card.Text>
              <button className="btn btn-default custom-btn-color" onClick={this.detailbtn} >Details</button>
            </Card.Body>
          </Card>

          <Card style={{ width: "18rem" }}  className="top-books">
            <Card.Img variant="top" src={bookimg}  />
            <Card.Body>
              <Card.Title>The Vanishing Half</Card.Title>
              <Card.Text>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolores illum natus nam eos recusandae dicta.
              </Card.Text>
              <button className="btn btn-default custom-btn-color" onClick={this.detailbtn} >Details</button>
            </Card.Body>
          </Card>

          <Card style={{ width: "18rem" }}  className="top-books">
            <Card.Img variant="top" src={bookimg}  />
            <Card.Body>
              <Card.Title>The Invisible Life of Addie</Card.Title>
              <Card.Text>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolores illum natus nam eos recusandae dicta.
              </Card.Text>
              <button className="btn btn-default custom-btn-color" onClick={this.detailbtn} >Details</button>
            </Card.Body>
          </Card>

          <Card style={{ width: "18rem" }}  className="top-books">
            <Card.Img variant="top" src={bookimg}  />
            <Card.Body>
              <Card.Title>American Dirt</Card.Title>
              <Card.Text>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolores illum natus nam eos recusandae dicta.
              </Card.Text>
              <button className="btn btn-default custom-btn-color" onClick={this.detailbtn} >Details</button>
            </Card.Body>
          </Card>
            </Row>
          

          
        </div>
      </div>
    );
  };
  render() {
    return this.htmlContent();
  }
}
export default Home;
