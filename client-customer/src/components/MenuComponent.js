import axios from 'axios';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import withRouter from '../utils/withRouter';
import MyContext from '../contexts/MyContext';

class Menu extends Component {
  static contextType = MyContext;
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      txtKeyword: ''
    };
  }
  render() {
    const cates = this.state.categories.map((item) => {
      return (
        <li key={item._id} className="nav-item">
          <Link className="nav-link" to={'/product/category/' + item._id}>{item.name}</Link>
        </li>
      );
    });
    return (
      <nav className="navbar navbar-expand-lg bg-body-tertiary sticky-top">
        <div className="container">
          <Link className="navbar-brand fw-bold" to="/">Lapmead</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item"><Link className="nav-link" to='/'>Home</Link></li>
              <li className="nav-item"><Link className="nav-link" to='/gmap'>Gmap</Link></li>
              {cates}
            </ul>
            <form className="d-flex" role="search" onSubmit={(e) => this.btnSearchClick(e)}>
              <input className="form-control me-2" type="search" placeholder="Tìm sản phẩm" aria-label="Search" value={this.state.txtKeyword} onChange={(e) => { this.setState({ txtKeyword: e.target.value }) }} />
              <button className="btn btn-primary" type="submit">Tìm</button>
            </form>
            <div className="d-flex align-items-center ms-3">
              <Link className="btn btn-outline-secondary position-relative" to='/mycart' aria-label="Giỏ hàng">
                {/* inline SVG cart icon to avoid bootstrap-icons dependency */}
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M0 1.5A.5.5 0 0 1 .5 1h1a.5.5 0 0 1 .485.379L2.89 5H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 14H4a.5.5 0 0 1-.491-.408L2.01 5.607 1.61 4H.5a.5.5 0 0 1-.5-.5z"/>
                  <path d="M5 16a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm7-2a2 2 0 1 1-4 0 2 2 0 0 1 4 0z"/>
                </svg>
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                  {(this.context.mycart || []).length}
                </span>
              </Link>
              <div className="form-check form-switch ms-3">
                <input className="form-check-input" type="checkbox" onChange={this.ckbChangeMode} id="themeSwitch" />
                <label className="form-check-label" htmlFor="themeSwitch">Light / Dark</label>
              </div>
            </div>
          </div>
        </div>
      </nav>
    ); 
  }
  // event-handlers
  btnSearchClick(e) {
    e.preventDefault();
    this.props.navigate('/product/search/' + this.state.txtKeyword);
  }
  componentDidMount() {
    this.apiGetCategories();
  }
  ckbChangeMode (e) {
    if (e.target.checked) { 
      document.documentElement.setAttribute('data-bs-theme', 'dark');
    } else {                 
      document.documentElement.setAttribute('data-bs-theme', 'light');
  }
}  
  // apis
  apiGetCategories() {
    axios.get('/api/customer/categories').then((res) => {
      const result = res.data;
      this.setState({ categories: result });
    });
  }
}
export default withRouter(Menu);