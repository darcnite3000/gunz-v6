import React from 'react';
import helpers from '../../utils/helpers';
import LinkBox from './LinkBox';

class ZippedContentResult extends React.Component{
  render(){
    var klass = `result-gallery ${this.props.className}`;
    return (
      <div className={klass}>
        <div className="paysite">{this.props.gallery.paysite.name}</div>
        <div className="date">{helpers.formatDate(this.props.gallery.timestamp,'MMMM Do YYYY')}</div>
        <div className="title">{this.props.gallery.title}</div>
        <img className="image" src={this.props.gallery.imgUrl} alt={this.props.gallery.title} />
        {this.props.gallery.extraImgs.map((img,index)=>{
          return <img key={index} className="image" src={img} alt={this.props.gallery.title} />
        })}
        <div className="description">{this.props.gallery.description}</div>
        {this.props.gallery.zips.map((zip)=>{
          return <a href={zip.zip} download={true} key={zip.type} >{zip.title}</a>;
        })}
      </div>
    );
  }
}
ZippedContentResult.propTypes = {
  gallery: React.PropTypes.shape({
    paysite: React.PropTypes.shape({
      id: React.PropTypes.string,
      name: React.PropTypes.string,
    }),
    timestamp: React.PropTypes.number,
    title: React.PropTypes.string,
    imgUrl: React.PropTypes.string,
    extraImgs: React.PropTypes.arrayOf(React.PropTypes.string),
    description: React.PropTypes.string,
    zips: React.PropTypes.arrayOf(React.PropTypes.shape({
      zip: React.PropTypes.string,
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

export default ZippedContentResult;