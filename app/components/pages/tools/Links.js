import React from 'react';
import {RouteHandler, Link} from 'react-router';

class Links extends React.Component{
  constructor(props){
    super(props);
  }
  render(){
    return (
      <section className="content page-container">
        <header>
          <ul className="pagetabs">
            <li><Link to='linking-code'><h1>Linking Codes</h1></Link></li>
            <li><Link to='url-shortener'><h1>URL Shortener</h1></Link></li>
          </ul>
        </header>
        <RouteHandler {...this.props} />
      </section>
    );
  }
}

export default Links;