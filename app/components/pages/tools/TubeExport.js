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

var tubeFields = [
  {
    id: 'TubeLink',
    display: 'Tube Referral link',
    example: 'http://gunzblazing.com/gallhit.php?%W%,1095420398,17,%P%,0,%C%,6',
  },
  {
    id: 'TubeUrl',
    display: 'Tube Gallery URL',
    example: 'http://galleries.bangbangboys.com/va/150626_bbb_junior_peixoto_barebangs_tony_d/',
  },
  {
    id: 'TubeImageFolderUrl',
    display: 'Tube ImageFolder URL',
    example: 'http://galleries.bangbangboys.com/va/150626_bbb_junior_peixoto_barebangs_tony_d/images/',
  },
  {
    id: 'TubeThumbUrl',
    display: 'Thumbnail URL',
    example: 'http://galleries.bangbangboys.com/va/150626_bbb_junior_peixoto_barebangs_tony_d/images/tn_01.jpg',
  },
  {
    id: 'TubeFlv',
    display: 'Tube Video URL',
    example: 'http://galleries.bangbangboys.com/va/150626_bbb_junior_peixoto_barebangs_tony_d/150626_bbb_junior_peixoto_barebangs_tony_d.mp4',
  },
  {
    id: 'TubeFlvFile',
    display: 'Tube Video File',
    example: '150626_bbb_junior_peixoto_barebangs_tony_d.mp4',
  },
  {
    id: 'ThumbList',
    display: 'Thumbnail List',
    example: 'tn_01.jpg,tn_02.jpg,tn_03.jpg',
  },
  {
    id: 'TubeWidth',
    display: 'Tube Width',
    example: '480',
  },
  {
    id: 'TubeHeight',
    display: 'Tube Height',
    example: '360',
  },
  {
    id: 'TubeEmbed',
    display: 'Tube Embed Code',
    example: "<object classid='clsid:d27cdb6e-ae6d-11cf-96b8-444553540000' codebase='https://fpdownload.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=9,0,0,0' width=480 height=380 align='middle'><param name='movie' value='http://www.gunzblazingpromo.com/trailers/player.swf?file=http%3A%2F%2Fgalleries.bangbangboys.com%2Fva%2F150626_bbb_junior_peixoto_barebangs_tony_d%2F150626_bbb_junior_peixoto_barebangs_tony_d.mp4&displayclick=link&icons=false&link=http%3A%2F%2Fgunzblazing.com%2Fhit.php%3Fw%3D%W%%26s%3D17%26p%3D%P%%26c%3D%C%%26tool%3D8&image=http%3A%2F%2Fgalleries.bangbangboys.com%2Fva%2F150626_bbb_junior_peixoto_barebangs_tony_d%2Fimages%2Ftn_01.jpg&playlist=none'></param><param name='allowScriptAccess' value='always'></param><param name='allowfullscreen' value='true'></param><param name='wmode' value='opaque'></param><param name='quality' value='high'></param><param name='bgcolor' value='#000000'></param><embed src='http://www.gunzblazingpromo.com/trailers/player.swf?file=http%3A%2F%2Fgalleries.bangbangboys.com%2Fva%2F150626_bbb_junior_peixoto_barebangs_tony_d%2F150626_bbb_junior_peixoto_barebangs_tony_d.mp4&displayclick=link&icons=false&link=http%3A%2F%2Fgunzblazing.com%2Fhit.php%3Fw%%W%%26s%3D17%26p%3D%P%%26c%3D%C%%26tool%3D8&image=http%3A%2F%2Fgalleries.bangbangboys.com%2Fva%2F150626_bbb_junior_peixoto_barebangs_tony_d%2Fimages%2Ftn_01.jpg&playlist=none' quality='high' bgcolor='#000000' width=480 height=380 align='middle' allowScriptAccess='always' wmode='opaque' allowFullScreen='true' type='application/x-shockwave-flash' pluginspage='http://www.macromedia.com/go/getflashplayer'></embed></object>",
  },
  {
    id: 'TubeDuration',
    display: 'Tube Length',
    example: '120',
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
var rejectDisplay = ['TubeFlvFile','TubeWidth','TubeHeight','ThumbList'];
var displayFields = _.reject(tubeFields, (field)=> _.includes(rejectDisplay, field.id));

var quickSelects = [
  {
    id: null,
    display: 'Custom',
    settings: {},
  },
  {
    id: 'texpnubiles',
    display: 'Nubiles',
    settings: {
      fields: [
        _.find(tubeFields,{id: 'TubeUrl'}),
        _.find(tubeFields,{id: 'TubeFlvFile'}),
        _.find(tubeFields,{id: 'TubeImageFolderUrl'}),
        _.find(tubeFields,{id: 'ThumbList'}),
        _.find(tubeFields,{id: 'Desc'}),
        _.find(tubeFields,{id: 'Tags'}),
        _.find(tubeFields,{id: 'TubeDuration'}),
        _.find(tubeFields,{id: 'TubeWidth'}),
        _.find(tubeFields,{id: 'TubeHeight'}),
      ],
      separator: '|',
    }
  },
  {
    id: 'mechbunny',
    display: 'MechBunny',
    settings: {
      fields: [
        _.find(tubeFields,{id: 'TubeFlv'}),
        _.find(tubeFields,{id: 'Title'}),
        _.find(tubeFields,{id: 'Desc'}),
        _.find(tubeFields,{id: 'Tags'}),
        _.find(tubeFields,{id: 'PaysiteName'}),
      ],
      separator: '|',
    }
  },
  {
    id: 'tevs',
    display: 'TEVS',
    settings: {
      fields: [
        _.find(tubeFields,{id: 'TubeFlv'}),
        _.find(tubeFields,{id: 'TubeThumbUrl'}),
        _.find(tubeFields,{id: 'Desc'}),
        _.find(tubeFields,{id: 'Title'}),
      ],
      separator: '|',
    }
  },
  {
    id: 'tubeace',
    display: 'TubeAce',
    settings: {
      fields: [
        _.find(tubeFields,{id: 'PaysiteName'}),
        _.find(tubeFields,{id: 'TubeFlv'}),
        _.find(tubeFields,{id: 'TubeThumbUrl'}),
        _.find(tubeFields,{id: 'Title'}),
        _.find(tubeFields,{id: 'Desc'}),
      ],
      separator: '|',
    }
  },

];

var separators = [
  {id: '|', display: 'Pipe Separated \'|\''},
  {id: ',', display: 'Comma Separated \',\''},
]

class TubeExport extends React.Component{
  componentWillReceiveProps(props){
  }
  constructor(props){
    super(props);
    this.state = {
      quickSelect: null,
      current: {
        sites: [],
        campaign: null,
        program: 1,
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
  handleQuickSelect(select){
    if(select.id != this.state.quickSelect){
      var current = this.state.current;
      _.assign(current, select.settings);
      this.setState({current, quickSelect: select.id});
    }
  }
  generateSTXTLink(){
    var webmaster = this.props.webmaster.id;
    var sites = this.state.current.sites.join(':');
    var descSearch = this.state.current.descSearch || '';
    var modelSearch = this.state.current.modelSearch || '';
    var program = this.state.current.program;
    var campaign = this.state.current.campaign || '';
    var packList = '';
    var separator = this.state.current.separator;
    var limit = this.state.current.limit || '';
    var descLimit = this.state.current.descLimit || '';
    var startDate = this.state.current.startDate || '';
    var endDate = this.state.current.endDate || '';
    return `http://gunzblazingpromo.com/tubes/stxt.php?t=flv&selectedSites=${sites}&ProgramID=${program}&CampaignID=${campaign}&selectedModels=${modelSearch}&SDescription=${descSearch}`;
  }
  generateLink(){
    var webmaster = this.props.webmaster.id;
    var sites = this.state.current.sites.join(':');
    var descSearch = this.state.current.descSearch || '';
    var modelSearch = this.state.current.modelSearch || '';
    var program = this.state.current.program;
    var campaign = this.state.current.campaign || '';
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
    return `http://gunzblazingpromo.com/tubes/csvdump.php?webmasterID=${webmaster}&selectedSites=${sites}&description_search=${descSearch}&model_selection=${modelSearch}&selectedProgram=${program}&selectedCampaign=${campaign}&pack_list=${packList}&niche=3&separator=${separator}&limit=${limit}&length=${descLimit}&start_date=${startDate}&end_date=${endDate}${fields}`;
  }
  render(){
    var example = this.generateExample();
    var quickSelectsButtons = quickSelects.map((select)=>{
      var isChecked = select.id == this.state.quickSelect;
      var klass = `qsbutton ${isChecked?'active':''}`;
      return (
        <button key={select.id} className={klass} onClick={this.handleQuickSelect.bind(this,select)}>{select.display}</button>
      );
    })
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
            value={this.state.current.campaign}
            none="No Campaign"
            options={this.props.campaigns} />
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
          {quickSelectsButtons}
          {
            !this.state.quickSelect && 
            <MultiFieldSelector 
              id="fields"
              title="Output Fields:"
              none="None"
              options={displayFields}
              onChange={this.handleChange.bind(this)}
              value={this.state.current.fields} />
          }
        </div>
        {
          example && 
          <div className="results">
            <div>
              <span className="title">Example Output:</span>
              <textarea value={this.generateExample()} />
            </div>
            <LinkBox 
              title="Export Link:"
              link={this.generateLink()}
              download={true}
              visit="Download" />
          </div>
        }
        <LinkBox
          title="STXT/XML Feed:"
          link={this.generateSTXTLink()}
          download={true}
          visit="Download" />
      </div>
    );
  }
}

export default TubeExport;