import React from 'react';

import NewsItem from './NewsItem';

class News extends React.Component{
  constructor(props){
    super(props);
  }
  render(){
    var posts = this.props.posts.map((post,index)=> <NewsItem {...post} key={index} />)
    return (
      <section className="news">
        <header>
          <h1>News</h1>
        </header>
        <div className="scrolled-content">
        {posts}
        </div>
      </section>
    );
  }
}
News.propTypes = {
  posts: React.PropTypes.array.isRequired,
};

export default News;