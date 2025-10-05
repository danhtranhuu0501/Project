import React, { Component } from 'react';
import MyContext from '../contexts/MyContext';
import { Link } from 'react-router-dom';


class Menu extends Component {
  static contextType = MyContext; // using this.context to access global state
  render() {
    return (
      <div className="d-flex">
        <div className="flex-shrink-0 p-3 bg-light border-end" style={{width: 260, minHeight: '100vh'}}>
          <Link to='/admin/home' className="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-body-emphasis text-decoration-none">
            <span className="fs-5 fw-semibold">Lapmead Admin</span>
          </Link>
          <hr />
          <ul className="nav nav-pills flex-column mb-auto">
            <li className="nav-item"><Link className="nav-link" to='/admin/home'>Home</Link></li>
            <li className="nav-item"><Link className="nav-link" to='/admin/category'>Category</Link></li>
            <li className="nav-item"><Link className="nav-link" to='/admin/product'>Product</Link></li>
            <li className="nav-item"><Link className="nav-link" to='/admin/order'>Order</Link></li>
            <li className="nav-item"><Link className="nav-link" to='/admin/customer'>Customer</Link></li>
            <li className="nav-item"><Link className="nav-link" to='/admin/statistics'>Statistics</Link></li>
          </ul>
          <hr />
          <div className="dropdown">
            <span className="d-block">Hello <b>{this.context.username}</b></span>
            <Link to='/admin/home' className="btn btn-outline-danger btn-sm mt-2" onClick={() => this.lnkLogoutClick()}>Logout</Link>
          </div>
        </div>
        <div className="flex-grow-1">
          {/* content rendered by routes remains below the menu component in DOM tree */}
        </div>
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