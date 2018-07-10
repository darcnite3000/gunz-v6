import React from 'react';
import {RouteHandler, Link} from 'react-router';

class Galleries extends React.Component{
  constructor(props){
    super(props);
  }
  render(){
    return (
      <section className="content page-container">
        <header>
          <ul className="pagetabs">
            <li><Link to='hosted-galleries'><h1>Hosted Galleries</h1></Link></li>
            <li><Link to='gallery-export'><h1>Gallery Export</h1></Link></li>
          </ul>
        </header>
        <RouteHandler {...this.props} />
      </section>
    );
  }
}

export default Galleries;