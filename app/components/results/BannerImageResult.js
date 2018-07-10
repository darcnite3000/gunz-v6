import React from 'react';
import _ from 'lodash';
import helpers from '../../utils/helpers';

class BannerImageResult extends React.Component{
  createLink(){
    var site = this.props.banner.paysite.id;
    var webmaster = this.props.webmaster.id;
    var program = helpers.isRevshareOnly(site) ? 2 : this.props.program;
    var campaign = this.props.campaign || 0;
    if(site==1){
      return `http://www.gunzblazing.com/ref.php?w=${webmaster}&tool=9`;
    }
    return `http://gunzblazing.com/hit.php?w=${webmaster}&s=${site}&p=${program}&c=${campaign}&tool=9`;
  }
  generateBannerCode(){
    var link = this.createLink();
    var url = this.props.banner.urls.remote;
    var title = this.props.banner.tagline || this.props.banner.paysite.name;
    return `<a href="${link}" target="_blank"><img src=${url} alt='${_.escape(title)}' /></a>`;
  }
  render(){
    var bannerCode = this.generateBannerCode();
    var title = this.props.banner.tagline || this.props.banner.paysite.name;
    var klass = `result-banner-image ${this.props.className}`;
    return (
      <div className={klass}>
        <div className="paysite">{this.props.banner.paysite.name}</div>
        <div className="date">{helpers.formatDate(this.props.banner.timestamp,'MMMM Do YYYY')}</div>
        <div className="title">{this.props.banner.id}</div>
        {this.props.banner.tagline && <div className="tagline">{this.props.banner.tagline}</div>}
        <img className="image" src={this.props.banner.urls.local} alt={title} />
        <textarea value={bannerCode} readOnly={true} />
      </div>
    );
  }
}


BannerImageResult.propTypes = {
  banner: React.PropTypes.shape({
    id: React.PropTypes.string,
    timestamp: React.PropTypes.number,
    paysite: React.PropTypes.shape({
      id: React.PropTypes.string,
      name: React.PropTypes.string,
    }),
    urls: React.PropTypes.shape({
      remote: React.PropTypes.string,
      local: React.PropTypes.string,
    })
  }).isRequired,
  flashVars: React.PropTypes.object,
  webmaster: React.PropTypes.shape({
    id: React.PropTypes.string
  }).isRequired,
  campaign: React.PropTypes.number,
  program: React.PropTypes.number,
  className: React.PropTypes.string,
};
BannerImageResult.defaultProps = {
};

export default BannerImageResult;