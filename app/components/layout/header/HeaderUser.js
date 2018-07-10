import React from 'react';
import {Link} from 'react-router';

class HeaderUser extends React.Component{
  constructor(props){
    super(props);
  }
  handleLogout(){
    this.props.logout();
  }
  render(){
    return (
      <div className="userdetail">
        <div className="input-group detail">
          Welcome, <Link to="account">{this.props.webmaster.username}[{this.props.webmaster.id}]</Link>
        </div>
        <div className="input-group">
          <button onClick={this.handleLogout.bind(this)} className="btn btn-medium logout">Log Out</button>
        </div>
      </div>
    );
  }
}

export default HeaderUser;