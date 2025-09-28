import React, { Component } from 'react';
import MyContext from '../contexts/MyContext';
import { Link } from 'react-router-dom';


class Menu extends Component {
  static contextType = MyContext; // using this.context to access global state
  render() {
    return (
      <div className="border-bottom">
        <div className="float-left">
          <ul className="menu">
            <li className="menu"><Link to='/admin/home'>Home</Link></li>
            <li className="menu"><Link to='/admin/category'>Category</Link></li>
            <li className="menu"><Link to='/admin/product'>Product</Link></li>
            <li className="menu"><Link to='/admin/order'>Order</Link></li>
            <li className="menu"><Link to='/admin/customer'>Customer</Link></li>
            <li className="menu"><Link to='/admin/statistics'>Statistics</Link></li>
          </ul>
        </div>
        <div className="float-right" style={{color: 'white', fontSize: '16px', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '12px'}}>
          <span>Hello <b>{this.context.username || 'Admin'}</b></span>
          <Link 
            to='/admin/home' 
            onClick={() => this.lnkLogoutClick()}
            className="btn-modern"
            style={{
              color: 'white',
              textDecoration: 'none',
              fontSize: '14px',
              padding: '8px 16px',
              borderRadius: '8px',
              background: 'rgba(255, 255, 255, 0.15)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              transition: 'all 0.3s ease',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            🚪 Logout
          </Link>
        </div>
        <div className="float-clear" />
      </div>
    );
  }
  // event-handlers
  lnkLogoutClick() {
    this.context.setToken('');
    this.context.setUsername('');
    localStorage.removeItem('admin_token');
  }
}
export default Menu;