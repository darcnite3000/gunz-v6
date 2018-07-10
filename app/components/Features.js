import React from 'react';

class Features extends React.Component{
  render(){
    var features = this.props.features.map((feature,index)=>{
      return (
        <article key={index} className="feature-block">
          {feature.img && <a href={feature.link} target="_blank"><img src={feature.img} alt={feature.title} /></a>}
          <header>
            <h1><a href={feature.link} target="_blank">{feature.title}</a></h1>
          </header>
          <p>{feature.content}</p>
        </article>
      );
    });

    return (
      <aside className="features pop-well">
        <header className="title">{this.props.title}</header>
        {features}
      </aside>
    );
  }
}
Features.propTypes = {
  title: React.PropTypes.node.isRequired,
  features: React.PropTypes.arrayOf(React.PropTypes.shape({
    title: React.PropTypes.string,
    link: React.PropTypes.string,
    content: React.PropTypes.node,
  })).isRequired,
};

export default Features;