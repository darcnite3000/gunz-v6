import React from 'react';
import News from '../News';
import Features from '../Features';
import TabButtons from '../TabButtons';
import {tourHomeList,webmasterHomeList} from '../../config/toollists';
import helpers from '../../utils/helpers';

var featuredSites = [
  {
    title: 'Gay-Fetish-Porn.xxx is NOW LIVE!',
    img: 'assets/images/gfpfeature.jpg',
    link: 'http://www.gay-fetish-porn.xxx/',
    content: 'Gay-Fetish-Porn.xxx is a VOD site built around content from the Cazzo and Wurst Film Club studios.'
  },
];

class Home extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      loggedIn: null,
      posts: []
    }
  }
  getNewsPosts(){
    if(this.state.loggedIn !== !!this.props.webmaster.id){
      helpers.loadNews().then((posts)=>{
        this.setState({
          loggedIn: !!this.props.webmaster.id,
          posts
        });
      })
    }
    return this.state.posts;
  }
  render(){
    var toolTabs = this.props.webmaster.id ? webmasterHomeList : tourHomeList;
    
    return (
    <section className="content page-container">
      {
        this.props.webmaster.id && 
        <div className="home-contact">
          <span className="home-contact-info">Your Account Executive is <a href="mailto:matt@gunzblazing.com">matt@gunzblazing.com</a></span>
          <span className="home-contact-info">ICQ 406 403 235</span>
          <span className="home-contact-info">PH (+1) 704 529 x 205 Eastern Time</span>
        </div>
      }
      <div className="shell">
        <div className="quoter">
          <p className="quoter-column">
            Designed from the ground up to help you efficiently get what you need and get back to work,
            Gunzblazing recognises how valuable your time is and how hard you work.
            Over the last 12 years many of our innovations have been copied and become
            standard but we still strive to stand out where it matters - payouts,
            conversions, tools, stability and communication.
          </p>
          <p className="quoter-column">
            We're here stronger than ever because we do the right things and focus on
            everyone making money as efficiently as possible. No fuss, no hassle, just
            1.2 decades of payouts with a helping hand whenever you need it.
            We are webmasters, we are here for your success.
            Sign Up and make money with us today.
          </p>
        </div>
        <Features title="Featured Sites" features={featuredSites} />
        <News posts={this.getNewsPosts()} />
        <TabButtons title="Webmaster Tools" tabs={toolTabs} />
      </div>
    </section>
    );
  }
}

export default Home;