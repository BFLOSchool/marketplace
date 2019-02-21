/* eslint-disable */
import React, { Component } from 'react';
import Nav from './Components/Nav';
import axios from 'axios'

class Login extends Component {
  constructor(props) {
    super(props)

    this.handleEmailChange = this.handleEmailChange.bind(this)
    this.handlePasswordChange = this.handlePasswordChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)

    this.state = {
      email: '',
      password: ''
    }

    const token = localStorage.getItem('token');
    axios.get('http://localhost:5000/api/hello', { headers: { 'Authorization': token, 'Content-Type': 'application/x-www-form-urlencoded' } }).then(response => {
      console.log(response.data)
    }).catch((error) => {
      console.log(error)
    });


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
  handleSubmit(event) {
    event.preventDefault();

    if (this.state.email != "" && this.state.password != "") {
      var data = {
        email: this.state.email,
        password: this.state.password
      }
      axios.post('http://localhost:5000/login', data).then(response =>{
        alert("You have logged in successfully")
        localStorage.setItem("token", response.data.token)
      }).catch(error =>{
        alert('Whoops, something went wrong. Please try again!')
      });
    } else {
      alert("soething went wrong")
    }
  }
  render() {
    return (
      <div style={{backgroundColor: '#FAFAFA', height: 1000}}>
        <Nav />
        <div className="container">
          <div className="row">
            <div className="col-12" style={{backgroundColor: 'white', padding: 20}}>
              <h4><b>Login to your account</b></h4>
              <hr />
              <form onSubmit={this.handleSubmit}>
                <div className="form-group">
                  <label>Email Address</label>
                  <input onChange={this.handleEmailChange} type="email" className="form-control" placeholder="Enter email address" />
                  <small className="form-text text-muted">We'll never share your email with anyone else.</small>
                </div>
                <div className="form-group">
                  <label>Password</label>
                  <input onChange={this.handlePasswordChange} type="password" className="form-control" placeholder="Password" />
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

export default Login;
