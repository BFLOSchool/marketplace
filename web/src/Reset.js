/* eslint-disable */
import React, { Component } from 'react';
import Nav from './Components/Nav';
import axios from 'axios'

class Reset extends Component {
  constructor(props) {
    super(props)

    this.submitPassword = this.submitPassword.bind(this);
    this.handleNewPasswordChange = this.handleNewPasswordChange.bind(this);

    this.state = {
      newPassword: ''
    }
  }
  handleNewPasswordChange(event) {
    this.setState({
      newPassword: event.target.value
    })
  }
  submitPassword(event) {
    event.preventDefault();
    if (this.state.newPassword !== "") {
      var data = {
        password: this.state.newPassword,
        token: this.props.match.params.token
      }
      axios.post('http://localhost:5000/reset/new', data).then(response =>{
        alert("Thank you for your purchase")
      }).catch(error =>{
        console.log(error)
        alert('Whoops, something went wrong. Please try again!')
      });
    } else {
      alert("Error. Please completely fill out this form.");
    }
  }
  render() {
    return (
      <div style={{backgroundColor: '#FAFAFA', height: 1000}}>
        <Nav />
        <div className="container-fluid">
        </div>
        <br /><br />
        <div className="container">
          <div className="row">
            <div className="col-12" style={{backgroundColor: 'white', padding: 40}}>
              <h4><b>Reset your Password</b></h4>
              <p className="gray">Use the form below to enter your new password</p>
              <form onSubmit={this.submitPassword}>
                <div className="row">
                  <div className="col-12">
                    <input type="password" placeholder="New Password" onChange={this.handleNewPasswordChange} />
                  </div>
                  <br /><br />
                  <div className="col-12">
                    <input type="submit" className="add pointer" onClick={this.checkout} />
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Reset;
