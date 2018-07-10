import React from 'react';
import {RouteHandler, Link} from 'react-router';

class IFrame extends React.Component{
  constructor(props){
    super(props);
  }
  render(){
    return (
      <section className="content page-container">
        <header>
          <ul className="pagetabs">
            <li><Link to='auto-update-banners'><h1>Auto Updating Banners</h1></Link></li>
            <li><Link to='thumbnail-gallery'><h1>Thumbnail Gallery</h1></Link></li>
          </ul>
        </header>
        <RouteHandler {...this.props} />
      </section>
    );
  }
}

export default IFrame;