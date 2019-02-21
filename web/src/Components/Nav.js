import React, { Component } from 'react';

class Nav extends Component {
  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
         <a href="/" className="navbar-brand"><b>NICE FOODS</b></a>
         <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
           <span className="navbar-toggler-icon" />
         </button>
         <div className="collapse navbar-collapse" id="navbarSupportedContent">
           <ul className="navbar-nav mr-auto">
             <li className="nav-item active">
             </li>
           </ul>
           <form className="form-inline my-2 my-lg-0">
             <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Checkout</button>
           </form>
         </div>
       </nav>
    );
  }
}

export default Nav;
