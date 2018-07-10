import React from 'react';

class InputSelector extends React.Component{
  constructor(props){
    super(props);
  }
  render(){

    return (
      <div className="selector selector-input">
        <span className="label">
          <span className="title">{this.props.title}</span>
          {this.props.description && 
            <span className="description">{this.props.description}</span>}
        </span>
        <span className="inputs">
          <input
            id={this.props.id}
            onChange={this.props.onChange}
            value={this.props.value} />
        </span>
      </div>
    );
  }
}
InputSelector.propTypes = {
  id: React.PropTypes.string.isRequired,
  title: React.PropTypes.node.isRequired,
  description: React.PropTypes.node,
  value: React.PropTypes.any,
  onChange: React.PropTypes.func.isRequired,
};

export default InputSelector;