import React, { Component } from 'react';

class Home extends Component {
  render() {
    return (
      <div className="card-modern" style={{margin: '20px', padding: '40px', textAlign: 'center'}}>
        <h2 className="text-center" style={{color: '#667eea', fontSize: '32px', fontWeight: '700', marginBottom: '30px'}}>
          🏠 ADMIN DASHBOARD
        </h2>
        <div style={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          borderRadius: '20px',
          padding: '40px',
          color: 'white',
          marginBottom: '30px'
        }}>
          <h3 style={{fontSize: '24px', marginBottom: '20px'}}>Welcome to Admin Panel</h3>
          <p style={{fontSize: '18px', lineHeight: '1.6'}}>
            Manage your products, categories, orders, and customers with our modern admin interface.
          </p>
        </div>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '20px',
          marginTop: '30px'
        }}>
          <div className="card-modern" style={{padding: '20px', textAlign: 'center'}}>
            <div style={{fontSize: '48px', marginBottom: '15px'}}>📦</div>
            <h4 style={{color: '#667eea', marginBottom: '10px'}}>Products</h4>
            <p>Manage your product catalog</p>
          </div>
          <div className="card-modern" style={{padding: '20px', textAlign: 'center'}}>
            <div style={{fontSize: '48px', marginBottom: '15px'}}>📂</div>
            <h4 style={{color: '#667eea', marginBottom: '10px'}}>Categories</h4>
            <p>Organize product categories</p>
          </div>
          <div className="card-modern" style={{padding: '20px', textAlign: 'center'}}>
            <div style={{fontSize: '48px', marginBottom: '15px'}}>📋</div>
            <h4 style={{color: '#667eea', marginBottom: '10px'}}>Orders</h4>
            <p>Track customer orders</p>
          </div>
          <div className="card-modern" style={{padding: '20px', textAlign: 'center'}}>
            <div style={{fontSize: '48px', marginBottom: '15px'}}>👥</div>
            <h4 style={{color: '#667eea', marginBottom: '10px'}}>Customers</h4>
            <p>Manage customer accounts</p>
          </div>
        </div>
      </div>
    );
  }
}
export default Home;