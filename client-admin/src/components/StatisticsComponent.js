import axios from 'axios';
import React, { Component } from 'react';
import MyContext from '../contexts/MyContext';
import { Bar, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

class Statistics extends Component {
    static contextType = MyContext; // using this.context to access global state
    constructor(props) {
    super (props);
    this.state = {
        noCategories: 0,
        noProducts: 0,
        noOrders: 0,
        noOrdersPending: 0, 
        noOrdersApproved: 0, 
        noOrdersCanceled: 0,
        noOrdersRevenue: 0,
        noCustomers: 0
    };
}
render() {
    const barData = {
      labels: ['Categories', 'Products', 'Orders', 'Customers'],
      datasets: [
        {
          label: 'Totals',
          data: [this.state.noCategories, this.state.noProducts, this.state.noOrders, this.state.noCustomers],
          backgroundColor: 'rgba(13,110,253,0.6)'
        }
      ]
    };
    const pieData = {
      labels: ['Pending', 'Approved', 'Canceled'],
      datasets: [
        {
          data: [this.state.noOrdersPending, this.state.noOrdersApproved, this.state.noOrdersCanceled],
          backgroundColor: ['#ffc107', '#198754', '#dc3545']
        }
      ]
    };
    return (
      <div className="container py-4">
        <h4 className="fw-bold mb-4">Thống kê</h4>
        <div className="row g-4">
          <div className="col-md-6">
            <div className="card shadow-sm">
              <div className="card-body">
                <h6 className="card-title">Tổng quan</h6>
                <Bar data={barData} />
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="card shadow-sm">
              <div className="card-body">
                <h6 className="card-title">Đơn hàng theo trạng thái</h6>
                <Pie data={pieData} />
              </div>
            </div>
          </div>
        </div>
        <div className="card shadow-sm mt-4">
          <div className="card-body">
            <h6 className="card-title">Doanh thu</h6>
            <p className="display-6 text-primary">{this.state.noOrdersRevenue}</p>
          </div>
        </div>
      </div>
    );
    }
    componentDidMount() { 
        this.apiGetStatistics ();
    }
    //apis
    apiGetStatistics () {
        const config = { headers: { 'x-access-token': this.context.token} }; 
    axios.get('/api/admin/statistics', config).then((res) => {
        const result = res.data;
        this.setState({
            noCategories: result.noCategories, 
            noProducts: result.noProducts,
            noOrders: result.noOrders,
            noOrdersPending: result.noOrdersPending, 
            noOrdersApproved: result.noOrdersApproved, 
            noOrdersCanceled: result.noOrdersCanceled, 
            noOrdersRevenue: result.noOrdersRevenue, 
            noCustomers: result.noCustomers
            });
        });
    }
}
export default Statistics;
