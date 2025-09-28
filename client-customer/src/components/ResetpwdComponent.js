import axios from 'axios';
import React, { Component } from 'react';

class Resetpwd extends Component {
  constructor(props) {
    super(props);
    this.state = {
      txtEmail: '',
      txtID: '',
      txtToken: '',
      txtPassword: ''
    };
  }

  render() {
    return (
      <div className="align-center">
        <h2 className="text-center">RESET PASSWORD</h2>
        <form>
          <table className="align-center">
            <tbody>
              <tr>
                <td>Email</td>
                <td>
                  <input 
                    type="email" 
                    value={this.state.txtEmail} 
                    onChange={(e) => { this.setState({ txtEmail: e.target.value }) }} 
                  />
                </td>
              </tr>
              <tr>
                <td></td>
                <td>
                  <input 
                    type="submit" 
                    value="SEND EMAIL" 
                    onClick={(e) => this.btnEmailClick(e)} 
                  />
                </td>
              </tr>
              <tr>
                <td>ID</td>
                <td>
                  <input 
                    type="text" 
                    value={this.state.txtID} 
                    onChange={(e) => { this.setState({ txtID: e.target.value }) }} 
                  />
                </td>
              </tr>
              <tr>
                <td>Token</td>
                <td>
                  <input 
                    type="text" 
                    value={this.state.txtToken} 
                    onChange={(e) => { this.setState({ txtToken: e.target.value }) }} 
                  />
                </td>
              </tr>
              <tr>
                <td>New password</td>
                <td>
                  <input 
                    type="password" 
                    value={this.state.txtPassword} 
                    onChange={(e) => { this.setState({ txtPassword: e.target.value }) }} 
                  />
                </td>
              </tr>
              <tr>
                <td></td>
                <td>
                  <input 
                    type="submit" 
                    value="RESET" 
                    onClick={(e) => this.btnResetClick(e)} 
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </form>
      </div>
    );
  }

  // event-handlers
  btnEmailClick(e) {
    e.preventDefault();
    const email = this.state.txtEmail;
    if (email) {
      this.apiSendmail(email);
    } else {
      alert('Please input email');
    }
  }

  btnResetClick(e) {
    e.preventDefault();
    const id = this.state.txtID;
    const token = this.state.txtToken;
    const password = this.state.txtPassword;
    if (id && token && password) {
      this.apiResetpwd(id, token, password);
    } else {
      alert('Please input id, token, and password');
    }
  }

  // apis
  apiSendmail(email) {
    axios.get(`/api/customer/sendmail/${encodeURIComponent(email)}`)
      .then((res) => {
        const result = res.data;
        alert(result.message);
      })
      .catch((error) => {
        console.error('There was an error sending the email:', error);
        alert('Failed to send email. Please try again.');
      });
  }

  apiResetpwd(id, token, password) {
    const body = { id: id, token: token, password: password };
    axios.post('/api/customer/resetpwd', body)
      .then((res) => {
        const result = res.data;
        if (result.success) {
          alert('Password reset successful!');
        } else {
          alert('Password reset failed: ' + result.message);
        }
      })
      .catch((error) => {
        console.error('There was an error resetting the password:', error);
        alert('Failed to reset password. Please try again.');
      });
  }
}

export default Resetpwd;
