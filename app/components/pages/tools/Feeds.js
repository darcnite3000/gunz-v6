import React from 'react';
import _ from 'lodash';
import {
  SelectSelector,
} from '../../selectors/selectors';
import {LinkBox} from '../../results/results';
import {RouteHandler, Link} from 'react-router';

import helpers from '../../../utils/helpers';



class Feeds extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      current: {
        site: null,
        campaign: null,
        program: 1,
        type: 1,
      },
    }
  }
  handleChange(event){
    var current = this.state.current;
    var target = event.target;
    if(!_.eq(current[target.id],target.value)){
      current[target.id]=target.value
      this.setState({current})
    }
  }
  generateRSSFeedLink(){
    var webmaster = this.props.webmaster.id;
    var site = this.state.current.site || 0;
    var program = this.state.current.program;
    var campaign = this.state.current.campaign || 0;
    var type = this.state.current.type;

    return {
      insecure: `http://gunzblazingpromo.com/rss/w/${webmaster}/s/${site}/p/${program}/c/${campaign}/n/0/t/${type}/`,
      secure: `https://secure.gunzblazingpromo.com/rss/?w=${webmaster}&c=${campaign}&p=${program}&s=${site}&n=0&t=${type}`,
    };
  }
  render(){
    var {insecure,secure} = this.generateRSSFeedLink();
    return (
      <section className="content page-container">
        <header>
          <h1>RSS &amp; Syndication</h1>
        </header>
        <div className="content-inner">
          <div className="configuration">
            <SelectSelector 
              id="site"
              title="Choose Site:"
              none="All Sites"
              onChange={this.handleChange.bind(this)}
              value={this.state.current.site}
              options={this.props.sites} />
            <SelectSelector
              id="program"
              title="Choose Program:"
              onChange={this.handleChange.bind(this)}
              value={this.state.current.program}
              options={helpers.programs} />
            <SelectSelector
              id="campaign"
              title="Choose Campaign:"
              onChange={this.handleChange.bind(this)}
              value={this.state.current.campaign}
              none="No Campaign"
              options={this.props.campaigns} />
            <SelectSelector
              id="type"
              title="Choose Type:"
              onChange={this.handleChange.bind(this)}
              value={this.state.current.type}
              options={helpers.galleryTypes} />
          </div>
          <div className="results">
            <h3>Feed</h3>
            <LinkBox title="Generated RSS Feed" link={insecure} />
            <iframe src={secure} />
          </div>
        </div>
      </section>
    );
  }
}

export default Feeds;