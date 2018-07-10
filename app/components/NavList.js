import React from 'react';
import RemLink from './RemLink';

class NavList extends React.Component{
  constructor(props){
    super(props);
  }
  render(){
    var navItems = this.props.list.map((navItem,index)=>{
      var handleClick = ()=>{
        this.props.navClick(navItem);
      }
      return (
        <li key={index}>
          <RemLink onClick={handleClick} {...navItem}>{navItem.title}</RemLink>
          {navItem.sublist && <NavList navClick={this.props.navClick} className="sublist" list={navItem.sublist} />}
        </li>
      );
    })
    return (
      <ul className={this.props.className}>
        {navItems}
      </ul>
    );
  }
}
NavList.propTypes = {
  list: React.PropTypes.arrayOf(React.PropTypes.shape({
    title: React.PropTypes.node,
  })),
  navClick: React.PropTypes.func.isRequired,
  className: React.PropTypes.string,
};

export default NavList;