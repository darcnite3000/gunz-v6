import React from 'react';
import _ from 'lodash';

class MultiFieldSelector extends React.Component{
  constructor(props){
    super(props);
  }
  handleFieldSelect(index, event){
    var target = event.target;
    var value = _.toArray(this.props.value);
    value[index] = _.find(this.props.options, {id: target.value}) || {id: null};
    this.sendValue(value);
  }
  removeField(index){
    var value = _.toArray(this.props.value);
    value.splice(index,1);
    this.sendValue(value);
  }
  addNewField(){
    this.sendValue(this.props.value.concat([{id: null}]));
  }
  sendValue(value){
    var newEvent = {
      target: {
        id: this.props.id,
        value
      }
    }
    this.props.onChange(newEvent);
  }
  optionItem(option, index){
    var key = option.id || index;
    var value = option.value || option.id;
    var label = option.display;
    return <option key={option.id} value={value}>{label}</option>;
  }
  getFields(){
    var options = this.props.options.map(this.optionItem.bind(this));
    return this.props.value.map((field, index)=>{
      return (
        <div key={index}>
          <select 
            onChange={this.handleFieldSelect.bind(this,index)}
            value={field.id}
            >
            {this.props.none && <option value={null}>{this.props.none}</option>}
            {options}
          </select>
          <button 
            className="btn btn-medium"
            onClick={this.removeField.bind(this, index)}
            >Remove Field</button>
        </div>
      );
    });
  }
  render(){
    return (
      <div className="selector selector-multifield">
        <span className="label">
          <span className="title">{this.props.title}</span>
          {this.props.description && 
            <span className="description">{this.props.description}</span>}
        </span>
        <span className="inputs">
          {this.getFields()}
          <button
            className="btn btn-medium"
            onClick={this.addNewField.bind(this)}
            >Add Field</button>
        </span>
      </div>
    );
  }
}
MultiFieldSelector.propTypes = {
  id: React.PropTypes.string.isRequired,
  title: React.PropTypes.node.isRequired,
  options: React.PropTypes.arrayOf(React.PropTypes.shape({
    id: React.PropTypes.string,
    display: React.PropTypes.string,
  })),
  none: React.PropTypes.string,
  description: React.PropTypes.node,
  value: React.PropTypes.any,
  onChange: React.PropTypes.func.isRequired,
};

export default MultiFieldSelector;