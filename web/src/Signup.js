/* eslint-disable */
import React, { Component } from 'react';
import Nav from './Components/Nav';
import axios from 'axios'

class Signup extends Component {
  constructor(props) {
    super(props)

    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      phoneNumber: ''
    }

    this.handleFirstNameChange = this.handleFirstNameChange.bind(this)
    this.handleLastNameChange = this.handleLastNameChange.bind(this)
    this.handlePhoneNumberChange = this.handlePhoneNumberChange.bind(this)
    this.handleEmailChange = this.handleEmailChange.bind(this)
    this.handlePasswordChange = this.handlePasswordChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)

  }
  handleFirstNameChange(event) {
    this.setState({
      firstName: event.target.value
    })
  }
  handleLastNameChange(event) {
    this.setState({
      lastName: event.target.value
    })
  }
  handleEmailChange(event) {
    this.setState({
      email: event.target.value
    })
  }
  handlePasswordChange(event) {
    this.setState({
      password: event.target.value
    })
  }
  handlePhoneNumberChange(event) {
    this.setState({
      phoneNumber: event.target.value
    })
  }
  handleSubmit(event) {
    event.preventDefault();
    if (this.state.email != "" && this.state.password != "") {
      var data = {
        email: this.state.email,
        password: this.state.password,
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        phoneNumber: this.state.phoneNumber
      }
      axios.post('http://localhost:5000/signup', data).then(response =>{
        alert("You have signed up successfully")
        localStorage.setItem("token", response.data.token)
      }).catch(error =>{
        alert('Whoops, something went wrong. Please try again!')
      });
    } else {
      alert("something went wrong")
    }
  }
  render() {
    return (
      <div style={{backgroundColor: '#FAFAFA', height: 1000}}>
        <Nav />
        <div className="container">
          <div className="row">
            <div className="col-12" style={{backgroundColor: 'white', padding: 20}}>
              <h4><b>Create your your account</b></h4>
              <hr />
              <form onSubmit={this.handleSubmit}>
                <div className="form-group">
                  <label>First Name</label>
                  <input onChange={this.handleFirstNameChange} type="text" className="form-control" placeholder="Enter your first name" />
                </div>
                <div className="form-group">
                  <label>Last Name</label>
                  <input onChange={this.handleLastNameChange} type="text" className="form-control" placeholder="Enter your last name" />
                </div>
                <div className="form-group">
                  <label>Email Address</label>
                  <input onChange={this.handleEmailChange} type="email" className="form-control" placeholder="Enter your email address" />
                  <small className="form-text text-muted">We'll never share your email with anyone else.</small>
                </div>
                <div className="form-group">
                  <label>Password</label>
                  <input onChange={this.handlePasswordChange} type="password" className="form-control" placeholder="Enter your password" />
                </div>
                <div className="form-group">
                  <label>Phone Number</label>
                  <input onChange={this.handlePhoneNumberChange} type="number" className="form-control" placeholder="Enter your phone number" />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Signup;
