import React from 'react';
import {RouteHandler} from 'react-router';
import {requireAuth} from '../annotations/annotations';

import webmaster from '../../utils/webmaster';

@requireAuth
class Webmaster extends React.Component{
  componentDidMount(){
    this.loadCampaigns();
  }
  loadCampaigns(){
    return webmaster.loadCampaigns().then((campaigns)=>{
      this.setState({campaigns});
      return campaigns;
    })
  }
  constructor(props){
    super(props);
    this.state = {
      campaigns: [],
    };
  }
  addCampaign(title){
    return webmaster.addCampaign(title).then(({updated, campaigns})=>{
      if(updated){
        this.setState({campaigns});
      }
      return updated;
    })
  }
  updateCampaign(campaign){
    return webmaster.updateCampaign(campaign).then(({updated,campaigns})=>{
      if(updated){
        this.setState({campaigns});
      }
      return updated;
    })
  }
  render(){
    return <RouteHandler 
              {...this.props}
              {...this.state}
              addCampaign={this.addCampaign.bind(this)}
              updateCampaign={this.updateCampaign.bind(this)}
              reloadCampaigns={this.loadCampaigns.bind(this)} />;
  }
}

export default Webmaster;