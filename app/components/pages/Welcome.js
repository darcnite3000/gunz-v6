import React from 'react';
import {Link} from 'react-router';

class Welcome extends React.Component{
  render(){
    var entryto = (this.props.query.nextPath) ? 
                    this.props.query.nextPath :
                    'home';
    return (
      <section className="content page-container">
        <header>
          <h1>Welcome</h1>
        </header>
        <div className="shell">
          <div className="shell-half pop-well">
            <Link to={entryto}><img className="block-center" src="assets/images/contact_webmaster.jpg" alt="Webmasters" /></Link>
            <div className="pop-content">
              <h4>Webmasters</h4>
              <p>
                For all webmasters and affiliates of GunzBlazing.com
              </p>
            </div>
          </div>
          <div className="shell-half pop-well">
            <a href="http://www.blazingsupport.com/"><img className="block-center"  src="assets/images/contact_website.jpg" alt="Website" /></a>
            <div className="pop-content">
              <h4>Webmasters</h4>
              <p>
                For all customer billing or website enquiries please visit<br />
                <a href="http://blazingsupport.com/">BlazingSupport.com</a>
                or email <a href="mailto:support@blazingsupport.com">support@blazingsupport.com</a>
              </p>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default Welcome;