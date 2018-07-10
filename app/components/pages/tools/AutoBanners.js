import React from 'react';
import _ from 'lodash';
import {
  SelectSelector,
  SiteSelector,
  SizeSelector,
  FullInputSelector,
} from '../../selectors/selectors';
import {LinkBox} from '../../results/results';
import helpers from '../../../utils/helpers';

var sizes = [
  {width: 468, height: 60},
  {width: 250, height: 250},
  {width: 728, height: 90},
  {width: 672, height: 126},
  {width: 160, height: 600},
  {width: 120, height: 450},
  {width: 120, height: 600},
].map((size)=>{
  return {
    id: `${size.width}x${size.height}`,
    display: `${size.width} x ${size.height}`,
    width: size.width,
    height: size.height
  }
});

class AutoBanners extends React.Component{
  componentWillReceiveProps(props){
  }
  constructor(props){
    super(props);
    this.state = {
      current: {
        sites: [],
        campaign: null,
        program: 1,
        size: sizes[0],
        target: '_blank',
      }
    }
  }
  handleChange(event){
    var current = this.state.current;
    var target = event.target;
    if(!_.eq(current[target.id],target.value)){
      current[target.id]=target.value
      this.setState({current});
    }
  }
  generateIframeLink(){
    var webmaster = this.props.webmaster.id;
    var program = this.state.current.program;
    var campaign = this.state.current.campaign || '';
    var target = encodeURIComponent(this.state.current.target);
    var {width,height} = this.state.current.size;
    var sites = this.state.current.sites.join(':');
    return `https://secure.gunzblazingpromo.com/iframe/aub/?w=${webmaster}&p=${program}&c=${campaign}&tr=${target}&width=${width}&height=${height}&selectedSites=${sites}`;
  }
  generateIframeName(){
    var webmaster = this.props.webmaster.id;
    var target = encodeURIComponent(this.state.current.target);
    var sites = this.state.current.sites.join(':');
    return `aub_${webmaster}${sites}${this.state.current.size.id}${target}`;
  }
  generateIframeCode(link, id, width, height){
    return `<iframe name='${id}' src='${link}' width='${width}' height='${height}' border='0' allowtransparency='true' frameborder='0' scrolling='no' /></iframe>`;
  }
  render(){
    var {width,height} = this.state.current.size;
    var iframeName = this.generateIframeName();
    var iframeUrl = this.generateIframeLink();
    var iframeCode = this.generateIframeCode(iframeUrl,iframeName,width,height)

    return (
      <div className="content-inner">
        <div className="configuration">
          <SiteSelector 
            id="sites"
            title="Choose Site:"
            onChange={this.handleChange.bind(this)}
            value={this.state.current.sites}
            options={this.props.sites}
            niches={this.props.niches} />
          <SelectSelector
            id="program"
            title="Choose Program:"
            onChange={this.handleChange.bind(this)}
            value={this.state.current.program}
            options={helpers.programs} />
          <SelectSelector
            id="campaign"
            title="Choose Campaign:"
            onChange={this.handleChange.bind(this)}
            value={this.state.current.campaign}
            none="No Campaign"
            options={this.props.campaigns} />
          <SizeSelector
            id="size"
            title="Choose Size:"
            onChange={this.handleChange.bind(this)}
            value={this.state.current.size}
            options={sizes}
             />
          <FullInputSelector
            id="target"
            title="Link Target:"
            description="'_self' opens in the current window, '_blank' opens in a new page"
            value={this.state.current.target}
            onChange={this.handleChange.bind(this)} />
        </div>
        <div className="results">
          <LinkBox title="IFrame URL" link={iframeUrl} />
          <textarea value={iframeCode} readOnly={true} />
          <iframe 
            src={iframeUrl}
            width={width}
            height={height}
            border='0'
            frameBorder='0'
            allowTransparency={true}
            scrolling='no' />
        </div>
      </div>
    );
  }
}

export default AutoBanners;