import axios from 'axios';
import React, { Component } from 'react';
import MyContext from '../contexts/MyContext';

class Order extends Component {
  static contextType = MyContext; // using this.context to access global state
  constructor(props) {
    super(props);
    this.state = {
      orders: [],
      order: null,
      loading: false,
      error: null
    };
  }
  render() {
    if (this.state.loading) {
      return (
        <div className="card-modern" style={{margin: '20px', padding: '40px', textAlign: 'center'}}>
          <h2>Loading orders...</h2>
        </div>
      );
    }

    if (this.state.error) {
      return (
        <div className="card-modern" style={{margin: '20px', padding: '40px', textAlign: 'center'}}>
          <h2 style={{color: 'red'}}>Error: {this.state.error}</h2>
          <button className="btn-modern" onClick={() => this.apiGetOrders()}>Retry</button>
        </div>
      );
    }

    const orders = Array.isArray(this.state.orders) ? this.state.orders : [];
    const ordersList = orders.map((item) => {
      return (
        <tr key={item._id} className="datatable" onClick={() => this.trItemClick(item)}>
          <td>{item._id}</td>
          <td>{new Date(item.cdate).toLocaleString()}</td>
          <td>{item.customer.name}</td>
          <td>{item.customer.phone}</td>
          <td>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.total)}</td>
          <td>{item.status}</td>
          <td>
            {item.status === 'PENDING' ?
              <div><span className="link" onClick={() => this.lnkApproveClick(item._id)}>APPROVE</span> || <span className="link" onClick={() => this.lnkCancelClick(item._id)}>CANCEL</span></div>
              : <div />}
          </td>
        </tr>
      );
    });
    if (this.state.order) {
      const orderItems = Array.isArray(this.state.order.items) ? this.state.order.items : [];
      var items = orderItems.map((item, index) => {
        return (
          <tr key={item.product._id} className="datatable">
            <td>{index + 1}</td>
            <td>{item.product._id}</td>
            <td>{item.product.name}</td>
            <td><img src={"data:image/jpg;base64," + item.product.image} width="70px" height="70px" alt="" /></td>
            <td>{item.product.price}</td>
            <td>{item.quantity}</td>
            <td>{item.product.price * item.quantity}</td>
          </tr>
        );
      });
    }
    return (
      <div className="card-modern" style={{margin: '20px', padding: '30px'}}>
        <div className="align-center">
          <h2 className="text-center" style={{color: '#667eea', fontSize: '28px', fontWeight: '700', marginBottom: '30px'}}>📋 ORDER LIST</h2>
          <table className="datatable" border="1">
            <tbody>
              <tr className="datatable">
                <th>ID</th>
                <th>Creation date</th>
                <th>Cust.name</th>
                <th>Cust.phone</th>
                <th>Total</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
              {ordersList}
            </tbody>
          </table>
        </div>
        {this.state.order ?
          <div className="align-center">
            <h2 className="text-center" style={{color: '#667eea', fontSize: '24px', fontWeight: '700', marginBottom: '20px'}}>ORDER DETAIL</h2>
            <table className="datatable" border="1">
              <tbody>
                <tr className="datatable">
                  <th>No.</th>
                  <th>Prod.ID</th>
                  <th>Prod.name</th>
                  <th>Image</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Amount</th>
                </tr>
                {items}
              </tbody>
            </table>
          </div>
          : <div />}
      </div>
    );
  }
  componentDidMount() {
    this.apiGetOrders();
  }
  // event-handlers
  trItemClick(item) {
    this.setState({ order: item });
  }
  // apis
  apiGetOrders() {
    this.setState({ loading: true, error: null });
    const config = { headers: { 'x-access-token': this.context.token } };
    axios.get('/api/admin/orders', config)
      .then((res) => {
        const result = res.data;
        this.setState({ orders: result, loading: false });
      })
      .catch((error) => {
        console.error('Error fetching orders:', error);
        this.setState({ 
          error: error.response?.data?.message || error.message || 'Failed to fetch orders',
          loading: false 
        });
      });
  }
  // event-handlers
  lnkApproveClick(id) {
    this.apiPutOrderStatus(id, 'APPROVED');
  }
  lnkCancelClick(id) {
    this.apiPutOrderStatus(id, 'CANCELED');
  }
  // apis
  apiPutOrderStatus(id, status) {
    const body = { status: status };
    const config = { headers: { 'x-access-token': this.context.token } };
    axios.put('/api/admin/orders/status/' + id, body, config).then((res) => {
      const result = res.data;
      if (result) {
        this.apiGetOrders();
      } else {
        alert('SORRY BABY!');
      }
    });
  }
}
export default Order;