import React, { Component } from 'react';

class Gmap extends Component {
  render() {
    return (
      <div className="align-center">
        <h2 className="text-center">MY LOCATION</h2>
        <iframe
          title="gmap"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d11083.042884304341!2d106.6767450898744!3d10.85353675321546!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317529bac3a7e5b5%3A0x753f760e776d7cc1!2sR.P.G%20Fitness%20Studio!5e0!3m2!1svi!2s!4v1721226536461!5m2!1svi!2s"
          width="800"
          height="600"
          style={{ border: 0 }}
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    );
  }
}

export default Gmap;