import axios from 'axios';
import React, { Component } from 'react';
import MyContext from '../contexts/MyContext';
import withRouter from '../utils/withRouter';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

class Login extends Component {
  static contextType = MyContext; // using this.context to access global state
  constructor(props) {
    super(props);
    this.state = {
      txtUsername: '',
      txtPassword: ''
    };
  }

  render() {
    return (
      <div className="align-center">
        <h2 className="text-center">LOGIN</h2>
        <p className="text-center" style={{ color: '#666', fontSize: '14px' }}>
          Enter your credentials - we'll detect your role automatically
        </p>
        
        <form>
          <table className="align-center">
            <tbody>
              <tr>
                <td>Username</td>
                <td>
                  <input
                    type="text"
                    value={this.state.txtUsername}
                    placeholder="Enter username"
                    onChange={(e) => { this.setState({ txtUsername: e.target.value }) }}
                  />
                </td>
              </tr>
              <tr>
                <td>Password</td>
                <td>
                  <input
                    type="password"
                    value={this.state.txtPassword}
                    placeholder="Enter password"
                    onChange={(e) => { this.setState({ txtPassword: e.target.value }) }}
                  />
                </td>
              </tr>
              <tr>
                <td></td>
                <td>
                  <input type="submit" value="LOGIN" onClick={(e) => this.btnLoginClick(e)} />
                </td>
              </tr>
              <tr>
                <td></td>
                <td><Link to='/resetpwd'>Forgot Password</Link></td>
              </tr>
            </tbody>
          </table>
        </form>
      </div>
    );
  }

  // event-handlers
  btnLoginClick(e) {
    e.preventDefault();
    const username = this.state.txtUsername;
    const password = this.state.txtPassword;
    if (username && password) {
      const account = { username: username, password: password };
      this.apiLogin(account);
    } else {
      toast.warning('Please input username and password');
    }
  }

  // apis
  apiLogin(account) {
    // Try admin login first
    this.tryAdminLogin(account);
  }

  tryAdminLogin(account) {
    axios.post('/api/admin/login', account).then((res) => {
      const result = res.data;
      if (result.success === true) {
        // Admin login successful
        this.context.setToken(result.token);
        this.context.setUsername(account.username);
        localStorage.setItem('admin_token', result.token);
        
        // Clear customer data
        this.context.setCustomer(null);
        localStorage.removeItem('customer_token');
        
        // Redirect to admin page
        toast.success('Admin login successful');
        setTimeout(() => {
          // Check if running on localhost for development
          if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
            window.location.href = 'http://localhost:3001/admin/home';
          } else {
            window.location.href = '/admin';
          }
        }, 1000);
      } else {
        // Admin login failed, try customer login
        this.tryCustomerLogin(account);
      }
    }).catch((error) => {
      // Admin API error, try customer login
      this.tryCustomerLogin(account);
    });
  }

  tryCustomerLogin(account) {
    axios.post('/api/customer/login', account).then((res) => {
      const result = res.data;
      if (result.success === true) {
        // Customer login successful
        this.context.setToken(result.token);
        this.context.setCustomer(result.customer);
        localStorage.setItem('customer_token', result.token);
        
        // Clear admin data
        this.context.setUsername('');
        localStorage.removeItem('admin_token');
        
        // Check if running on localhost for development
        if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
          // Stay on current port for customer
          this.props.navigate('/home');
        } else {
          this.props.navigate('/home');
        }
        toast.success('Customer login successful');
      } else {
        toast.error(result.message);
      }
    }).catch((error) => {
      toast.error('Login failed: Invalid credentials');
    });
  }
}

export default withRouter(Login);