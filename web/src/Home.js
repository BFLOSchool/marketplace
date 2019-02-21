/* eslint-disable */
import React, { Component } from 'react';
import axios from 'axios'

import Nav from './Components/Nav';
import './App.css';

class Home extends Component {
  constructor(props) {
    super(props)

    this.state = {
      items: []
    }

    this.getItems = this.getItems.bind(this);
    this.getItems()
  }
  getItems() {
    axios.get('http://localhost:5000/api/marketplace/')
    .then(response => {
      this.setState({
        items: response.data.items
      })
    }).catch((error) => {
      console.log(error);
    });
  }
  render() {
    return (
      <div>
        <Nav />
         <div>
           <br />
           <div className="container">
             <h2>Online Marketplace</h2>
             <hr />
              <div className="row">
                {this.state.items.map((item, i) =>
                  <div className="col-4" key={i}>
                    <a href={'/item/'+item._id}>
                      <img src={item.image} className="cover" alt="image" /><br />
                      <span><b>{item.name}</b> ${item.price}</span><br />
                      <small className="gray">{item.description}</small><br />
                    </a>
                  </div>
                )}
              </div>
           </div>
         </div>
      </div>
    );
  }
}

export default Home;
