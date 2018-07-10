import React from 'react';

import helpers from '../../utils/helpers';

import ReactSWF from 'react-swf';

class BannerFlashResult extends React.Component{
  generateFlashVars(){
    var site = this.props.banner.paysite.id;
    var webmaster = this.props.webmaster.id;
    var program = helpers.isRevshareOnly(site) ? 2 : this.props.program;
    var campaign = this.props.campaign || 0;
    var flashvars = {w: webmaster, c: campaign, p: program};
    _.merge(flashvars, this.props.flashVars || {});
    return flashvars;
  }
  generateBannerCode(){
    var guid = this.props.banner.id.replace(/\.swf/i,'');
    var {width,height} = this.props.banner.size;
    var flashvars = this.generateFlashVars();
    var flashvarGet = _.map(flashvars, (v,k)=> `${k}=${v}`).join('&');
    var flashvarStringify = JSON.stringify(flashvars);
    if(this.props.swfObject){
      return `<script type='text/javascript' src='http://www.gunzblazingpromo.com/trailers/swfobject.js'></script>
<div id='${guid}'><a href='http://www.adobe.com/go/getflashplayer'>Get Adobe Flash player</a></div>
<script type='text/javascript'>
var flashvars = ${flashvarStringify};
var params = {
  allowscriptaccess: 'always',
  wmode: 'opaque',
};
var attributes = {};
swfobject.embedSWF('${this.props.banner.urls.remote}?${flashvarGet}','${guid}','${width}','${height}','9.0.0',false,flashvars,params,attributes);
</script>`;
    }else{
      return `<object classid='clsid:d27cdb6e-ae6d-11cf-96b8-444553540000' codebase='https://fpdownload.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=9,0,0,0' width='${width}' height='${height}' align='middle'>
<param name='movie' value='${this.props.banner.urls.remote}?${flashvarGet}'></param>
<param name='allowScriptAccess' value='always'></param>
<param name='wmode' value='opaque'></param>
<param name='quality' value='high'></param>
<param name='bgcolor' value='#000000'></param>
<embed src='${this.props.banner.urls.remote}?${flashvarGet}' quality='high' bgcolor='#000000' width='${width}' height='${height}' align='middle' allowScriptAccess='always' wmode='opaque' allowFullScreen='true' type='application/x-shockwave-flash' pluginspage='http://www.macromedia.com/go/getflashplayer'></embed>
</object>`;
    }
    return code;
  }
  render(){
    var guid = this.props.banner.id.replace(/\.swf/i,'');
    var bannerCode = this.generateBannerCode();
    var flashvars = this.generateFlashVars();
    var flashvarGet = _.map(flashvars, (v,k)=> `${k}=${v}`).join('&');
    var src = `${this.props.banner.urls.local}?${flashvarGet}`;
    var klass = `result-banner-image ${this.props.className}`;
    return (
      <div className={klass}>
        <div className="paysite">{this.props.banner.paysite.name}</div>
        <div className="date">{helpers.formatDate(this.props.banner.timestamp,'MMMM Do YYYY')}</div>
        <div className="title">{this.props.banner.id}</div>
        {!!ReactSWF.getFPVersion() && <ReactSWF
                  src={src}
                  id={guid}
                  width={this.props.banner.size.width}
                  height={this.props.banner.size.height}
                  wmode="opaque"
                  allowScriptAccess="always"
                  bgcolor="#000000"
                  flashVars={flashvars} />}
        <textarea value={bannerCode} readOnly={true} />
      </div>
    );
  }
}
BannerFlashResult.propTypes = {
  banner: React.PropTypes.shape({
    id: React.PropTypes.string,
    size: React.PropTypes.shape({
      width: React.PropTypes.number,
      height: React.PropTypes.number,  
    }),
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
BannerFlashResult.defaultProps = {
};

export default BannerFlashResult;