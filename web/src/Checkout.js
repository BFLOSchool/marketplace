/* eslint-disable */
import React, { Component } from 'react';
import Nav from './Components/Nav';

class Checkout extends Component {
  constructor(props) {
    super(props)

    this.checkout = this.checkout.bind(this);
    this.goBack = this.goBack.bind(this);

    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handleNameOnCardChange = this.handleNameOnCardChange.bind(this);
    this.handleCardNumberChange = this.handleCardNumberChange.bind(this);
    this.handleCardExpiryMonthChange = this.handleCardExpiryMonthChange.bind(this);
    this.handleCardExpiryYearChange = this.handleCardExpiryYearChange.bind(this);
    this.handleCVVCodeChange = this.handleCVVCodeChange.bind(this);
    this.handleZipCodeChange = this.handleZipCodeChange.bind(this);
    this.setupCart = this.setupCart.bind(this);

    this.state = {
      cart: [],
      total: 0,
      item: {
        name: "Smoothie",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi ac blandit diam, in posuere felis. Praesent volutpat, augue id vulputate fringilla, turpis metus ullamcorper elit, non bibendum turpis odio in nulla. Phasellus sed aliquam mauris. Donec nulla leo, congue sit amet aliquet non, aliquam nec eros. Nulla eget mi sed nisl hendrerit dapibus vitae aliquet neque. Etiam egestas turpis sit amet ornare auctor. Suspendisse ac tristique purus.\n\nProin imperdiet pulvinar sem, id porttitor enim tincidunt sed. Nulla id nisl eros. Nulla et elementum arcu. Etiam et elementum arcu. Mauris finibus egestas pulvinar. Pellentesque sagittis ultrices dui sed pellentesque. Mauris et varius libero, vel rutrum dui.",
        ingredients: ["Strawberries", "Blueberries", "Ice Cubes"],
        image: "https://cdn.bfloschool.com/projects/marketplace/images/smoothie.jpg",
        price: 5.00
      },
      email: "",
      nameOnCard: "",
      cardNumber: "",
      cardExpiryMonth: "",
      cardExpiryYear: "",
      cardCVV: "",
      cardZipCode: ""
    }
  }
  componentDidMount() {
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
  handleNameOnCardChange(event) {
    this.setState({
      nameOnCard: event.target.value
    })
  }
  handleCardNumberChange(event) {
    this.setState({
      cardNumber: event.target.value
    })
  }
  handleCardExpiryMonthChange(event) {
    this.setState({
      cardExpiryMonth: event.target.value
    })
  }
  handleCardExpiryYearChange(event) {
    this.setState({
      cardExpiryYear: event.target.value
    })
  }
  handleCVVCodeChange(event) {
    this.setState({
      cardCVV: event.target.value
    })
  }
  handleZipCodeChange(event) {
    this.setState({
      cardZipCode: event.target.value
    })
  }
  handleEmailChange(event) {
    this.setState({
      email: event.target.value
    })
  }
  goBack() {
    this.props.history.goBack();
  }
  checkout(event) {
    event.preventDefault();
    if (this.state.nameOnCard !== "" && this.state.cardNumber.length === 16 && this.state.cardExpiryYear.length === 2 && this.state.cardExpiryMonth.length === 2 && this.state.cardCVV !== "" && this.state.cardCVV.length < 5 && this.state.cardZipCode.length === 5) {
      var data = {
        card: {
          name: this.state.nameOnCard,
          number: this.state.cardNumber,
          expiryMonth: this.state.cardExpiryMonth,
          expiryYear: this.state.cardExpiryYear,
          cvv: this.state.cardCVV,
          zip: this.state.cardZipCode
        },
        email: this.state.emailAddress
      }
      axios.post('https://dev-curriculum.bfloschool.com/api/marketplace/checkout', data).then(response =>{

    }).catch(error =>{
      alert('Whoops, something went wrong. Please try again!')
    });

    } else {
      // validation errors, form not properly filled out
      alert("Error. Please completely fill out this form.");
    }
  }
  render() {
    return (
      <div style={{backgroundColor: '#FAFAFA', height: 1000}}>
        <Nav />
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12">
              <img src={this.state.item.image} className="image-cover" alt="cover image" />
            </div>
          </div>
        </div>
        <br /><br />
        <div className="container">
          <div className="row">
            <div className="col-8" style={{backgroundColor: 'white', padding: 20}}>
              <h4><b>Complete your Purchase</b></h4>
              <p className="gray">Use the form below to complete your purchase. Thank you for shopping with us!</p>
              <form onSubmit={this.checkout}>
                <div className="row">
                <div className="col-12">
                  <input type="email" placeholder="Email Address" value={this.state.emailAddress} onChange={this.handleEmailChange} />
                </div>
                  <div className="col-12">
                    <input type="text" placeholder="Name on Card" value={this.state.nameOnCard} onChange={this.handleNameOnCardChange} />
                  </div>
                  <div className="col-12">
                    <input type="text" placeholder="Card Number" type="number" value={this.state.cardNumber} onChange={this.handleCardNumberChange} maxLength="16" />
                  </div>
                  <div className="col-6">
                    <select value={this.state.cardExpiryMonth} onChange={this.handleCardExpiryMonthChange}>
                      <option value="01">January</option>
                      <option value="02">February </option>
                      <option value="03">March</option>
                      <option value="04">April</option>
                      <option value="05">May</option>
                      <option value="06">June</option>
                      <option value="07">July</option>
                      <option value="08">August</option>
                      <option value="09">September</option>
                      <option value="10">October</option>
                      <option value="11">November</option>
                      <option value="12">December</option>
                    </select>
                  </div>
                  <div className="col-6">
                    <select value={this.state.cardExpiryYear} onChange={this.handleCardExpiryYearChange}>
                      <option value="19"> 2019</option>
                      <option value="20"> 2020</option>
                      <option value="21"> 2021</option>
                      <option value="22"> 2022</option>
                      <option value="23"> 2023</option>
                      <option value="24"> 2024</option>
                      <option value="25"> 2025</option>
                    </select>
                  </div>
                  <br /><br />
                  <div className="col-6" value={this.state.cardCVV} onChange={this.handleCVVCodeChange}>
                    <input type="text" placeholder="CVV Code" />
                  </div>
                  <div className="col-6" value={this.state.cardZipCode} onChange={this.handleZipCodeChange}>
                    <input type="text" placeholder="Zip Code" />
                  </div>
                  <br /><br />
                  <div className="col-6">
                    <button type="button" className="back" onClick={this.goBack}><b>Back</b></button>
                  </div>
                  <div className="col-6">
                    <input type="submit" className="add" onClick={this.checkout} />
                  </div>
                </div>
              </form>
            </div>
            <div className="col-4" style={{borderRadius: 5}}>
               <div style={{backgroundColor: 'white', padding: 20}}>
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
        </div>
      </div>
    );
  }
}

export default Checkout;
