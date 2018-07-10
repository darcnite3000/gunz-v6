import React from 'react';
import {RouteHandler} from 'react-router';

import webmaster from '../../utils/webmaster';
import helpers from '../../utils/helpers';


import GunzHeader from './GunzHeader';
import MainFeature from './MainFeature';
import GunzFooter from './GunzFooter';

import {requireSplash} from '../annotations/annotations';

@requireSplash
class Main extends React.Component{
  componentDidMount(){
    this.remember();
    this.loadSites();
    this.loadAccountOptions();
    
  }
  constructor(props){
    super(props);
    this.state = {
      webmaster: {
        id: null,
        username: null
      },
      sites: [],
      niches: [],
      states: [],
      countries: [],
      minpayout: [],
    }
  }
  remember(forget=false){
    return webmaster.remember(forget)
      .then((webmaster)=>{
        this.setState({webmaster});
        return webmaster;
      })
  }
  loadSites(){
    return helpers.loadSites().then(({sites,niches})=>{
      this.setState({sites,niches});
    })
  }
  loadAccountOptions(){
    return helpers.loadAccountOptions().then(({states,countries,minpayout})=>{
      this.setState({states,countries,minpayout});
    })
  }
  handleLogin(username,password){
    return webmaster.login(username,password)
      .then((webmaster)=>{
        this.setState({webmaster})
        if(webmaster.id){
          if(this.props.query.nextPath){
            this.props.router.replaceWith(this.props.query.nextPath);
          }
        }
      }).catch(()=>{})
  }
  handleLogout(){
    return webmaster.logout(this.state.webmaster.username)
      .then((webmaster)=>{
        this.setState({webmaster})
        this.props.router.replaceWith('/v6/');
      }).catch(()=>{})
  }
  render(){
    return (
      <div>
        <GunzHeader 
          remember={this.remember.bind(this)}
          login={this.handleLogin.bind(this)}
          logout={this.handleLogout.bind(this)}
          {...this.state} />
        {
          this.props.pathname == '/v6/' && 
          <MainFeature {...this.state} />
        }
        <RouteHandler 
          remember={this.remember.bind(this)}
          login={this.handleLogin.bind(this)}
          logout={this.handleLogout.bind(this)}
          reloadSites={this.loadSites.bind(this)}
          reloadAccountOptions={this.loadAccountOptions.bind(this)}
          {...this.state}
          {...this.props} />
        <GunzFooter />
      </div>
    );
  }
}

export default Main;