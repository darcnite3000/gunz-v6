import React from 'react';
import _ from 'lodash';
import {
  SelectSelector,
  SiteSelector,
  FullInputSelector,
  InputSelector,
  SearchInputSelector,
  PackSelector,
} from '../../selectors/selectors';
import {LinkBox} from '../../results/results';
import Paging from '../../Paging';

import helpers from '../../../utils/helpers';

import ReactSWF from 'react-swf';

var quickSelects = [
  {
    id: 'blogbottom',
    display: 'Blog Bottom',
    settings: {
      playlistOrientation: 'bottom',
      playlistSize: 200,
      playlistLength: 10,
      width: 480,
      height: 580,
    },
  },
  {
    id: 'blogside',
    display: 'Blog Side',
    settings: {
      playlistOrientation: 'right',
      playlistSize: 225,
      playlistLength: 10,
      width: 520,
      height: 240,
    },
  },
  {
    id: 'blognoplaylist',
    display: 'Blog No Playlist',
    settings: {
      playlistOrientation: null,
      playlistSize: 0,
      playlistLength: 1,
      width: 480,
      height: 380,
    },
  },
  {
    id: 'marginbottom',
    display: 'Margin Bottom',
    settings: {
      playlistOrientation: 'bottom',
      playlistSize: 180,
      playlistLength: 10,
      width: 180,
      height: 380,
    },
  },
  {
    id: 'marginnoplaylist',
    display: 'Margin No Playlist',
    settings: {
      controlPos: 'bottom',
      playlistOrientation: null,
      playlistSize: 0,
      playlistLength: 1,
      width: 250,
      height: 208,
    },
  },
  {
    id: 'marginwide',
    display: 'Margin Wide Bottom',
    settings: {
      controlPos: 'bottom',
      playlistOrientation: 'bottom',
      playlistSize: 250,
      playlistLength: 10,
      width: 250,
      height: 433,
    },
  },
];

var playlistOrientations = [
  { id: 'bottom', display: 'Bottom' },
  { id: 'right', display: 'Right'},
];

var videoScales = [
  {id: 'ws', display: 'Widescreen'},
  {id: '43', display: '4:3 Scale'},
];

