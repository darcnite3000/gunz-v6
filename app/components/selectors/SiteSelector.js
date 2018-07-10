import React from 'react';
import _ from 'lodash';

class SiteSelector extends React.Component{
  constructor(props){
    super(props);

    this.state = {
      current: null,
      add: [],
      remove: [],
    }
  }
  optionItem(option, index){
    var key = option.id || index;
    var value = option.value || option.id;
    var label = option.display;
    return <option key={key} value={value}>{label}</option>;
  }
  getSelections(options,selected){
    var selectedOptions = [], unSelectedOptions = [];
    _.forEach(options,(option)=> {
      if(_.includes(selected,option.id)){
        selectedOptions.push(this.optionItem(option))
      }else{
        unSelectedOptions.push(this.optionItem(option))
      }
    });
    return {selectedOptions,unSelectedOptions};
  }
  addSites(){
    this.onChange(this.props.value.concat(this.state.add));
  }
  removeSites(){
    this.onChange(this.props.value.filter((site)=>this.state.remove.indexOf(site)==-1));
  }
  onChange(selected){
    var event = {
      target: {
        id: this.props.id,
        value: selected
      }
    }
    this.props.onChange(event);
  }
  selectNiche(nicheId,event){
    if(event) event.preventDefault();
    var siteIds = _.pluck(_.filter(this.props.options, {nicheId}), 'id');
    var selected = this.refs.selected.getDOMNode();
    var unselected = this.refs.unselected.getDOMNode();
    var newSelection = {add: [], remove: []};
    _.forEach(selected.childNodes,selectOption.bind(this,'remove'));
    _.forEach(unselected.childNodes,selectOption.bind(this,'add'));
    this.setState(newSelection);

    function selectOption(field, option){
      if(option.tagName == 'OPTION' && option.value && _.includes(siteIds, option.value)){
        option.selected = true;
        newSelection[field].push(option.value);
      }
    }
  }
  currentSelectedSite(){
    var currentSite = _.find(this.props.options, {id: this.state.current});
    var image = `/v6/assets/images/sitelist_${currentSite.name}.jpg`;
    var niche = this.props.niches[currentSite.nicheId];
    return (
      <div className="inner">
        <img src={image} alt={currentSite.name} />
        <div>
          <span>{currentSite.name}</span>
          { currentSite.nicheId !== null && 
            <span> - <a href="#" onClick={this.selectNiche.bind(this, currentSite.nicheId)} >{niche}</a></span>
          }
        </div>
      </div>
    );
  }
  handleSelected(field,event){
    if(event) event.preventDefault();
    var newState = {};
    newState.current = event.target.value;
    newState[field] = _.map(_.toArray(event.target.selectedOptions), 'value');
    this.setState(newState);
  }
  render(){
    var {selectedOptions,unSelectedOptions} = this.getSelections(this.props.options, this.props.value);
    return (
      <div className="selector selector-site">
        <span className="label">
          <div className="title">{this.props.title}</div>
          {this.props.description && 
            <div className="description">{this.props.description}</div>}
        </span>
        <div className="inputs">
          <div className="unselected">
            <select 
              ref="unselected"
              onChange={this.handleSelected.bind(this, 'add')}
              onFocus={this.handleSelected.bind(this, 'add')}
              multiple
              >{unSelectedOptions}</select>
            <button 
              onClick={this.addSites.bind(this)} 
              className="btn btn-medium"
              >Add&nbsp;<i className="fa fa-caret-square-o-right"></i></button>
          </div>
          <div className="currentselected">
            { this.state.current && this.currentSelectedSite() }
          </div>
          <div className="selected">
            <select
              ref="selected"
              onChange={this.handleSelected.bind(this, 'remove')}
              onFocus={this.handleSelected.bind(this, 'remove')}
              multiple
              >{selectedOptions}</select>
            <button
              onClick={this.removeSites.bind(this)}
              className="btn btn-medium"
              ><i className="fa fa-caret-square-o-left"></i>&nbsp;Remove</button>
          </div>
        </div>
      </div>
    );
  }
}
SiteSelector.propTypes = {
  id: React.PropTypes.string.isRequired,
  title: React.PropTypes.node.isRequired,
  options: React.PropTypes.arrayOf(React.PropTypes.shape({
    id: React.PropTypes.string,
    display: React.PropTypes.string,
  })).isRequired,
  none: React.PropTypes.string,
  description: React.PropTypes.node,
  value: React.PropTypes.array,
  onChange: React.PropTypes.func.isRequired,
};

export default SiteSelector;