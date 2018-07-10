import React from 'react';
import NavList from '../../NavList';


class HeaderNav extends React.Component{
  handleNavClick(item){
    if(!item.sublist){
      this.refs.togglenav.getDOMNode().checked = false;
    }
  }
  render(){
    return (
    <nav className="header-nav">
      <input className="mobile-toggler" id="togglenav" ref="togglenav" type="checkbox" />
      <label htmlFor="togglenav" className="toggler-label"><i className="fa fa-navicon"></i> Menu</label>
      <NavList
        navClick={this.handleNavClick.bind(this)}
        {...this.props}
        className="horizontal-list toggler-checked" />
    </nav>
    );
  }
}

export default HeaderNav;