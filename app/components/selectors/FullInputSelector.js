import React from 'react';

class FullInputSelector extends React.Component{
  constructor(props){
    super(props);
  }
  render(){

    return (
      <div className="selector selector-fullinput">
        <span className="label">
          <div className="title">{this.props.title}</div>
          {this.props.description && 
            <div className="description">{this.props.description}</div>}
        </span>
        <div className="inputs">
          <input
            id={this.props.id}
            onChange={this.props.onChange}
            value={this.props.value} />
        </div>
      </div>
    );
  }
}
FullInputSelector.propTypes = {
  id: React.PropTypes.string.isRequired,
  title: React.PropTypes.node.isRequired,
  description: React.PropTypes.node,
  value: React.PropTypes.any,
  onChange: React.PropTypes.func.isRequired,
};

export default FullInputSelector;