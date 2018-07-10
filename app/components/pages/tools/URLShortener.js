import React from 'react';
import _ from 'lodash';
import {Link} from 'react-router';
import {
  SelectSelector,
  FullInputSelector,
} from '../../selectors/selectors';
import {LinkBox} from '../../results/results';
import helpers from '../../../utils/helpers';

class URLShortener extends React.Component{
  componentWillReceiveProps(props){
  }
  constructor(props){
    super(props);
    this.state = {
      current: {
        id: null,
        page: null,
      },
      link: null,
      error: null,
    }
  }
  handleCustom(event){
    var current = this.state.current;
    var id = event.target.value;
    if(current.id!=id && /^([A-Z0-9\_]*)$/i.test(id)){
      current.id=id;
      this.setState({current});
    }
  }
  handleChange(event){
    var current = this.state.current;
    var target = event.target;
    if(current[target.id]!=target.value){
      current[target.id]=target.value;
      this.setState({current});
    }
  }
  generateLink(event){
    if(event) event.preventDefault();
    if(this.state.current.page){
      helpers.generateShortLink(
        this.state.current.page,
        this.state.current.id
      ).then(({error,link})=>{
        this.setState({error,link});
      })
    }
  }
  render(){
    return (
      <div className="content-inner">
        <form onSubmit={this.generateLink.bind(this)} className="configuration">
          <p>
            The URLShotener tool allows you to create a shortened link from any url you give us. This is beneficial for use on social sites like twitter where the amount of text you are allowed to use is limited.
          </p>
          <p>
            Please note that this tool <strong>does not</strong> append your webmaster id to your link, it is suggested that you use the <Link to="linking-code">linking code generator</Link> for that, and then use this tool to shorten that link.
          </p>
          <FullInputSelector
            id="page"
            title="Enter a specific page you want to link to"
            description="Paste the URL of the paysite page you want to link to here:"
            value={this.state.current.page}
            onChange={this.handleChange.bind(this)} />
          <FullInputSelector
            id="id"
            title="Optional - Enter a custom link id:"
            description="Enter a string you want to use for your link (e.g. MyLink, would create http://gunzb.com/MyLink)"
            value={this.state.current.id}
            onChange={this.handleCustom.bind(this)} />
          <button className="btn btn-dark">Submit</button>
        </form>
        <div className="results">
          {this.state.error && <div className="error-result">{this.state.error}</div>}
          {this.state.link && <LinkBox title="Generated Link Code" link={this.state.link} />}
        </div>
      </div>
    );
  }
}

export default URLShortener;