class TrailerPlayer extends React.Component{
  componentWillReceiveProps(props){
  }
  constructor(props){
    super(props);
    var current = _.clone(quickSelects[0].settings);
    _.assign(current,{
      sites: [],
      campaign: null,
      program: 1,
      modelSearch: null,
      descSearch: null,
      pack: {id: null},
      format: 'mp4',
      scale: null,
    });
    this.state = {
      current,
      quickSelect: quickSelects[0].id,
      autoUpdating: false,
      showAdvanced: false,
      packs: [],
    }
  }
  handleQuickSelect(select){
    if(select.id != this.state.quickSelect){
      var current = this.state.current;
      _.assign(current, select.settings);
      this.setState({current, quickSelect: select.id});
    }
  }
  handleChange(event){
    var current = this.state.current;
    var target = event.target;
    if(!_.eq(current[target.id],target.value)){
      current[target.id]=target.value
      this.setState({current})
    }
  }
  handleToggle(event){
    var target = event.target.id;
    var newState = {};
    newState[target] = !this.state[target]
    this.setState(newState);
  }
  playerUID(resolution){
    var webmaster = this.props.webmaster.id;
    var sites = this.state.current.sites.join('');
    var pack = this.state.current.pack.id || '';
    var format = this.state.current.format;
    var scale = this.state.current.scale || '';
    var limit = this.state.current.playlistLength;
    return `trailer_${webmaster}${sites}${pack}${format}${scale}${resolution}${limit}`;
  }
  generateResolution(){
    var {
      width,
      height,
      scale,
      playlistOrientation,
      playlistSize,
    } = this.state.current;

    var screenHeight = height - (playlistOrientation == 'bottom' ? playlistSize : 0);
    var screenWidth = width - (playlistOrientation == 'right' ? playlistSize : 0);
    var resolution = '';
    switch(scale){
      case 'ws':
        if(screenWidth < 480 && screenHeight < 270) resolution = '480x270';
        if(screenWidth < 320 && screenHeight < 180) resolution = '320x180';
        if(screenWidth < 240 && screenHeight < 135) resolution = '240x135';
        if(screenWidth < 160 && screenHeight < 90) resolution = '160x90';
        if(screenWidth < 120 && screenHeight < 68) resolution = '120x68';
        break;
      case '43':
        if(screenWidth < 480 && screenHeight < 360) resolution = '480x360';
        if(screenWidth < 320 && screenHeight < 240) resolution = '320x240';
        if(screenWidth < 240 && screenHeight < 180) resolution = '240x180';
        if(screenWidth < 160 && screenHeight < 120) resolution = '160x120';
        if(screenWidth < 120 && screenHeight < 90) resolution = '120x90';
        break;
    }
    return resolution;
  }
  generateMRSS(resolution){
    var webmaster = this.props.webmaster.id;
    var program = this.state.current.program;
    var campaign = this.state.current.campaign || 0;
    var sites = this.state.current.sites.join(':');
    var pack = this.state.current.pack.id || '';
    var format = this.state.current.format;
    var scale = this.state.current.scale || '';
    var limit = this.state.current.playlistLength;
    return `http://www.gunzblazingpromo.com/trailers/getmrss.php?w=${webmaster}&p=${program}&c=${campaign}&selectedSites=${sites}&m=${pack}&mf=${format}&ms=${scale}&mz=${resolution}&limit=${limit}`;
  }
  generateIframeLink(width, height, resolution){
    var webmaster = this.props.webmaster.id;
    var program = this.state.current.program;
    var campaign = this.state.current.campaign || 0;
    var sites = this.state.current.sites.join(':');
    var pack = this.state.current.pack.id || '';
    var format = this.state.current.format;
    var scale = this.state.current.scale || '';
    var limit = this.state.current.playlistLength || 0;
    var playlistSize = this.state.current.playlistSize || 0;
    var playlistOrientation = this.state.current.playlistOrientation || '';

    var values = {
      w: webmaster,
      p: program,
      c: campaign,
      width,
      height,
      sites,
      pack,
      format,
      scale,
      limit,
      resolution,
      playlistSize,
      playlistOrientation,
    }
    var getData = _.map(values, (v,k)=> `${k}=${v}`).join('&');
    return `https://secure.gunzblazingpromo.com/trailers/trailer.php?${getData}`;
  }
  generateIframeCode(link, id, width, height){
    return `<iframe name='${id}' src='${link}' width='${width}' height='${height}' border='0' allowtransparency='true' allowfullscreen="true" mozallowfullscreen="true" webkitallowfullscreen="true" frameborder='0' scrolling='no' /></iframe>`;
  }
  advancedOptions(){
    return (
      <div>
        <InputSelector
          id="width"
          title="Player Width:"
          description="The Total Width of the Trailer Player"
          onChange={this.handleChange.bind(this)}
          value={this.state.current.width} />
        <InputSelector
          id="height"
          title="Player Height:"
          description="The Total Height of the Trailer Player"
          onChange={this.handleChange.bind(this)}
          value={this.state.current.height} />
        <SelectSelector 
          id="playlistOrientation"
          title="Choose Playlist Orientation:"
          none="No Playlist"
          onChange={this.handleChange.bind(this)}
          value={this.state.current.playlistOrientation}
          options={playlistOrientations} />
        {this.state.current.playlistOrientation && <InputSelector
                  id="playlistSize"
                  title={this.state.current.playlistOrientation=='bottom'?"Playlist Height:":"Playlist Width:"}
                  description={this.state.current.playlistOrientation=='bottom'?"The Height of the playlist in the player":"The Width of the playlist in the player"}
                  onChange={this.handleChange.bind(this)}
                  value={this.state.current.playlistSize} />}
      </div>
    );
  }
  render(){
    var {width,height} = this.state.current;
    var resolution = this.generateResolution();
    var uid = this.playerUID(resolution);
    var mrss = this.generateMRSS(resolution)
    var iframeUrl = this.generateIframeLink(width,height,resolution);
    var iframeCode = this.generateIframeCode(iframeUrl,uid,width,height)
    
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
          <InputSelector 
            id="descSearch"
            title="Search Description (optional):"
            onChange={this.handleChange.bind(this)}
            value={this.state.current.descSearch} />
          <SelectSelector
            id="scale"
            title="Choose Scale:"
            none="All Scales"
            onChange={this.handleChange.bind(this)}
            value={this.state.current.scale}
            options={videoScales} />
          <PackSelector 
            id="pack"
            title="Choose Video:"
            onChange={this.handleChange.bind(this)}
            none="No Video Selected"
            value={this.state.current.pack}
            options={this.state.packs}
            />
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
          <iframe 
            src={iframeUrl}
            width={width}
            height={height}
            border='0'
            frameBorder='0'
            allowTransparency={true}
            allowFullScreen={true}
            scrolling='no' />
          <textarea value={iframeCode} readOnly={true} />
          <LinkBox title="iFrame Link" link={iframeUrl} />
          <LinkBox title="MRSS" link={mrss} />
        </div>
      </div>
    );
  }
}

export default TrailerPlayer;