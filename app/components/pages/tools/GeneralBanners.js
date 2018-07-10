import React from 'react';
import _ from 'lodash';
import {
  SelectSelector,
  SiteSelector,
  SizeSelector,
  FullInputSelector,
  InputSelector,
  SearchInputSelector,
} from '../../selectors/selectors';
import {
  BannerImageResult,
  BannerFlashResult,
  BannerFPAResult,
} from '../../results/results';
import Paging from '../../Paging';

import helpers from '../../../utils/helpers';

class GeneralBanners extends React.Component{
  componentWillReceiveProps(props){
    var {sites,type} = this.state.current;
    this.loadBannerSizes(sites,type);
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
        size: {id: null},
      },
      sizes: [],
      results: {
        totalCount: 0,
        banners: []
      }
    }
  }
  loadBannerSizes(sites,type){
    helpers.getGeneralBannerSizes({sites,type})
      .then(({sizes})=>{
        var current = this.state.current;
        if(current.size.id && !_.find(sizes, {id: current.size.id})){
          current.size = {id: null};
          this.setState({current,sizes});
        }else{
          this.setState({sizes});
        }
      })
  }
  handleChange(event){
    var current = this.state.current;
    var target = event.target;
    if(!_.eq(current[target.id],target.value)){
      current[target.id]=target.value
      this.setState({current})
    }
  }
  handleSizeDependentChange(event){
    var current = this.state.current;
    var target = event.target;
    if(current[target.id]!=target.value){
      current[target.id]=target.value
      var {sites,type} = current;
      this.setState({current}, this.loadBannerSizes.bind(this,sites,type));
    }
  }
  handleSubmit(event){
    if(event) event.preventDefault();
    this.setState({
      loading: true
    }, ()=>{
      helpers.getGeneralBanners(this.state.current)
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
    });
    
  }
  handlePageChange(page){
    this.setState({page});
  }
  resultPage(){
    var pageStart = this.state.page*this.state.perPage;
    var pageEnd = pageStart+this.state.perPage;
    var page = this.state.results.banners.slice(pageStart,pageEnd);
    return page.map((banner)=>{
      switch(parseInt(banner.type.id,10)){
        case 2:
          return <BannerFlashResult
                  key={banner.id}
                  className="row"
                  swfObject={true}
                  banner={banner}
                  webmaster={this.props.webmaster}
                  campaign={this.state.current.campaign}
                  program={this.state.current.program} />
        case 4:
          return <BannerFPAResult
                  key={banner.id}
                  className="row"
                  banner={banner}
                  webmaster={this.props.webmaster}
                  campaign={this.state.current.campaign}
                  program={this.state.current.program} />
        default:
          return <BannerImageResult
                  key={banner.id}
                  className="row"
                  banner={banner}
                  webmaster={this.props.webmaster}
                  campaign={this.state.current.campaign}
                  program={this.state.current.program} />
      }
    });
  }
  render(){
    return (
      <div className="content-inner">
        <div className="configuration">
          <SiteSelector 
            id="sites"
            title="Choose Site:"
            onChange={this.handleSizeDependentChange.bind(this)}
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
          <SelectSelector
            id="type"
            title="Choose Type:"
            none="All Types - Excl. Collage"
            onChange={this.handleSizeDependentChange.bind(this)}
            value={this.state.current.type}
            options={helpers.bannerTypes} />
          {
            !!this.state.sizes.length && 
            <SizeSelector
              id="size"
              title="Choose Size:"
              none="All Sizes"
              onChange={this.handleChange.bind(this)}
              value={this.state.current.size}
              options={this.state.sizes} />
          }
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

export default GeneralBanners;