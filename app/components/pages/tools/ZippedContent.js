import React from 'react';
import _ from 'lodash';
import {
  SelectSelector,
  SiteSelector,
  InputSelector,
  SearchInputSelector,
} from '../../selectors/selectors';
import {ZippedContentResult} from '../../results/results';
import Paging from '../../Paging';

import helpers from '../../../utils/helpers';

class ZippedContent extends React.Component{
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
      helpers.getZippedContent(this.state.current)
        .then((results)=>{
          this.setState({
            page: 0,
            loading: false,
            results,
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
      return <ZippedContentResult 
                className="row"
                key={gallery.id}
                webmaster={this.props.webmaster}
                gallery={gallery} />
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
      <section className="content page-container">
        <header>
          <h1>Zipped Content</h1>
        </header>
        <div className="content-inner">
          <div className="configuration">
            <SiteSelector 
              id="sites"
              title="Choose Site:"
              onChange={this.handleChange.bind(this)}
              value={this.state.current.sites}
              options={this.props.sites}
              niches={this.props.niches} />
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
      </section>
    );
  }
}

export default ZippedContent;