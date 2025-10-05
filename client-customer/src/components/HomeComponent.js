import axios from 'axios';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Slider from './SliderComponent';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newprods: [],
      hotprods: [],
      categories: [],
      catProducts: {} // { categoryId: [products] }
    };
  }
  render() {
    const newprods = (this.state.newprods || []).filter(item => item && item._id).map((item) => {
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
    const hotprods = (this.state.hotprods || []).filter(item => item && item._id).map((item) => {
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
    const categoryBlocks = (this.state.categories || []).map((cat) => {
      const prods = ((this.state.catProducts[cat._id] || []).filter(p => p && p._id)).map((item) => (
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
      ));
      return (
        <div key={cat._id} className="mt-4">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h4 className="fw-bold mb-0">{cat.name}</h4>
            <Link className="text-decoration-none" to={'/product/category/' + cat._id}>Xem tất cả</Link>
          </div>
          <div className="row">
            {prods}
          </div>
        </div>
      );
    });

    return (
      <div>
        <Slider />
        <div className="container py-4">
          <h4 className="fw-bold mb-3">Sản phẩm mới</h4>
          <div className="row">
            {newprods}
          </div>
          {this.state.hotprods.length > 0 ? (
            <>
              <h4 className="fw-bold mt-4 mb-3">Sản phẩm nổi bật</h4>
              <div className="row">
                {hotprods}
              </div>
            </>
          ) : <div />}
          {categoryBlocks}
        </div>
      </div>
    );
  }
  componentDidMount() {
    this.apiGetNewProducts();
    this.apiGetHotProducts();
    this.apiGetCategories();
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
  apiGetCategories() {
    axios.get('/api/customer/categories').then((res) => {
      const categories = res.data || [];
      this.setState({ categories: categories });
      // fetch a few products per category (reuse existing category endpoint and slice on client)
      categories.forEach((cat) => {
        axios.get('/api/customer/products/category/' + cat._id).then((r) => {
          const list = (r.data || []).slice(0, 4); // show 4 per category on home
          this.setState((prev) => ({ catProducts: { ...prev.catProducts, [cat._id]: list } }));
        });
      });
    });
  }
}
export default Home;