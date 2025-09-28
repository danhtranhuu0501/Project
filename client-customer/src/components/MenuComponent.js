import axios from 'axios';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import withRouter from '../utils/withRouter';

class Menu extends Component {
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
        <li key={item._id} className="menu"><Link to={'/product/category/' + item._id}>{item.name}</Link></li>
      );
    });
    return (
      <div className="border-bottom">
        <div className="float-left">
          <ul className="menu">
          <li className="menu"><Link to='/gmap'>Gmap</Link></li>
          <li className="menu"><Link to='/'>Home</Link></li>
            {cates}
          </ul>
        </div>
        <div className="float-right">
          <form className="search">
            <input type="search" placeholder="Enter keyword" className="keyword" value={this.state.txtKeyword} onChange={(e) => { this.setState({ txtKeyword: e.target.value }) }} />
            <button 
              type="submit" 
              onClick={(e) => this.btnSearchClick(e)}
              style={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white',
                border: 'none',
                padding: '12px 25px',
                borderRadius: '0 25px 25px 0',
                fontSize: '16px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: '0 4px 15px rgba(102, 126, 234, 0.3)'
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = '0 8px 25px rgba(102, 126, 234, 0.4)';
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = '0 4px 15px rgba(102, 126, 234, 0.3)';
              }}
            >
              🔍 SEARCH
            </button>
          </form>
          <div style={{ display: "inline", marginLeft: '20px' }} className="form-switch">
          <input className="form-check-input" type="checkbox" onChange={this.ckbChangeMode} />&nbsp; 🌙 Light / Dark mode
        </div>
        </div>
        <div className="float-clear" />
      </div>
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