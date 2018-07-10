import React from 'react';
import {Link} from 'react-router';
import HeaderLogin from './header/HeaderLogin';
import HeaderNav from './header/HeaderNav';
import HeaderUser from './header/HeaderUser';
import {webmasterList, tourList} from '../../config/navlists';

class GunzHeader extends React.Component{
  constructor(props){
    super(props);
  }
  render(){
    var pageList = (this.props.webmaster.id) ? webmasterList : tourList;
    return (
    <header className="header-top">
      <div className="page-container">
        <Link to="home"><h1 className="logo">GunzBlazing.com</h1></Link>
        {this.props.webmaster.id ? 
          <HeaderUser 
            logout={this.props.logout}
            webmaster={this.props.webmaster} /> : 
          <HeaderLogin 
            login={this.props.login}
            webmaster={this.props.webmaster} />}
        <HeaderNav list={pageList} />
      </div>
    </header>
    );
  }
}

export default GunzHeader;