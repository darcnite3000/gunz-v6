import React from 'react';
import RemLink from './RemLink';



class TabButton extends React.Component{
  render(){
    return (
      <div className="tab-button">
        <RemLink remote={this.props.remote} link={this.props.link}>
          <img src={this.props.image} alt={this.props.title} />
        </ RemLink>
        <RemLink className='title' remote={this.props.remote} link={this.props.link}>
          {this.props.title}
        </ RemLink>
        {this.props.description && (
          <div className="description">{this.props.description}</div>
        )}
      </div>
    );
  }
}
TabButton.propTypes = {
  link: React.PropTypes.string.isRequired,
  title: React.PropTypes.node.isRequired,
  description: React.PropTypes.node,
  remote: React.PropTypes.bool,
};
TabButton.defaultProps = {
  remote: false,
}

export default TabButton;