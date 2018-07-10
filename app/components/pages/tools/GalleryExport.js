import React from 'react';
import _ from 'lodash';
import {
  SelectSelector,
  SiteSelector,
  FullInputSelector,
  InputSelector,
  MultiFieldSelector,
} from '../../selectors/selectors';
import {LinkBox} from '../../results/results';

import helpers from '../../../utils/helpers';

var galTypes = [
  {id: 1, display: 'Movie Gallery'},
  {id: 2, display: 'Pic Gallery'},
  {id: 3, display: 'Tube Gallery'},
];
var galFields = [
  {
    id: 'GalLink',
    display: 'Gallery link',
    example: 'http://gunzblazing.com/gallhit.php?%W%,1095420397,17,%P%,0,%C%,6',
  },
  {
    id: 'GalUrl',
    display: 'Gallery URL',
    example: 'http://galleries.bangbangboys.com/150626_bbb_junior_peixoto_barebangs_tony_d/',
  },
  {
    id: 'GalImgFolder',
    display: 'Gallery ImageFolder',
    example: 'http://galleries.bangbangboys.com/150626_bbb_junior_peixoto_barebangs_tony_d/images/',
  },
  {
    id: 'GalThumbUrl',
    display: 'Gallery Thumb URL',
    example: 'http://galleries.bangbangboys.com/150626_bbb_junior_peixoto_barebangs_tony_d/images/tn_01.jpg',
  },
  {
    id: 'PaysiteName',
    display: 'Paysite Name',
    example: 'Bang Bang Boys',
  },
  {
    id: 'PaysiteDomain',
    display: 'Paysite Domain',
    example: 'bangbangboys.com',
  },
  {
    id: 'PaysiteUrl',
    display: 'Paysite URL',
    example: 'http://bangbangboys.com',
  },
  {
    id: 'Title',
    display: 'Title',
    example: 'Junior Peixoto BareBangs Tony D',
  },
  {
    id: 'PackID',
    display: 'PackID',
    example: '150626_bbb_junior_peixoto_barebangs_tony_d',
  },
  {
    id: 'Desc',
    display: 'Description',
    example: 'Junior and Tony are kissing in bed - their hands wandering all over each other\'s bodies.   Tony takes Junior\'s cock ...',
  },
  {
    id: 'PackDate',
    display: 'Pack Date',
    example: '2015-06-26 00:00:00',
  },
  {
    id: 'Category',
    display: 'Category',
    example: 'Misc',
  },
  {
    id: 'Tags',
    display: 'Tags',
    example: 'kissing, bed, Latin, tattoos, smooth, oral, rimming, bareback, fucking, cum shot, cum facial, Bang Bang Boys',
  },
  {
    id: 'Models',
    display: 'Models',
    example: 'Junior Peixoto BareBangs Tony D',
  },
];

var programs = [
  {id: 1, display: 'Per-Signup'},
  {id: 2, display: 'Revshare'},
];

var separators = [
  {id: '|', display: 'Pipe Separated \'|\''},
  {id: ',', display: 'Comma Separated \',\''},
]

class GalleryExport extends React.Component{
  componentWillReceiveProps(props){
  }
  constructor(props){
    super(props);
    this.state = {
      current: {
        sites: [],
        campaign: null,
        program: 1,
        type: helpers.galleryTypes[0].id,
        modelSearch: null,
        descSearch: null,
        startDate: null,
        endDate: null,
        fields: [],
        separator: separators[0].id,
        limit: null,
        descLimit: null,
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
  generateExample(){
    return _.chain(this.state.current.fields)
      .pluck('example')
      .filter()
      .map((example)=>{
        return example
          .replace(/%W%/g,this.props.webmaster.id)
          .replace(/%P%/g,this.state.current.program)
          .replace(/%C%/g,this.state.current.campaign)
      })
      .value().join(this.state.current.separator);
  }
  generateLink(){
    var webmaster = this.props.webmaster.id;
    var sites = this.state.current.sites.join(':');
    var descSearch = this.state.current.descSearch || '';
    var modelSearch = this.state.current.modelSearch || '';
    var program = this.state.current.program;
    var campaign = this.state.current.campaign || '';
    var type = this.state.current.type;
    var packList = '';
    var separator = this.state.current.separator;
    var limit = this.state.current.limit || '';
    var descLimit = this.state.current.descLimit || '';
    var startDate = this.state.current.startDate || '';
    var endDate = this.state.current.endDate || '';
    var fields = _.chain(this.state.current.fields)
      .pluck('id')
      .filter()
      .value()
      .join('&fieldset[]=');
    fields = (fields=='')?'':`&fieldset[]=${fields}`;
    return `http://gunzblazingpromo.com/tubes/csvdump_galls.php?webmasterID=${webmaster}&selectedSites=${sites}&description_search=${descSearch}&model_selection=${modelSearch}&selectedProgram=${program}&selectedCampaign=${campaign}&galleryType=${type}&pack_list=${packList}&niche=3&separator=${separator}&limit=${limit}&length=${descLimit}&start_date=${startDate}&end_date=${endDate}${fields}`;
  }
  render(){
    var example = this.generateExample();
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
            options={programs} />
          <SelectSelector
            id="campaign"
            title="Choose Campaign:"
            onChange={this.handleChange.bind(this)}
            value={this.state.current.campaign}
            none="No Campaign"
            options={this.props.campaigns} />
          <SelectSelector
            id="type"
            title="Choose Type:"
            onChange={this.handleChange.bind(this)}
            value={this.state.current.type}
            options={helpers.galleryTypes} />
          <InputSelector 
            id="descSearch"
            title="Search Description (optional):"
            onChange={this.handleChange.bind(this)}
            value={this.state.current.descSearch} />
          <SelectSelector
            id="separator"
            title="Choose Separator:"
            onChange={this.handleChange.bind(this)}
            value={this.state.current.separator}
            options={separators} />
          <InputSelector 
            id="limit"
            title="Limit Number of Results:"
            onChange={this.handleChange.bind(this)}
            value={this.state.current.limit} />
          <InputSelector 
            id="descLimit"
            title="Description Length:"
            description="in characters"
            onChange={this.handleChange.bind(this)}
            value={this.state.current.descLimit} />
          <InputSelector 
            id="startDate"
            title="Start Date:"
            onChange={this.handleChange.bind(this)}
            value={this.state.current.startDate} />
          <InputSelector 
            id="endDate"
            title="End Date:"
            onChange={this.handleChange.bind(this)}
            value={this.state.current.endDate} />
          <MultiFieldSelector 
            id="fields"
            title="Output Fields:"
            none="None"
            options={galFields}
            onChange={this.handleChange.bind(this)}
            value={this.state.current.fields} />
        </div>
        {
          example && 
          <div className="results">
            <div>
              <span className="title">Example Output:</span>
              <textarea readOnly={true} value={this.generateExample()} />
            </div>
            <LinkBox 
              title="Export Link:"
              link={this.generateLink()}
              download={true}
              visit="Download" />
          </div>
        }
      </div>
    );
  }
}

export default GalleryExport;