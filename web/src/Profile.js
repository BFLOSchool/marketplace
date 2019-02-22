/* eslint-disable */
import React, { Component } from 'react';
import Nav from './Components/Nav';
import axios from 'axios'

class Profile extends Component {
  constructor(props) {
    super(props)

    this.state = {
      firstName: '',
      lastName: '',
      phoneNumber: '',
      email: ''
    }
  }
  componentDidMount() {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    axios.get('http://localhost:5000/api/profile/'+user._id, { headers: { 'Authorization': token, 'Content-Type': 'application/x-www-form-urlencoded' } }).then(response => {
      this.setState({
        firstName: response.data.firstName,
        lastName: response.data.lastName,
        phoneNumber: response.data.phoneNumber,
        email: response.data.email
      })
    }).catch((error) => {
      console.log(error)
    });
  }
  render() {
    return (
      <div style={{backgroundColor: '#FAFAFA', height: 1000}}>
        <Nav />
        <div className="container">
          <div className="row">
            <div className="col-12" style={{backgroundColor: 'white', padding: 20}}>
              <h4><b>Your Profile</b></h4>
              <hr />
              <div className="card">
                <div className="card-header">
                  Your Account
                </div>
                <div className="card-body">
                  <blockquote className="blockquote mb-0">
                    <ul>
                      <li><b>Name</b>: {this.state.firstName} {this.state.lastName}</li>
                      <li><b>Email</b>: {this.state.email}</li>
                      <li><b>Phone Number</b>: {this.state.phoneNumber}</li>
                    </ul>
                  </blockquote>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Profile;
