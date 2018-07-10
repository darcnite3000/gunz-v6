import React from 'react';

class CampaignRow extends React.Component{
  handleUpdate(){
    this.props.update({
      id: this.props.id,
      title: this.refs.title.getDOMNode().value,
    })
  }
  resetTitle(){
    this.refs.title.getDOMNode().value = this.props.title;
  }
  render(){
    var klass = `campaign-row ${this.props.className}`
    return (
      <div className={klass}>
        <span className="title">{this.props.id}</span>
        <span className="details">
          <input 
            ref="title"
            defaultValue={this.props.title}
            />
          <button className="btn btn-dark" onClick={this.resetTitle.bind(this)}>Reset</button>
          <button className="btn btn-dark" onClick={this.handleUpdate.bind(this)}>Update</button>
        </span>
      </div>
    );
  }
}
CampaignRow.propTypes = {
  id: React.PropTypes.number.isRequired,
  title: React.PropTypes.string.isRequired,
  className: React.PropTypes.string,
  update: React.PropTypes.func.isRequired,
};

export default CampaignRow;