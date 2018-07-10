import React from 'react';
import webmaster from '../../utils/webmaster';
import datastore from '../../utils/datastore';

var requireSplash = (Component)=>{
  return class Splashed extends React.Component{
    static willTransitionTo(transition, params, query, callback){
      var loginRedirect = (loggedIn)=>{
        var splashed = datastore.get('splashed');
        if(!loggedIn && !splashed){
          datastore.set(
            'splashed',
            true,
            datastore.expiresIn.hoursFromNow(24)
          );
          transition.redirect('welcome',{},{nextPath: transition.path});
        }
        callback();
      }
      webmaster.isLoggedIn().then(loginRedirect)
    }
    render(){
      return <Component {...this.props} />;
    }
  }
}

export default requireSplash;