import React, { Component } from 'react';
import Menu from './MenuComponent';
import Inform from './InformComponent';
import Home from './HomeComponent';
import { Routes, Route, Navigate } from 'react-router-dom';
import Product from './ProductComponent';
import ProductDetail from './ProductDetailComponent';
import Signup from './SignupComponent';
import Active from './ActiveComponent';
import Login from './LoginComponent';
import Myprofile from './MyprofileComponent';
import Mycart from './MycartComponent';
import Myorders from './MyordersComponent';
import Gmap from './GmapComponent';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Resetpwd from './ResetpwdComponent';
import axios from 'axios';
import MyContext from '../contexts/MyContext';

class Main extends Component {
  static contextType = MyContext;
  render() {
    return (
        <div className="body-customer">
          <ToastContainer autoClose={3000} />
        <Menu />
        <Inform />
        <Routes>
          <Route path='/' element={<Navigate replace to='/home' />} />
          <Route path='/home' element={<Home />} />
          <Route path='/product/category/:cid' element={<Product />} />
          <Route path='/product/search/:keyword' element={<Product />} />
          <Route path='/product/:id' element={<ProductDetail />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/active' element={<Active />} />
          <Route path='/login' element={<Login />} />
          <Route path='/myprofile' element={<Myprofile />} />
          <Route path='/mycart' element={<Mycart />} />
          <Route path='/myorders' element={<Myorders />} />
          <Route path='/gmap' element={<Gmap />} />
          <Route path='/resetpwd' element={<Resetpwd />} />
        </Routes>
      </div>
    );
  }
  componentDidMount() {
    const token = localStorage.getItem('customer_token');
    if (token) this.apiGetAccount(token);
  }
  //apis
  apiGetAccount(token) {
    const config = { headers: { 'x-access-token': token } };
    axios.get('/api/customer/account', config).then((res) => {
      const result = res.data;
      this.context.setToken(token);
      this.context.setCustomer(result);
    });
  }
}
export default Main;