import React from 'react';

class Paging extends React.Component{
  handlePaging(page,event){
    if(event) event.preventDefault();
    this.props.change(page);
  }
  priorPaging(page,first){
    var prior = page - 1;
    return (
      <span>
        <button className="paging-link" onClick={this.handlePaging.bind(this,first)}>&laquo;</button>
        <button className="paging-link" onClick={this.handlePaging.bind(this,prior)}>&lsaquo;</button>
      </span>
    );
  }
  nextPaging(page,last){
    var next = page + 1;
    return (
      <span>
        <button className="paging-link" onClick={this.handlePaging.bind(this,next)}>&rsaquo;</button>
        <button className="paging-link" onClick={this.handlePaging.bind(this,last)}>&raquo;</button>
      </span>
    );
  }
  pageGroup(page,first,last){
    var pageGroup = [];
    var pageGroupStart = (page - 3 <= first)? first : page - 3;
    var pageGroupEnd = (page + 3 >= last)? last : page + 3;
    if(pageGroupStart!=0)
      pageGroup.push(<span className="paging-spacer" key="before">&hellip;</span>);
    for (var i = pageGroupStart; i <= pageGroupEnd; i++){
      var klass = `paging-link ${(i == page)?'active':''}`
      pageGroup.push(
        <button 
          key={i}
          className={klass}
          onClick={this.handlePaging.bind(this,i)}
          >{`[${i+1}]`}</button>
      )
    }
    if(pageGroupEnd!=(last))
      pageGroup.push(<span className="paging-spacer" key="after">&hellip;</span>);

    return pageGroup;
  }
  render(){
    if(!this.props.total) return <div className="paging"></div>;

    var totalPages = (this.props.total > 0)? Math.ceil(this.props.total / this.props.perPage) : 0;
    var firstPage = 0;
    var lastPage = totalPages - 1;
    // console.log(totalPages,firstPage,lastPage);

    return (
      <div className="paging">
        {this.props.page!=firstPage && this.priorPaging(this.props.page,firstPage)}
        {this.pageGroup(this.props.page,firstPage,lastPage)}
        {this.props.page!=lastPage && this.nextPaging(this.props.page,lastPage)}
      </div>
    );
  }
}
Paging.propTypes = {
  page: React.PropTypes.number.isRequired,
  total: React.PropTypes.number.isRequired,
  perPage: React.PropTypes.number.isRequired,
  change: React.PropTypes.func.isRequired,
};

export default Paging;