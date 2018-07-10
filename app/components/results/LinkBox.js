import React from 'react';

class LinkBox extends React.Component{
  render(){
    return (
      <div className="link-box">
        <span className="title">{this.props.title}</span>
        <span className="details">
          <input
            value={this.props.link}
            type="text"
            readOnly={true}
            className="link" />
          <a 
            href={this.props.link}
            download={this.props.download}
            target={this.props.target}
            className="btn btn-dark">{this.props.visit}</a>
        </span>
      </div>
    );
  }
}
LinkBox.propTypes = {
  title: React.PropTypes.node.isRequired,
  link: React.PropTypes.string.isRequired,
  download: React.PropTypes.bool,
  target: React.PropTypes.string,
  visit: React.PropTypes.node,
};
LinkBox.defaultProps = {
  target: '_blank',
  download: false,
  visit: 'Visit',
};

export default LinkBox;