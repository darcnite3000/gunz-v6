import React from 'react';
import {RouteHandler, Link} from 'react-router';

class Banners extends React.Component{
  constructor(props){
    super(props);
  }
  render(){
    return (
      <section className="content page-container">
        <header>
          <ul className="pagetabs">
            <li><Link to='general-banners'><h1>General Banners</h1></Link></li>
            <li><Link to='video-banners'><h1>Video Banners</h1></Link></li>
          </ul>
        </header>
        <RouteHandler {...this.props} />
      </section>
    );
  }
}

export default Banners;