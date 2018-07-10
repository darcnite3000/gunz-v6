import axios from 'axios';
import moment from 'moment';

if (!Object.is) {
  Object.is = function(x, y) {
    if (x === y) {
      return x !== 0 || 1 / x === 1 / y;
    } else {
      return x !== x && y !== y;
    }
  };
}

const URLS = {
  sites: '/v6/data/siteListing.php',
  accountOptions: '/v6/data/accountOptions.php',
  shortLink: 'http://gunzb.com/generate.json',
  blog: '/v6/data/newsListing.php',
  hostedGallery: '/v6/data/hostedGalleries.php',
  tubeGallery: '/v6/data/tubeGalleries.php',
  zippedContent: '/v6/data/zippedContent.php',
  generalBanners: '/v6/data/generalBanners.php',
  bannerSizes: '/v6/data/bannerSizes.php',
  videoBannerTagLines: '/v6/data/videoBannerTaglines.php',
  videoBannerPacks: '/v6/data/videoBannerPacks.php',
  videoBanners: '/v6/data/videoBanners.php',
}

function validateEmail(email) {
  var re = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i;
  return re.test(email);
}

function generateShortLink(url,id){
  return axios.get(URLS.shortLink,{
    data: {id,url}
  }).then((response)=> response.data).catch((response)=> response.data)
}

function loadSites(){
  return axios.get(URLS.sites).then((response)=>{
    return response.data;
  }).catch((response)=>{
    return {
      niches: [],
      sites: []
    };
  })
}

function loadAccountOptions(){
  return axios.get(URLS.accountOptions).then((response)=>{
    return response.data;
  }).catch((response)=>{
    return {
      states: [],
      countries: [],
      minpayout: [],
    };
  })
}

function loadNews(){
  return axios.get(URLS.blog).then((response)=>{
    return response.data.posts;
  })
}


function getZippedContent(options){
  return axios.post(URLS.zippedContent, {
      data: options,
    })
    .then((response)=> response.data);
}

function getHostedGalleries(options){
  return axios.post(URLS.hostedGallery, {
      data: options,
    })
    .then((response)=> response.data)
}

function getTubeGalleries(options){
  return axios.post(URLS.tubeGallery, {
      data: options,
    })
    .then((response)=> response.data)
}

function getGeneralBanners(options){
  return axios.post(URLS.generalBanners, {
      data: options,
    })
    .then((response)=> response.data)
}


function getGeneralBannerSizes(options){
  return axios.post(URLS.bannerSizes, {
        data: options,
      })
      .then((response)=> response.data)
      .catch(()=> {sizes: []})
}

function getVideoBanners(options){
  return axios.post(URLS.videoBanners, {
    data: options
  })
  .then((response)=> response.data);
}

function getVideoBannerTagLines(options){
  return axios.post(URLS.videoBannerTagLines, {
    data: options,
  })
  .then((response)=> response.data)
  .catch(()=> {tagLines: []})
}

function getVideoBannerPacks(options){
  return axios.post(URLS.videoBannerPacks, {
    data: options,
  })
  .then((response)=> response.data)
  .catch(()=> {packs: []})
}

function isRevshareOnly(id){
  return (id == 10 || id == 13 || id == 90);
}

function formatDate(timestamp, format){
  return moment.unix(timestamp).format(format);
}

var programs = [
  {id: 1, display: 'Per-Signup'},
  {id: 2, display: 'Revshare'},
];

var galleryTypes = [
  {id: 1, display: 'Movie Gallery'},
  {id: 2, display: 'Pic Gallery'},
  {id: 3, display: 'Tube Gallery'},
];
var bannerTypes = [
  {id: 6, display: 'Collage Image'},
  {id: 2, display: 'Flash'},
  {id: 4, display: 'FPA'},
  {id: 1, display: 'Image'},
];

export default {
  generateShortLink,
  isRevshareOnly,
  loadNews,
  loadSites,
  loadAccountOptions,
  validateEmail,
  getHostedGalleries,
  getTubeGalleries,
  getZippedContent,
  getGeneralBanners,
  getGeneralBannerSizes,
  getVideoBanners,
  getVideoBannerTagLines,
  getVideoBannerPacks,
  formatDate,
  programs,
  galleryTypes,
  bannerTypes,
};