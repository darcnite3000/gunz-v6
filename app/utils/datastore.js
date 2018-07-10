import store from 'store';
import moment from 'moment';

const nameSpace = 'gunz';

var datastore = {
  expiresIn:{
    secondsFromNow(num){
      return moment().add(num,'seconds').unix();
    },
    hoursFromNow(num){
      return moment().add(num,'hours').unix();
    }
  },
  set(key, value, expiration=null){
    return store.set(`${nameSpace}.${key}`, {
      xat: expiration,
      data: value
    });
  },
  get(key){
    var value = store.get(`${nameSpace}.${key}`);
    if (value) {
      var {xat, data} = value;
    
      if(xat && xat < moment().unix()){
        store.clear(`${nameSpace}.${key}`);
        return undefined;
      }
      return data;
    }
    return undefined;
  },
  clear(key){
    return store.clear(`${nameSpace}.${key}`);
  }
};

export default datastore;