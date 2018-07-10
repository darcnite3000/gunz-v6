import React from 'react';
import {Link} from 'react-router';

class HeaderLogin extends React.Component{
  constructor(props){
    super(props);
  }
  handleLogin(event){
    event.preventDefault();
    var username = this.refs.username.getDOMNode().value;
    var password = this.refs.password.getDOMNode().value
    this.props.login(username,password);
  }
  render(){
    return (
    <form onSubmit={this.handleLogin.bind(this)} className="userdetail">
      <div className="input-group">
        <input ref="username" className="input-text" name="wm_username" type="text" placeholder="Username" />
        <input ref="password" className="input-text" name="wm_password" type="password" placeholder="Password" />
        <button className="btn btn-medium login">Login</button>
      </div>
      <div className="input-group">
        <a href="https://secure.gunzblazing.com/support/lost_password_webmaster.php" className="link forgot">Forgot Your Password?</a>
      </div>
      <Link to="signup" className="btn btn-dark signup"><i className="fa fa-play-circle"></i> Sign Up</Link>
    </form>
    );
  }
}

export default HeaderLogin;