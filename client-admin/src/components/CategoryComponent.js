import axios from 'axios';
import React, { Component } from 'react';
import MyContext from '../contexts/MyContext';
import CategoryDetail from './CategoryDetailComponent';

class Category extends Component {
  static contextType = MyContext; // using this.context to access global state
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      itemSelected: null,
      loading: false,
      error: null
    };
  }
  render() {
    if (this.state.loading) {
      return (
        <div className="card-modern" style={{margin: '20px', padding: '40px', textAlign: 'center'}}>
          <h2>Loading categories...</h2>
        </div>
      );
    }

    if (this.state.error) {
      return (
        <div className="card-modern" style={{margin: '20px', padding: '40px', textAlign: 'center'}}>
          <h2 style={{color: 'red'}}>Error: {this.state.error}</h2>
          <button className="btn-modern" onClick={() => this.apiGetCategories()}>Retry</button>
        </div>
      );
    }

    const categories = Array.isArray(this.state.categories) ? this.state.categories : [];
    const cates = categories.map((item) => {
      return (
        <tr key={item._id} className="datatable" onClick={() => this.trItemClick(item)}>
          <td>{item._id}</td>
          <td>{item.name}</td>
        </tr>
      );
    });
    return (
      <div className="card-modern" style={{margin: '20px', padding: '30px'}}>
        <div className="float-left">
          <h2 className="text-center" style={{color: '#667eea', fontSize: '28px', fontWeight: '700', marginBottom: '30px'}}>📂 CATEGORY LIST</h2>
          <table className="datatable" border="1">
            <tbody>
              <tr className="datatable">
                <th>ID</th>
                <th>Name</th>
              </tr>
              {cates}
            </tbody>
          </table>
        </div>
        <div className="inline" />
        <CategoryDetail item={this.state.itemSelected} updateCategories={this.updateCategories} />
        <div className="float-clear" />
      </div>
    );
  }
  updateCategories = (categories) => { // arrow-function
    this.setState({ categories: categories });
  }
  componentDidMount() {
    this.apiGetCategories();
  }
  // event-handlers
  trItemClick(item) {
    this.setState({ itemSelected: item });
  }
  // apis
  apiGetCategories() {
    this.setState({ loading: true, error: null });
    const config = { headers: { 'x-access-token': this.context.token } };
    axios.get('/api/admin/categories', config)
      .then((res) => {
        const result = res.data;
        this.setState({ categories: result, loading: false });
      })
      .catch((error) => {
        console.error('Error fetching categories:', error);
        this.setState({ 
          error: error.response?.data?.message || error.message || 'Failed to fetch categories',
          loading: false 
        });
      });
  }
}
export default Category;