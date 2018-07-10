import React from 'react';
import Router from 'react-router';
import routes from './config/routes';

var router = Router.create({
  routes: routes,
  location: Router.HistoryLocation
})

var controls = {
  getCurrentPath() {
    return router.getCurrentPath();
  },

  makePath(to, params, query) {
    return router.makePath(to, params, query);
  },

  makeHref(to, params, query) {
    return router.makeHref(to, params, query);
  },

  transitionTo(to, params, query) {
    router.transitionTo(to, params, query);
  },

  replaceWith(to, params, query) {
    router.replaceWith(to, params, query);
  },

  goBack() {
    router.goBack();
  }
}

router.run((Root, state)=>{
  React.render(<Root {...state} router={controls} />, document.body);
})