import React from 'react';
import TabButtons from '../TabButtons';
import {tourList,webmasterList} from '../../config/toollists';

class Tools extends React.Component{
  constructor(props){
    super(props);
  }
  render(){

    var toolTabs = this.props.webmaster.id ? webmasterList : tourList;
    return (
      <section className="content page-container">
        <header>
          <h1>Tools</h1>
        </header>
        <div className="shell shell-light">
          <TabButtons tabs={toolTabs} />
        </div>
      </section>
    );
  }
}

export default Tools;