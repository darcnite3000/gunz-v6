import React from 'react';
import {Link} from 'react-router';

class RemLink extends React.Component{
  render(){
    return this.props.remote ? 
      <a href={this.props.link} target="_blank" {...this.props}>
        {this.props.children}
      </a> :
      <Link to={this.props.link} {...this.props}>
        {this.props.children}
      </Link>;
  }
}
RemLink.propTypes = {
  link: React.PropTypes.string.isRequired,
  remote: React.PropTypes.bool,
};
RemLink.defaultProps = {
  remote: false,
};

export default RemLink;