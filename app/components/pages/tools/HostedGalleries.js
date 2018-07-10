import React from 'react';
import _ from 'lodash';

import {
  SelectSelector,
  SiteSelector,
  FullInputSelector,
  InputSelector,
  SearchInputSelector,
} from '../../selectors/selectors';
import { GalleryResult } from '../../results/results';
import Paging from '../../Paging';

import helpers from '../../../utils/helpers';

class HostedGalleries extends React.Component{
  componentWillReceiveProps(props){
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
      },
      results: {
        totalCount: 0,
        galleries: []
      }
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
  handleSubmit(event){
    if(event) event.preventDefault();
    this.setState({
      loading: true
    },()=>{
      helpers.getHostedGalleries(this.state.current)
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
    var page = this.state.results.galleries.slice(pageStart,pageEnd);
    return page.map((gallery)=>{
      return <GalleryResult 
                className="row"
                key={gallery.id}
                gallery={gallery}
                typeFilter={this.state.current.type}
                webmaster={this.props.webmaster}
                campaign={this.state.current.campaign}
                program={this.state.current.program} />
    });
  }
  render(){
    var paging = <Paging
                    page={this.state.page}
                    perPage={this.state.perPage}
                    total={this.state.results.totalCount}
                    change={this.handlePageChange.bind(this)}
                    />;
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
          <SelectSelector
            id="type"
            title="Choose Type:"
            none="All Types"
            onChange={this.handleChange.bind(this)}
            value={this.state.current.type}
            options={helpers.bannerTypes} />
          {false && <SearchInputSelector 
                      id="modelSearch"
                      title="Choose Model (optional):"
                      onChange={this.handleChange.bind(this)}
                      value={this.state.current.modelSearch} />}
          <InputSelector 
            id="descSearch"
            title="Search Description (optional):"
            onChange={this.handleChange.bind(this)}
            value={this.state.current.descSearch} />
          <button className="btn btn-dark" disabled={this.state.loading} onClick={this.handleSubmit.bind(this)}>Submit</button>
        </div>
        <div className="results">
          {this.state.loading && <i className="fa fa-spinner fa-pulse fa-5x" />}
          {!!this.state.results.galleries.length && <h3>Galleries</h3>}
          <div className="striped-rows">
            {paging}
            {this.resultPage()}
            {paging}
          </div>
        </div>
      </div>
    );
  }
}

export default HostedGalleries;