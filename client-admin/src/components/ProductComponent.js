import axios from 'axios';
import React, { Component } from 'react';
import MyContext from '../contexts/MyContext';
import ProductDetail from './ProductDetailComponent';

class Product extends Component {
  static contextType = MyContext; // using this.context to access global state
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      noPages: 0,
      curPage: 1,
      itemSelected: null,
      loading: false,
      error: null
    };
  }
  render() {
    if (this.state.loading) {
      return (
        <div className="card-modern" style={{margin: '20px', padding: '40px', textAlign: 'center'}}>
          <h2>Loading products...</h2>
        </div>
      );
    }

    if (this.state.error) {
      return (
        <div className="card-modern" style={{margin: '20px', padding: '40px', textAlign: 'center'}}>
          <h2 style={{color: 'red'}}>Error: {this.state.error}</h2>
          <button className="btn-modern" onClick={() => this.apiGetProducts(this.state.curPage)}>Retry</button>
        </div>
      );
    }

    const products = Array.isArray(this.state.products) ? this.state.products : [];
    const prods = products.map((item) => {
      return (
        <tr key={item._id} className="datatable" onClick={() => this.trItemClick(item)}>
          <td>{item._id}</td>
          <td>{item.name}</td>
          <td>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.price)}</td>
          <td>{new Date(item.cdate).toLocaleString()}</td>
          <td>{item.category.name}</td>
          <td><img src={"data:image/jpg;base64," + item.image} width="100px" height="100px" alt="" /></td>
          <td>
            {Array.isArray(item.imageDetails) && item.imageDetails.length > 0 ? (
              item.imageDetails.map((image, index) => (
                <img key={index} src={"data:image/jpg;base64," + image} width="100px" height=" 100px" alt="" />
            ))
           ) : (<span>n/a</span>)} 
           </td> 
        </tr>
      );
    });
    const pagination = Array.from({ length: this.state.noPages }, (_, index) => {
      if ((index + 1) === this.state.curPage) {
        return (<span key={index}>| <b>{index + 1}</b> |</span>);
      } else {
        return (<span key={index} className="link" onClick={() => this.lnkPageClick(index + 1)}>| {index + 1} |</span>);
      }
    });
    return (
      <div className="card-modern" style={{margin: '20px', padding: '30px'}}>
        <div className="float-left">
          <h2 className="text-center" style={{color: '#667eea', fontSize: '28px', fontWeight: '700', marginBottom: '30px'}}>📦 PRODUCT LIST</h2>
          <table className="datatable">
            <tbody>
              <tr className="datatable">
                <th>ID</th>
                <th>Name</th>
                <th>Price</th>
                <th>Creation date</th>
                <th>Category</th>
                <th>Image</th>
                <th>Image Details</th>
              </tr>
              {prods}
              <tr>
                <td colSpan="7" style={{textAlign: 'center', padding: '20px'}}>
                  <div style={{display: 'flex', justifyContent: 'center', gap: '10px', flexWrap: 'wrap'}}>
                    {pagination}
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="inline" />
        <ProductDetail item={this.state.itemSelected} curPage={this.state.curPage} updateProducts={this.updateProducts} />
        <div className="float-clear" />
      </div>
    );
  }
  updateProducts = (products, noPages, curPage) => { // arrow-function
    this.setState({ products: products, noPages: noPages, curPage: curPage });
  }
  componentDidMount() {
    this.apiGetProducts(this.state.curPage);
  }
  // event-handlers
  lnkPageClick(index) {
    this.apiGetProducts(index);
  }
  trItemClick(item) {
    this.setState({ itemSelected: item });
  }
  // apis
  apiGetProducts(page) {
    this.setState({ loading: true, error: null });
    const config = { headers: { 'x-access-token': this.context.token } };
    axios.get('/api/admin/products?page=' + page, config)
      .then((res) => {
        const result = res.data;
        this.setState({ products: result.products, noPages: result.noPages, curPage: result.curPage, loading: false });
      })
      .catch((error) => {
        console.error('Error fetching products:', error);
        this.setState({ 
          error: error.response?.data?.message || error.message || 'Failed to fetch products',
          loading: false 
        });
      });
  }
}
export default Product;