import React from 'react';

class NewsItem extends React.Component{
  render(){
    return (
      <article>
        <header>
          <h1>{this.props.title}</h1>
        </header>
        {this.props.link && <a href={this.props.link} className="btn btn-dark" target="_blank">View Mailer</a>}
        <p>{this.props.content}</p>
      </article>
    );
  }
}
NewsItem.propTypes = {
  title: React.PropTypes.node.isRequired,
  link: React.PropTypes.string,
  content: React.PropTypes.node.isRequired,
};

export default NewsItem;