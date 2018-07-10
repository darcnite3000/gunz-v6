import React from 'react';
import _ from 'lodash';

class SizeSelector extends React.Component{
  constructor(props){
    super(props);
  }
  optionItem(option, index){
    var key = option.id || index;
    var value = option.value || option.id;
    var label = option.display || `${option.width} x ${option.height}`;
    return <option key={key} value={value}>{label}</option>;
  }
  handleChange(event){
    var value = _.find(this.props.options, {id: event.target.value}) || {id: null};
    var newEvent = {
      target: {
        id: this.props.id,
        value
      }
    }
    this.props.onChange(newEvent);
  }
  render(){
    var options = this.props.options.map(this.optionItem.bind(this));

    return (
      <div className="selector selector-size">
        <span className="label">
          <span className="title">{this.props.title}</span>
          {this.props.description && 
            <span className="description">{this.props.description}</span>}
        </span>
        <span className="inputs">
          <select
            id={this.props.id}
            value={this.props.value.id}
            onChange={this.handleChange.bind(this)}>
            {this.props.none && <option value={null}>{this.props.none}</option>}
            {options}
          </select>
        </span>
      </div>
    );
  }
}
SizeSelector.propTypes = {
  id: React.PropTypes.string.isRequired,
  title: React.PropTypes.node.isRequired,
  options: React.PropTypes.arrayOf(React.PropTypes.shape({
    id: React.PropTypes.string,
    height: React.PropTypes.number,
    width: React.PropTypes.number,
  })).isRequired,
  none: React.PropTypes.string,
  description: React.PropTypes.node,
  value: React.PropTypes.shape({
    id: React.PropTypes.string,
  }),
  onChange: React.PropTypes.func.isRequired,
};

export default SizeSelector;