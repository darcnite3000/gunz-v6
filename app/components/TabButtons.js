import React from 'react';
import TabButton from './TabButton';

class TabButtons extends React.Component{
  constructor(props){
    super(props);
  }
  render(){
    var tabs = this.props.tabs
      .map((tab,index)=> <TabButton {...tab} key={tab.id ? tab.id : index} /> );
    
    return (
      <section className="tab-buttons">
        <header>
          <h1>{this.props.title}</h1>
        </header>
        {tabs}
      </section>
    );
  };
}
TabButtons.propTypes = {
  title: React.PropTypes.node,
  tabs: React.PropTypes.array.isRequired,
};

export default TabButtons;