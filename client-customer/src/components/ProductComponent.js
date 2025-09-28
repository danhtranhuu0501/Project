import axios from 'axios';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import withRouter from '../utils/withRouter';

class Product extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      sort: 'default',
      loading: false,
    };
  }
  render() {
    const prods = this.state.products.map((item) => {
      return (
        <div key={item._id} className="product-card">
          <Link to={'/product/' + item._id}>
            <img src={"data:image/jpg;base64," + item.image} alt={item.name} />
            <h3 className="title clamp-2">{item.name}</h3>
            <div className="price">{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.price)}</div>
          </Link>
        </div>
      );
    });
    return (
      <div className="text-center">
        <h2 className="text-center products-header">SẢN PHẨM</h2>
        <div className="toolbar">
          <div className="toolbar-left" />
          <div className="toolbar-right">
            <select
              className="select-modern"
              value={this.state.sort}
              onChange={(e) => {
                const value = e.target.value;
                this.setState({ sort: value });
                this.cmbSortChange(value);
              }}
            >
              <option value="default">Sắp xếp</option>
              <option value="nameASC">Tên (A → Z)</option>
              <option value="nameDESC">Tên (Z → A)</option>
              <option value="priceASC">Giá (thấp → cao)</option>
              <option value="priceDESC">Giá (cao → thấp)</option>
            </select>
          </div>
        </div>
        {this.state.loading ? (
          <div className="product-grid">
            {Array.from({ length: 6 }).map((_, idx) => (
              <div key={idx} className="product-card skeleton-card" />
            ))}
          </div>
        ) : this.state.products.length === 0 ? (
          <div className="empty-state">Không có sản phẩm phù hợp</div>
        ) : (
          <div className="product-grid">
            {prods}
          </div>
        )}
      </div>
    );
  }
  componentDidMount() { // first: /product/...
    const params = this.props.params;
    if (params.cid) {
      this.apiGetProductsByCatID(params.cid);
    }
    else if (params.keyword) {
        this.apiGetProductsByKeyword(params.keyword);
      }
  }
  componentDidUpdate(prevProps) { // changed: /product/...
    const params = this.props.params;
    if (params.cid && params.cid !== prevProps.params.cid) {
      this.apiGetProductsByCatID(params.cid);
    }
    else if (params.keyword && params.keyword !== prevProps.params.keyword) {
        this.apiGetProductsByKeyword(params.keyword);
      }
  }
  // apis
  apiGetProductsByKeyword(keyword) {
    this.setState({ loading: true });
    axios.get('/api/customer/products/search/' + keyword).then((res) => {
      const result = res.data;
      this.setState({ products: result, loading: false });
    }).catch(() => this.setState({ loading: false }));
  }
  // apis
  apiGetProductsByCatID(cid) {
    this.setState({ loading: true });
    axios.get('/api/customer/products/category/' + cid).then((res) => {
      const result = res.data;
      this.setState({ products: result, loading: false });
    }).catch(() => this.setState({ loading: false }));
  }
  // event-handlers
cmbSortChange (sort) {
	const products = [...this.state.products];
	if (sort === 'nameASC') {
		products.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sort === 'nameDESC') {
		products.sort((a, b) => b.name.localeCompare(a.name));
    } else if (sort === 'priceASC') {
		products.sort((a, b) => a.price - b.price);
    } else if (sort === 'priceDESC') {
		products.sort((a, b) => b.price - a.price);
    }
    this.setState({ products: products });
  }
}
export default withRouter(Product);