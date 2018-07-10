import React from 'react';
import Main from '../components/layout/Main';

import {
  Home,
  SignUp,
  OurSites,
  ContactUs,
  FAQs,
  Resources,
  Terms,
  Tools,
  Welcome,
  Login,

  Account,
  PaymentHistory,
  Stats,
  Webmaster
} from '../components/pages/pages';

import toolRoutes from './routes/tools';
import {Router, Route, DefaultRoute} from 'react-router';

import {createDefaultRedirect} from '../components/annotations/annotations';

export default (
  <Route name="app" path="/v6/" handler={Main}>
    <DefaultRoute name="home" handler={Home} />
    <Route name="login" handler={Login} />
    <Route name="signup" handler={SignUp} />
    <Route name="welcome" handler={Welcome} />
    <Route name="oursites" handler={OurSites} />
    <Route name="contact" handler={ContactUs} />
    <Route name="resources" handler={Resources} />
    <Route name="faqs" handler={FAQs} />
    <Route name="terms" handler={Terms} />
    <Route name="tools" handler={Tools} />
    <Route name="account" handler={Account} />
    <Route name="history" handler={PaymentHistory} />
    <Route name="stats" handler={Stats} />
    {toolRoutes}
  </Route>
);