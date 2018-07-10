import React from 'react';

var createDefaultRedirect = (dest)=>{
  return class DefaultRedirect extends React.Component{
    static willTransitionTo(transition, params){
      transition.redirect(dest, params);
    }
  }
}

export default createDefaultRedirect;