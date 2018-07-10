import React from 'react';
import {requireAuth} from '../annotations/annotations';

@requireAuth
class Stats extends React.Component{
  render(){
    return (
      <section className="content page-container">
        <header>
          <h1>My Stats</h1>
        </header>
        <div className="shell">
          
        </div>
      </section>
    );
  }
}

export default Stats;