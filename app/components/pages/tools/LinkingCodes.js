import React from 'react';
import _ from 'lodash';
import {
  SelectSelector,
  FullInputSelector,
} from '../../selectors/selectors';
import {LinkBox} from '../../results/results';

import helpers from '../../../utils/helpers';

class LinkingCodes extends React.Component{
  componentWillReceiveProps(props){
    if(!this.state.site && props.sites.length > 0){
      var current = this.state.current;
      current.site = props.sites[0].id;
      this.setState({current});
    }
  }
  constructor(props){
    super(props);
    this.state = {
      current: {
        site: (props.sites[0])? props.sites[0].id : null,
        campaign: null,
        program: 1,
        exit: 0,
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
  generatedLinkCode(){
    var campaign = (this.state.current.campaign)? this.state.current.campaign : '';
    var page = (this.state.current.page) ? 
      `&page=${encodeURIComponent(this.state.current.page)}` : '';
    return `http://gunzblazing.com/hit.php?w=${this.props.webmaster.id}&s=${this.state.current.site}&p=${this.state.current.program}&c=${campaign}&cs=${this.state.current.exit}&tool=7${page}`
  }
  render(){
    var refLink = `http://www.gunzblazing.com/ref.php?w=${this.props.webmaster.id}`;
    return (
      <div className="content-inner">
        <div className="configuration">
          <SelectSelector 
            id="site"
            title="Choose Site:"
            onChange={this.handleChange.bind(this)}
            value={this.state.current.site}
            options={this.props.sites} />
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
          <SelectSelector
            id="exit"
            title="Show Exit Console:"
            onChange={this.handleChange.bind(this)}
            value={this.state.current.exit}
            options={[{id: 0, display: 'Yes'},{id: 1, display: 'No'}]} />
          <FullInputSelector
            id="page"
            title="Optional - Enter a specific page you want to link to"
            description="Paste the URL of the paysite page you want to link to here:"
            value={this.state.current.page}
            onChange={this.handleChange.bind(this)} />
        </div>
        <div className="results">
          {
            this.state.current.site  && 
            <LinkBox title="Generated Link Code" link={this.generatedLinkCode()} />
          }
          <LinkBox title="Webmaster referral (Two tier program)" link={refLink} />
        </div>
      </div>
    );
  }
}

export default LinkingCodes;