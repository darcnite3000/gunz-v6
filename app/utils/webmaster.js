import axios from 'axios';
import datastore from './datastore';

const URLS = {
  login: '/v6/login.php',
  logout: '/v6/webmasters.php',
  account: '/v6/data/account.php',
  campaign: '/v6/data/campaigns.php',
}

function remember(forget=false){
  return new Promise((resolve,reject)=>{
    var webmaster = datastore.get('webmaster');
    if(!forget && webmaster){
      resolve(webmaster);
    }else{
      var setWebmaster = (webmaster)=>{
        datastore.set(
          'webmaster',
          webmaster,
          datastore.expiresIn.secondsFromNow(60)
        );
        resolve(webmaster);
      }
      axios.post(URLS.login).then((response)=>{
        webmaster = {
          id: response.data.webmasterId,
          username: response.data.username
        };
        setWebmaster(webmaster);
      }).catch((response)=>{
        setWebmaster({id: null, username: null});
      });
    }
  });
}

function login(username,password){
  return axios.post(URLS.login,{
    data: {
      wm_username: username,
      wm_password: password
    }
  }).then((response)=>{
    var webmaster = {
      id: response.data.webmasterId,
      username: response.data.username
    };
    datastore.set(
      'webmaster',
      webmaster,
      datastore.expiresIn.secondsFromNow(60));
    return webmaster;
  });
}

function logout(username){
  return axios.post(URLS.logout,{
    data: {
      wm_username: this.username
    }
  }).then((response)=>{
    datastore.clear('webmaster');
    return {id: null, username: null};
  })
}

function loadAccount(){
  return axios.get(URLS.account).then((response)=>{
    return response.data;
  }).catch((response)=>{
    return {
      updated: false,
      account: {}
    };
  })
}

function updateAccount(account){
  return axios.post(URLS.account, {
    data: account
  }).then((response)=>{
    return response.data;
  }).catch((response)=>{
    return {
      updated: false,
      account: {}
    };
  })
}

function loadCampaigns(){
  return axios.get(URLS.campaign).then((response)=>{
    return response.data.campaigns;
  }).catch((response)=>{
    return [];
  })
}
function addCampaign(title){
  return axios.post(URLS.campaign,{
    data: {
      title
    }
  })
  .then((response)=>{
    return response.data;
  })
  .catch((response)=>{
    return {
      updated: false,
      campaigns: []
    }
  })
}
function updateCampaign(campaign){
  return axios.post(URLS.campaign,{
    data: campaign
  })
  .then((response)=>{
    return response.data;
  })
  .catch((response)=>{
    return {
      updated: false,
      campaigns: []
    }
  })
}

export default {
  isLoggedIn: ()=>{
    return remember().then((webmaster)=> !!webmaster.id);
  },
  remember,
  login,
  logout,
  loadAccount,
  updateAccount,
  loadCampaigns,
  updateCampaign,
  addCampaign,
};