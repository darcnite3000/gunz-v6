import React from 'react';
import helpers from '../../utils/helpers';
import LinkBox from './LinkBox';

class GalleryResult extends React.Component{
  canShowType(gal){
    // console.log(gal,this.props.typeFilter);
    switch(parseInt(this.props.typeFilter,10)){
      case 0: return true;
      case 1: return gal.type == 'movie';
      case 2: return gal.type == 'pic';
      case 3: return gal.type == 'tube';
    }
    return false;
  }
  createLink(id,siteId){
    var webmaster = this.props.webmaster.id;
    var program = helpers.isRevshareOnly(siteId) ? 2 : this.props.program;
    var campaign = this.props.campaign || 0;
    return `http://gunzblazing.com/gallhit.php?${webmaster},${id},${siteId},${program},0,${campaign},1`;
  }
  render(){
    var klass = `result-gallery ${this.props.className}`;
    var gals = this.props.gallery.gals.filter(this.canShowType.bind(this)).map((gal)=>{
      var link = this.createLink(gal.id,this.props.gallery.paysite.id);
      return <LinkBox key={gal.type} link={link} {...gal} />;
    });
    return (
      <div className={klass}>
        <div className="paysite">{this.props.gallery.paysite.name}</div>
        <div className="date">{helpers.formatDate(this.props.gallery.timestamp,'MMMM Do YYYY')}</div>
        <div className="title">{this.props.gallery.title}</div>
        <img className="image" src={this.props.gallery.imgUrl} alt={this.props.gallery.title} />
        <div className="description">{this.props.gallery.description}</div>
        {gals}
      </div>
    );
  }
}
GalleryResult.propTypes = {
  gallery: React.PropTypes.shape({
    paysite: React.PropTypes.shape({
      id: React.PropTypes.string,
      name: React.PropTypes.string,
    }),
    timestamp: React.PropTypes.number,
    title: React.PropTypes.string,
    imgUrl: React.PropTypes.string,
    description: React.PropTypes.string,
    gals: React.PropTypes.arrayOf(React.PropTypes.shape({
      id: React.PropTypes.string,
      type: React.PropTypes.string,
      title: React.PropTypes.string,
    })),
  }).isRequired,
  webmaster: React.PropTypes.shape({
    id: React.PropTypes.string
  }).isRequired,
  campaign: React.PropTypes.number,
  program: React.PropTypes.number,
  className: React.PropTypes.string,
};

export default GalleryResult;