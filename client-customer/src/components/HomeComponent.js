import axios from 'axios';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Slider from './SliderComponent';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newprods: [],
      hotprods: []
    };
  }
  render() {
    const newprods = this.state.newprods.map((item) => {
      return (
        <div key={item._id} className="product-card">
          <Link to={'/product/' + item._id}>
            <img src={"data:image/jpg;base64," + item.image} alt={item.name} />
            <h3>{item.name}</h3>
            <div className="price">{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.price)}</div>
          </Link>
        </div>
      );
    });
    const hotprods = this.state.hotprods.map((item) => {
      return (
        <div key={item._id} className="product-card">
          <Link to={'/product/' + item._id}>
            <img src={"data:image/jpg;base64," + item.image} alt={item.name} />
            <h3>{item.name}</h3>
            <div className="price">{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.price)}</div>
          </Link>
        </div>
      );
    });
    return (
      <div>
        <Slider />
        <div style={{height: 30 }}/>
        <div className="align-center">
          <h2 className="text-center" style={{color: 'var(--primary-600)', fontSize: '28px', fontWeight: '700', marginBottom: '30px'}}>NEW PRODUCTS</h2>
          <div className="product-grid">
            {newprods}
          </div>
        </div>
        {this.state.hotprods.length > 0 ?
          <div className="align-center">
            <h2 className="text-center" style={{color: 'var(--primary-600)', fontSize: '28px', fontWeight: '700', marginBottom: '30px'}}>HOT PRODUCTS</h2>
            <div className="product-grid">
              {hotprods}
            </div>
          </div>
          : <div />}
      </div>
    );
  }
  componentDidMount() {
    this.apiGetNewProducts();
    this.apiGetHotProducts();
  }
  // apis
  apiGetNewProducts() {
    axios.get('/api/customer/products/new').then((res) => {
      const result = res.data;
      this.setState({ newprods: result });
    });
  }
  apiGetHotProducts() {
    axios.get('/api/customer/products/hot').then((res) => {
      const result = res.data;
      this.setState({ hotprods: result });
    });
  }
}
export default Home;