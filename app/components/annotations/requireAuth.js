import React from 'react';
import webmaster from '../../utils/webmaster';

var requireAuth = (Component)=>{
  return class Authenticated extends React.Component{
    static willTransitionTo(transition, params, query, callback){
      var loginRedirect = (loggedIn)=>{
        if(!loggedIn){
          transition.redirect('login',{},{nextPath: transition.path});
        }
        callback();
      }
      webmaster.isLoggedIn().then(loginRedirect)
    }
    authCheck(){
      return this.props.remember(true).then((webmaster)=>{
        if(!webmaster.id){
          this.props.router.transitionTo('login',{},{nextPath: this.props.router.getCurrentPath()})
        }
      })
    }
    render(){
      return <Component authCheck={this.authCheck.bind(this)}  {...this.props} />;
    }
  }
}

export default requireAuth;