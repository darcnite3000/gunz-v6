import React from 'react';
import _ from 'lodash';
import helpers from '../../utils/helpers';
import LinkBox from './LinkBox';

class TubeResult extends React.Component{
  createLink(id,siteId){
    var webmaster = this.props.webmaster.id;
    var program = helpers.isRevshareOnly(siteId) ? 2 : this.props.program;
    var campaign = this.props.campaign || 0;
    return `http://gunzblazing.com/gallhit.php?${webmaster},${id},${siteId},${program},0,${campaign},1`;
  }
  createTrailerLink(){
    var webmaster = this.props.webmaster.id;
    var program = helpers.isRevshareOnly(this.props.gallery.paysite.id) ? 2 : this.props.program;
    var campaign = this.props.campaign || 0;
    return `http://www.gunzblazingpromo.com/trailers/player.php?w=${webmaster}&p=${program}&c=${campaign}&m=${this.props.gallery.id}&tube=1`;
  }
  generateBlogCode(trailerUrl,gals){
    var movieId = gals.first().value().id;
    var link = this.createLink(movieId, this.props.gallery.paysite.id);
    var iframe = `<iframe class="plyr_${this.props.gallery.id}" width="${this.props.blog.width}" height="${this.props.blog.height}" src="${trailerUrl}" frameborder="0" allowfullscreen></iframe>`;
    var divDesc = `<div class="plyr_${this.props.gallery.id}_desc">${this.props.gallery.description}<a href="${link}" target="_blank">CLICK HERE</a></div>`;
    var title = `<div class="plyr_${this.props.gallery.id}_title">${this.props.gallery.title}</div>`;
    var topDesc = this.props.blog.descPos == 'top' ? divDesc : '';
    var bottomDesc = this.props.blog.descPos == 'bottom' ? divDesc : '';
    return `${title}${topDesc}${iframe}${bottomDesc}`;
  }
  render(){
    var klass = `result-gallery ${this.props.className}`;
    var trailerUrl = this.createTrailerLink();
    var cGals = _.chain(this.props.gallery.gals).filter({type: 'tube'});
    var blogCode = this.generateBlogCode(trailerUrl,cGals);
    var gals = cGals.map((gal)=>{
      var link = this.createLink(gal.id,this.props.gallery.paysite.id);
      return <LinkBox key={gal.type} link={link} {...gal} />;
    }).value();
    return (
      <div className={klass}>
        <div className="paysite">{this.props.gallery.paysite.name}</div>
        <div className="date">{helpers.formatDate(this.props.gallery.timestamp,'MMMM Do YYYY')}</div>
        <div className="title">{this.props.gallery.title}</div>
        <img className="image" src={this.props.gallery.imgUrl} alt={this.props.gallery.title} />
        <div className="description">{this.props.gallery.description}</div>
        {gals}
        <textarea value={blogCode} readOnly={true} />
        <LinkBox link={trailerUrl} title="Trailer URL" />
      </div>
    );
  }
}
TubeResult.propTypes = {
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
  blog: React.PropTypes.shape({
    width: React.PropTypes.string,
    height: React.PropTypes.string,
  }),
};

export default TubeResult;