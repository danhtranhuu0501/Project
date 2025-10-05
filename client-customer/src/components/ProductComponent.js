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
    };
  }
  render() {
    const prods = this.state.products.map((item) => {
      return (
        <div key={item._id} className="col-6 col-sm-4 col-md-3 col-lg-3 mb-4">
          <div className="card h-100 shadow-sm">
            <Link to={'/product/' + item._id} className="text-decoration-none text-dark">
              <img src={"data:image/jpg;base64," + item.image} className="card-img-top object-fit-cover" alt="product" style={{height: 220}} />
              <div className="card-body">
                <h6 className="card-title text-truncate" title={item.name}>{item.name}</h6>
                <p className="card-text text-primary fw-bold mb-0">{item.price}</p>
              </div>
            </Link>
          </div>
        </div>
      );
    });
    return (
      <div className="container py-4">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h4 className="mb-0">Danh sách sản phẩm</h4>
          <div className="d-inline-block">
            <select className="form-select" style={{width: 240}} value={this.state.sort} onChange={(e) => { this.setState({ sort: e.target.value }); this.cmbSortChange(e.target.value); }}>
              <option value="default">Sắp xếp</option>
              <option value="nameASC">Tên (A → Z)</option>
              <option value="nameDESC">Tên (Z → A)</option>
              <option value="priceASC">Giá (thấp → cao)</option>
              <option value="priceDESC">Giá (cao → thấp)</option>
            </select>
          </div>
        </div>
        <div className="row">
          {prods}
        </div>
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
    axios.get('/api/customer/products/search/' + keyword).then((res) => {
      const result = res.data;
      this.setState({ products: result });
    });
  }
  // apis
  apiGetProductsByCatID(cid) {
    axios.get('/api/customer/products/category/' + cid).then((res) => {
      const result = res.data;
      this.setState({ products: result });
    });
  }
  // event-handlers
  cmbSortChange(sort) {
    let sorted = [...this.state.products];
    if (sort === 'nameASC') {
      sorted.sort((a, b) => (a.name || '').localeCompare(b.name || ''));
    } else if (sort === 'nameDESC') {
      sorted.sort((a, b) => (b.name || '').localeCompare(a.name || ''));
    } else if (sort === 'priceASC') {
      sorted.sort((a, b) => (a.price || 0) - (b.price || 0));
    } else if (sort === 'priceDESC') {
      sorted.sort((a, b) => (b.price || 0) - (a.price || 0));
    }
    this.setState({ products: sorted });
  }
}
export default withRouter(Product);