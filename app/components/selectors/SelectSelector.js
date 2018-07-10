import React from 'react';

class SelectSelector extends React.Component{
  constructor(props){
    super(props);
  }
  optionItem(option,index){
    var key = option.id || index;
    var value = option.value || option.id;
    var label = option.display;
    return <option key={key} value={value}>{label}</option>;
  }
  render(){
    var options = this.props.options.map(this.optionItem.bind(this));

    return (
      <div className="selector selector-select">
        <span className="label">
          <span className="title">{this.props.title}</span>
          {this.props.description && 
            <span className="description">{this.props.description}</span>}
        </span>
        <span className="inputs">
          <select
            id={this.props.id}
            value={this.props.value}
            onChange={this.props.onChange}>
            {this.props.none && <option value="">{this.props.none}</option>}
            {options}
          </select>
        </span>
      </div>
    );
  }
}
SelectSelector.propTypes = {
  id: React.PropTypes.string.isRequired,
  title: React.PropTypes.node.isRequired,
  options: React.PropTypes.arrayOf(React.PropTypes.shape({
    display: React.PropTypes.string,
  })).isRequired,
  description: React.PropTypes.node,
  value: React.PropTypes.any,
  onChange: React.PropTypes.func.isRequired,
};

export default SelectSelector;