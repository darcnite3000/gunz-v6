import React from 'react';
import {RouteHandler, Link} from 'react-router';

class Trailers extends React.Component{
  constructor(props){
    super(props);
  }
  render(){
    return (
      <section className="content page-container">
        <header>
          <ul className="pagetabs">
            <li><Link to='multi-app-video'><h1>Multi-App Video</h1></Link></li>
            <li><Link to='trailer-player'><h1>Trailer Player</h1></Link></li>
            <li><Link to='tube-export'><h1>Tube Export</h1></Link></li>
          </ul>
        </header>
        <RouteHandler {...this.props} />
      </section>
    );
  }
}

export default Trailers;