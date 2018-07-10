import React from 'react';
import helpers from '../../utils/helpers';

class BannerFPAResult extends React.Component{
  generateBannerCode(){
    var site = this.props.banner.paysite.id;
    var webmaster = this.props.webmaster.id;
    var program = helpers.isRevshareOnly(site) ? 2 : this.props.program;
    var campaign = this.props.campaign || 0;
    var content = this.props.banner.content
      .replace(/%wmid%|%25wmid%25/g, webmaster)
      .replace(/%site%|%25site%25/g, site)
      .replace(/%program%|%25program%25/g,program)
      .replace(/\/hit\.php\?/g,"/hit.php?tool=4&")
    return content;
  }
  render(){
    var bannerCode = this.generateBannerCode();
    var title = this.props.banner.paysite.name;
    var klass = `result-banner-image ${this.props.className}`;
    return (
      <div className={klass}>
        <div className="paysite">{this.props.banner.paysite.name}</div>
        <div className="date">{helpers.formatDate(this.props.banner.timestamp,'MMMM Do YYYY')}</div>
        <div className="title">{this.props.banner.id}</div>
        <img className="image" src={this.props.banner.urls.preview} alt={title} />
        <textarea value={bannerCode} readOnly={true} />
        <a href={this.props.banner.urls.local} download={true} target="_blank">Download ZIP</a>
      </div>
    );
  }
}
BannerFPAResult.propTypes = {
  banner: React.PropTypes.shape({
    id: React.PropTypes.string,
    timestamp: React.PropTypes.number,
    paysite: React.PropTypes.shape({
      id: React.PropTypes.string,
      name: React.PropTypes.string,
    }),
    content: React.PropTypes.string,
    urls: React.PropTypes.shape({
      preview: React.PropTypes.string,
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
BannerFPAResult.defaultProps = {
};


export default BannerFPAResult;