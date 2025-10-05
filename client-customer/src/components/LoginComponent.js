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
        <h2 className="text-center">CUSTOMER LOGIN</h2>
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
    axios.post('/api/customer/login', account).then((res) => {
      const result = res.data;
      if (result.success === true) {
        this.context.setToken(result.token);
        this.context.setCustomer(result.customer);
        this.props.navigate('/home');
        toast.success('Login successful');
        localStorage.setItem('customer_token', result.token);
      } else {
        // If customer login fails, try admin login and redirect to admin client
        this.apiAdminLoginFallback(account, result.message);
      }
    });
  }
  apiAdminLoginFallback(account, originalMessage) {
    axios.post('/api/admin/login', account).then((res) => {
      const result = res.data;
      if (result && result.success === true) {
        localStorage.setItem('admin_token', result.token);
        toast.success('Logged in as admin');
        // Redirect to admin client at localhost:3001
        window.location.href = 'http://localhost:3001/admin/home';
      } else {
        toast.error(originalMessage || (result && result.message) || 'Login failed');
      }
    }).catch(() => {
      toast.error(originalMessage || 'Login failed');
    });
  }
}

export default withRouter(Login);