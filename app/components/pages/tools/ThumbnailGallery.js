import React from 'react';
import _ from 'lodash';
import {
  SelectSelector,
  SiteSelector,
  FullInputSelector,
  InputSelector,
} from '../../selectors/selectors';
import {LinkBox} from '../../results/results';

import helpers from '../../../utils/helpers';

var galleryTypes = [
  {id: 'both', display: 'All Types'},
  {id: 'va', display: 'Tube Galleries'},
  {id: 'fhg', display: 'Movie Galleries'},
];

var sortOrders = [
  {id: 'latest', display: 'Newest First'},
  {id: 'random', display: 'Randomized'},
];

var quickSelects = [
  {
    id: 'blogstrips',
    display: 'Blog Strips',
    settings: {
      thumbWidth: '75px',
      thumbHeight: '75px',
      thumbPadding: '2px',
      iframeWidth: '480px',
      iframeHeight: '154px',
      count: 12,
      type: 'va',
      order: 'latest',
      target: '_blank',
    }
  },
  {
    id: 'blogmargins',
    display: 'Blog Margins',
    settings: {
      thumbWidth: 75,
      thumbHeight: 75,
      thumbPadding: '2px',
      iframeWidth: '160px',
      iframeHeight: '580px',
      count: 14,
      type: 'va',
      order: 'latest',
      target: '_blank',
    }
  },
  {
    id: 'blogstrip',
    display: 'Blog Strip',
    settings: {
      thumbWidth: 115,
      thumbHeight: 115,
      thumbPadding: '2px',
      iframeWidth: '480px',
      iframeHeight: '120px',
      count: 4,
      type: 'va',
      order: 'latest',
      target: '_blank',
    }
  },
  {
    id: 'blogmargin',
    display: 'Blog Margin',
    settings: {
      thumbWidth: 120,
      thumbHeight: 120,
      thumbPadding: '2px',
      iframeWidth: '160px',
      iframeHeight: '620px',
      count: 14,
      type: 'va',
      order: 'latest',
      target: '_blank',
    }
  }
];

