import React from 'react';

class ContactUs extends React.Component{
  render(){
    return (
      <section className="content page-container">
        <header>
          <h1>Contact Us</h1>
        </header>
        <div className="shell">
          <div className="shell-half pop-well">
            <img className="block-center" src="assets/images/contact_webmaster.jpg" alt="Webmasters" />
            <div className="pop-content">
              <h4>Webmasters</h4>
              <p>
                For all affiliate enquiries please contact Matt<br />
                Email: <a href="mailto:matt@gunzblazing.com">matt@gunzblazing.com</a>
                {
                  this.props.webmaster.id && 
                  <div>
                    ICQ: 406403235<br />
                    Skype: matthew.vonegidy<br />
                    Telephone US (+1) 704 712 8617
                  </div>
                }
              </p>
            </div>
          </div>
          <div className="shell-half pop-well">
            <img className="block-center" src="assets/images/contact_website.jpg" alt="Website" />
            <div className="pop-content">
              <h4>Webmasters</h4>
              <p>
                For all customer billing or website enquiries please visit<br />
                <a href="http://blazingsupport.com/">BlazingSupport.com</a> or email <a href="mailto:support@blazingsupport.com">support@blazingsupport.com</a>
              </p>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default ContactUs;