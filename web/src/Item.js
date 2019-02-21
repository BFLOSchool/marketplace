/* eslint-disable */
import React, { Component } from 'react';
import Nav from './Components/Nav';
import axios from 'axios'

import './App.css';

class Item extends Component {
  constructor(props) {
    super(props)

    this.addToCart = this.addToCart.bind(this);
    this.state = {
      cart: [],
      total: 0,
      item: {}
    }
  }
  componentDidMount() {
    this.getItemDetails();
    this.setupCart();
  }
  setupCart() {
    var cart = JSON.parse(localStorage.getItem("cart"));
    if (cart != undefined) {
      var total = 0;
      for (var i = 0; i < cart.length; i++) {
        total = total + cart[i].price;
      }
      this.setState({
        cart: cart,
        total: total
      })
    }
  }
  addToCart() {
    var newCart = this.state.cart.concat(this.state.item);
    var total = 0;
    for (var i = 0; i < newCart.length; i++) {
      total = total + newCart[i].price;
    }
    localStorage.setItem("cart", JSON.stringify(newCart));
    this.setState({
      cart: newCart,
      total: total
    })
  }
  getItemDetails() {
    axios.get('https://dev-curriculum.bfloschool.com/api/marketplace/'+this.props.match.params.itemId)
    .then(response => {
      this.setState({
        item: response.data.item
      })
    }).catch((error) => {
      console.log(error);
    });
  }
  render() {
    var checkoutBtn;
    if (this.state.cart.length > 0) {
      checkoutBtn = <button className="add"><b>Checkout</b></button>;
    }
    if (this.state.item) {
      return (
        <div style={{backgroundColor: '#FAFAFA'}}>
          <Nav />
           <div>
             <div className="container-fluid">
               <div className="row">
                 <div className="col-md-12">
                   <img src={this.state.item.image} className="image-cover" alt="cover image" />
                 </div>
               </div>
             </div>
             <div className="container">
               <br /><br />
               <div className="row">
                 <div className="col-8">
                   <h2>{this.state.item.name}</h2>
                   <p className="gray">
                     {this.state.item.description}
                    </p>
                    <b><span className="orange pointer" onClick={this.addToCart}><i className="fas fa-check"></i>Add to Cart</span></b>
                 </div>
                 <div className="col-4" style={{borderRadius: 5}}>
                    <div style={{backgroundColor: 'white', padding: 20}}>
                      <a href="/checkout">
                        {checkoutBtn}
                      </a>
                      <hr style={{marginBottom: 10, marginTop: 10}} />
                      <div className="row">
                        <div className="col-sm-9">
                          <b className="charcoal">Subtotal ({this.state.cart.length} items)</b>
                        </div>
                        <div className="col-sm-3">
                          <span>${this.state.total}</span>
                        </div>
                      </div>
                      <hr style={{marginBottom: 10, marginTop: 10}} />
                      <div className="row">
                        <div className="col-sm-9">
                          <b className="charcoal">Tax</b>
                        </div>
                        <div className="col-sm-3">
                          <span>${(this.state.total * 0.0875).toFixed(2)}</span>
                        </div>
                      </div>
                      <hr style={{marginBottom: 10, marginTop: 10}} />
                      <div className="row">
                        <div className="col-sm-9">
                          <b className="black">Grand Total</b>
                        </div>
                        <div className="col-sm-3">
                          <span>${(this.state.total + (this.state.total * 0.0875)).toFixed(2)}</span>
                        </div>
                      </div>
                    </div>
                 </div>
               </div>
                <br /><hr /><br />
                <h2>Other Foods</h2>
                <div className="row">
                  <div className="col-4 ">
                    <img src="https://cdn.bfloschool.com/projects/marketplace/images/hamburger.jpg" className="cover" /><br />
                    <span><b>Grilled Cheese</b> $20</span><br />
                    <small className="gray">This is a cheap grilled cheese</small><br />
                  </div>
                  <div className="col-4 ">
                    <img src="https://cdn.bfloschool.com/projects/marketplace/images/grilled-cheese.jpg" className="cover" /><br />
                    <span><b>Grilled Cheese</b> $20</span><br />
                    <small className="gray">This is a cheap grilled cheese</small><br />
                  </div>
                </div><br /><br />
             </div>
           </div>
        </div>
      );
    }
  }
}

export default Item;
