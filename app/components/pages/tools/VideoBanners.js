import React from 'react';
import _ from 'lodash';
import axios from 'axios';
import {
  SelectSelector,
  SiteSelector,
  SizeSelector,
  FullInputSelector,
  InputSelector,
  SearchInputSelector,
  PackSelector,
} from '../../selectors/selectors';

import {
  BannerImageResult,
  BannerFlashResult,
  BannerFPAResult,
} from '../../results/results';
import Paging from '../../Paging';

import helpers from '../../../utils/helpers';

var sizes = [
  {width: 160, height: 600},
  {width: 300, height: 250},
].map((size)=>{
  return {
    id: `${size.width}x${size.height}`,
    display: `${size.width} x ${size.height}`,
    width: size.width,
    height: size.height
  }
});

class VideoBanners extends React.Component{
  componentDidMount(){
    this.loadPacksAndTagLines();
  }
  constructor(props){
    super(props);
    

    this.state = {
      loading: false,
      page: 0,
      perPage: 5,
      current: {
        sites: [],
        campaign: null,
        program: 1,
        type: null,
        modelSearch: null,
        descSearch: null,
        pack: {id: null},
        size: {id: null,width:'',height: ''},
      },
      packs: [],
      tagLines: [],
      results: {
        totalCount: 0,
        banners: []
      }
    }
  }
  loadPacks(){
    return helpers.getVideoBannerPacks(this.state.current)
      .then(({packs})=>{
        this.setState({packs});
      });
  }
  loadPacksAndTagLines(){
    return axios.all([helpers.getVideoBannerPacks(this.state.current),helpers.getVideoBannerTagLines(this.state.current)])
      .then(axios.spread(({packs},{tagLines})=>{
        this.setState({packs, tagLines});
      }))
  }
  handleChange(event){
    var current = this.state.current;
    var target = event.target;
    if(!_.eq(current[target.id],target.value)){
      current[target.id]=target.value;
      this.setState({current})
    }
  }
  handleSizeChange(event){
    var current = this.state.current;
    var target = event.target;
    if(!_.eq(current[target.id],target.value)){
      current[target.id]=target.value;
      this.setState({current}, this.loadPacksAndTagLines.bind(this));
    }
  }
  handleSiteChange(event){
    var current = this.state.current;
    var target = event.target;
    console.log(current[target.id],target.value,_.eq(current[target.id],target.value));
    if(!_.eq(current[target.id],target.value)){
      current[target.id]=target.value;
      this.setState({current}, this.loadPacks.bind(this));
    }
  }
  handleSubmit(event){
    if(event) event.preventDefault();
    this.setState({
      loading: true
    });
    helpers.getVideoBanners(this.state.current)
      .then((results)=>{
        this.setState({
          page: 0,
          loading: false,
          results
        });
      })
      .catch((response)=>{
        this.setState({
          loading: false
        });
        if(response.status == 403){
          this.props.authCheck();
        }
      });
  }
  handlePageChange(page){
    this.setState({page});
  }
  filteredTagLines(){
    var pack = this.state.current.pack;
    if(pack.id){
      return _.filter(this.state.tagLines, {paysiteId: pack.paysite.id});
    }else{
      return this.state.tagLines;
    }
  }
  resultPage(){
    var pageStart = this.state.page*this.state.perPage;
    var pageEnd = pageStart+this.state.perPage;
    var page = this.state.results.banners.slice(pageStart,pageEnd);
    return page.map((banner)=>{
      var flashVars = {};
      if(this.state.current.pack.id){
        flashVars.ebMovie1 = `${this.state.current.pack.id}_${banner.size.width}x${banner.size.height}.mp4`;
      }
      return <BannerFlashResult
                key={banner.id}
                className="row"
                swfObject={true}
                flashVars={flashVars}
                banner={banner}
                webmaster={this.props.webmaster}
                campaign={this.state.current.campaign}
                program={this.state.current.program} />
    });
  }
  render(){
    return (
      <div className="content-inner">
        <div className="configuration">
          <SiteSelector 
            id="sites"
            title="Choose Site:"
            onChange={this.handleSiteChange.bind(this)}
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
            none="All Sizes"
            onChange={this.handleSizeChange.bind(this)}
            value={this.state.current.size}
            options={sizes} />
          <PackSelector 
            id="pack"
            title="Choose Video:"
            onChange={this.handleChange.bind(this)}
            none="No Video Selected"
            value={this.state.current.pack}
            options={this.state.packs}
            />
          <SelectSelector
            id="tagLine"
            title="Choose TagLine:"
            onChange={this.handleChange.bind(this)}
            value={this.state.current.tagLine}
            none="Any TagLine"
            options={this.filteredTagLines()}
            config={{key:'id',value:'tagLine',label:'tagLine'}} />
          <button className="btn btn-dark" disabled={this.state.loading} onClick={this.handleSubmit.bind(this)}>Submit</button>
        </div>
        <div className="results">
          {this.state.loading && <i className="fa fa-spinner fa-pulse fa-5x" />}
          <Paging
            page={this.state.page}
            perPage={this.state.perPage}
            total={this.state.results.totalCount}
            change={this.handlePageChange.bind(this)}
            />
          {this.resultPage()}
          <Paging
            page={this.state.page}
            perPage={this.state.perPage}
            total={this.state.results.totalCount}
            change={this.handlePageChange.bind(this)}
            />
        </div>
      </div>
    );
  }
}

export default VideoBanners;