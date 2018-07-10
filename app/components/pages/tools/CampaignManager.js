import React from 'react';
import {
  FullInputSelector,
} from '../../selectors/selectors';
import {CampaignRow} from '../../results/results';
import {RouteHandler, Link} from 'react-router';

class CampaignManager extends React.Component{
  componentDidMount(){
    this.props.reloadCampaigns();
  }
  constructor(props){
    super(props);
    this.state = {
      title: null,
      busy: false,
    }
  }
  handleTitle(event){
    var title = event.target.value;
    if(this.state.title!=title && /^([A-Z0-9\_]*)$/i.test(title)){
      this.setState({title})
    }
  }
  addCampaign(event){
    if(event) event.preventDefault();
    if(this.state.title && !this.state.busy){
      this.setState({busy:true}, ()=>{
        return this.props.addCampaign(this.state.title).then((updated)=>{
          if(updated){
            this.setState({
              busy: false,
              title: null
            });
          }else{
            this.setState({
              busy: false
            });
          }
        });
      });
    }
  }
  updatedCampaign(campaign){
    if(campaign.id && campaign.title && !this.state.busy){
      this.setState({busy: true}, ()=>{
        return this.props.updateCampaign(campaign).then((updated)=>{
          this.setState({busy: false});
        })
      });
    }
  }
  render(){
    var campaigns = this.props.campaigns.map((campaign)=>{
      return <CampaignRow 
                className="row"
                key={campaign.id} 
                {...campaign}
                disabled={this.state.busy}
                update={this.props.updateCampaign} />;
    })
    return (
      <section className="content page-container">
        <header>
          <h1>Campaign Manager</h1>
        </header>
        <div className="content-inner">
          <form onSubmit={this.addCampaign.bind(this)} className="configuration">
            <FullInputSelector
              id="title"
              title="Add a New Campaign"
              description="Use alphanumeric and underscore (_) characters only."
              value={this.state.title}
              onChange={this.handleTitle.bind(this)} />
            <button className="btn btn-dark" disabled={this.state.busy}>Submit</button>
          </form>
          <div className="results">
            <h3>Campaigns</h3>
            <div className="striped-rows">
              {campaigns}
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default CampaignManager;