import React from 'react';
import _ from 'lodash';
import {
  SelectSelector,
  SiteSelector,
  FullInputSelector,
  InputSelector,
  SearchInputSelector,
} from '../../selectors/selectors';
import { TubeResult } from '../../results/results';
import Paging from '../../Paging';
import helpers from '../../../utils/helpers';

class MultiAppVideo extends React.Component{
  componentWillReceiveProps(props){
  }
  constructor(props){
    super(props);
    this.state = {
      loading: false,
      page: 0,
      perPage: 5,
      blog: {
        descPos: 'bottom',
        width: '638',
        height: '318',
      },
      current: {
        sites: [],
        campaign: null,
        program: 1,
        type: 0,
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
    }, ()=>{
      helpers.getTubeGalleries(this.state.current)
        .then((results)=>{
          this.setState({
            page: 0,
            loading: false,
            results
          });
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
      return <TubeResult 
                key={gallery.id}
                webmaster={this.props.webmaster}
                gallery={gallery}
                blog={this.state.blog}
                typeFilter={this.state.current.type}
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
          <InputSelector 
            id="descSearch"
            title="Search Description (optional):"
            onChange={this.handleChange.bind(this)}
            value={this.state.current.descSearch} />
          <button className="btn btn-dark" disabled={this.state.loading} onClick={this.handleSubmit.bind(this)}>Submit</button>
        </div>
        <div className="results">
          {this.state.loading && <i className="fa fa-spinner fa-pulse fa-5x" />}
          {paging}
          {this.resultPage()}
          {paging}
        </div>
      </div>
    );
  }
}

export default MultiAppVideo;