class ThumbnailGallery extends React.Component{
  componentWillReceiveProps(props){
  }
  constructor(props){
    super(props);
    var current = _.clone(quickSelects[0].settings);
    _.assign(current,{
      sites: [],
      campaign: null,
      program: 1,
    });
    this.state = {
      current,
      quickSelect: quickSelects[0].id,
      showAdvanced: false,
    }
  }
  handleChange(event){
    var current = this.state.current;
    var target = event.target;
    if(!_.eq(current[target.id],target.value)){
      current[target.id]=target.value
      this.setState({
        current,
        quickSelect: null
      });
    }
  }
  splitPadding(padding){
    var paddings = padding.split(' ');
    switch(paddings.length){
      case 4:
        var [top, right, bottom, left] = paddings;
        return {top, right, bottom, left};
      case 3:
        var [top, right, bottom] = paddings;
        return {top, right, bottom, left: right};
      case 2:
        var [top, right] = paddings;
        return {top, right, bottom: top, left: right};
      default:
        var [top] = paddings;
        return {top, right: top, bottom: top, left: top};
    }
  }
  generateIframeLink(){
    var {
      sites,
      program,
      thumbWidth,
      thumbHeight,
      thumbPadding,
      iframeWidth,
      iframeHeight,
      count,
      type,
      order,
      target
    } = this.state.current;
    var thumbPadding = this.splitPadding(thumbPadding);
    var webmaster = this.props.webmaster.id;
    var campaign = this.state.current.campaign || '';
    var target = encodeURIComponent(target);
    var sites = sites.join(':');
    return `https://secure.gunzblazingpromo.com/iframe/tg/?w=${webmaster}&p=${program}&c=${campaign}&selectedSites=${sites}&t=${type}&st=${order}&tr=${target}&width=${thumbWidth}&height=${thumbHeight}&l=${count}&pt=${thumbPadding.top}&pr=${thumbPadding.right}&pb=${thumbPadding.bottom}&pl=${thumbPadding.left}`;
  }
  generateIframeName(){
    var {
      sites,
      thumbWidth,
      thumbHeight,
      thumbPadding,
      iframeWidth,
      iframeHeight,
      count,
      type,
      order,
      target
    } = this.state.current;
    var webmaster = this.props.webmaster.id;
    var target = encodeURIComponent(target);
    var sites = sites.join(':');
    return `tg_${webmaster}${sites}${type}${order}${target}${thumbWidth}${thumbHeight}${count}`;
  }
  generateIframeCode(link, id, width, height){
    return `<iframe name='${id}' src='${link}' width='${width}' height='${height}' border='0' allowtransparency='true' frameborder='0' scrolling='no' /></iframe>`;
  }
  handleQuickSelect(select){
    if(select.id != this.state.quickSelect){
      var current = this.state.current;
      _.assign(current, select.settings);
      this.setState({current, quickSelect: select.id});
    }
  }
  handleToggle(event){
    var target = event.target.id;
    var newState = {};
    newState[target] = !this.state[target]
    this.setState(newState);
  }
  advancedOptions(){
    return (
      <div>
        <InputSelector
          id="thumbWidth"
          title="Thumbnail Width:"
          description="The width in pixels you want your thumbnail to be"
          onChange={this.handleChange.bind(this)}
          value={this.state.current.thumbWidth}
           />
        <InputSelector
          id="thumbHeight"
          title="Thumbnail Height:"
          description="The Height in pixels you want your thumbnail to be"
          onChange={this.handleChange.bind(this)}
          value={this.state.current.thumbHeight}
           />
        <FullInputSelector
          id="thumbPadding"
          title="Thumbnail Padding:"
          description="The size of the padding around each image (e.g. 3px). This also allows for space separated values for top, right, bottom and left (like css)."
          onChange={this.handleChange.bind(this)}
          value={this.state.current.thumbPadding}
           />
        <InputSelector
          id="iframeWidth"
          title="IFrame Width:"
          description="The Width in pixels/percent you want your iframe to be"
          onChange={this.handleChange.bind(this)}
          value={this.state.current.iframeWidth}
           />
        <InputSelector
          id="iframeHeight"
          title="IFrame Height:"
          description="The Height in pixels/percent you want your iframe to be"
          onChange={this.handleChange.bind(this)}
          value={this.state.current.iframeHeight}
           />
        <InputSelector
          id="count"
          title="Number of Thumbnails:"
          description="The max number of galleries to display"
          onChange={this.handleChange.bind(this)}
          value={this.state.current.count}
           />
        <SelectSelector
          id="type"
          title="Gallery Type:"
          onChange={this.handleChange.bind(this)}
          value={this.state.current.type}
          options={galleryTypes}
           />
        <SelectSelector
          id="order"
          title="Thumbnail Order:"
          onChange={this.handleChange.bind(this)}
          value={this.state.current.order}
          options={sortOrders}
           />
        <FullInputSelector
          id="target"
          title="Link Target:"
          description="'_self' opens in the current window, '_blank' opens in a new page"
          value={this.state.current.target}
          onChange={this.handleChange.bind(this)} />
      </div>
    );
  }
  render(){
    var {iframeWidth,iframeHeight} = this.state.current;
    var iframeName = this.generateIframeName();
    var iframeUrl = this.generateIframeLink();
    var iframeCode = this.generateIframeCode(iframeUrl,iframeName,iframeWidth,iframeHeight)
    var quickSelectsButtons = quickSelects.map((select)=>{
      var isChecked = select.id == this.state.quickSelect;
      var klass = `qsbutton ${isChecked?'active':''}`;
      return (
        <button key={select.id} className={klass} onClick={this.handleQuickSelect.bind(this,select)}>{select.display}</button>
      );
    })
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
            value={this.state.current.program}
            none="No Campaign"
            options={this.props.campaigns} />
          {quickSelectsButtons}
          <div>
            <input 
              type="checkbox" 
              id="showAdvanced"
              onChange={this.handleToggle.bind(this)} 
              checked={this.state.showAdvanced}/>
            <label htmlFor="showAdvanced">Advanced Configuration</label>
          </div>
          {this.state.showAdvanced && this.advancedOptions()}
        </div>
        <div className="results">
          <LinkBox title="IFrame URL" link={iframeUrl} />
          <textarea value={iframeCode} readOnly={true} />
          <iframe 
            src={iframeUrl}
            width={iframeWidth}
            height={iframeHeight}
            border='0'
            frameBorder='0'
            allowTransparency={true}
            allowfullscreen={true}
            scrolling='no' />
        </div>
      </div>
    );
  }
}

export default ThumbnailGallery;