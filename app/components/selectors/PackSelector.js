import React from 'react';
import _ from 'lodash';
import helpers from '../../utils/helpers';

class PackSelector extends React.Component{
  constructor(props){
    super(props);
  }
  optionItem(option,index){
    var key = option.id || index;
    var value = option.value || option.id;
    var label = option.display || `${option.paysite.name} - ${option.title}`;
    return <option key={key} value={value}>{label}</option>
  }
  packDetail(){
    var pack = this.props.value;
    if(!pack.id) return <div className="details" />;
    return (
      <div className="details">
        <div className="paysite">{pack.paysite.name}</div>
        <div className="date">{helpers.formatDate(pack.timestamp,'MMMM Do YYYY')}</div>
        <div className="title">{pack.title}</div>
        <img className="image" src={pack.imgUrl} alt={pack.title} />
        <div className="description">{pack.description}</div>
      </div>
    );
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
    var packs = this.props.options.map(this.optionItem.bind(this));
    return (
      <div className="selector selector-pack">
        <span className="label">
          <div className="title">{this.props.title}</div>
          {this.props.description && 
            <div className="description">{this.props.description}</div>}
        </span>
        <div className="inputs">
          <div className="list">
            <select
              id={this.props.id}
              value={this.props.value.id}
              onChange={this.handleChange.bind(this)}
              >
              {this.props.none && <option value={null}>{this.props.none}</option>}
              {packs}
            </select>
          </div>
          {this.packDetail()}
        </div>
      </div>
    );
  }
}
PackSelector.propTypes = {
  id: React.PropTypes.string.isRequired,
  title: React.PropTypes.node.isRequired,
  options: React.PropTypes.arrayOf(React.PropTypes.shape({
    id: React.PropTypes.string,
    title: React.PropTypes.string,
    paysite: React.PropTypes.shape({
      name: React.PropTypes.string,
    })
  })),
  description: React.PropTypes.node,
  none: React.PropTypes.string,
  value: React.PropTypes.shape({
    id: React.PropTypes.string,
  }),
  onChange: React.PropTypes.func.isRequired,
};

export default PackSelector;