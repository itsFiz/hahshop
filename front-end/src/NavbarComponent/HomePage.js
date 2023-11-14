import React from 'react';

const contentStyles = {
  width: '100%',
  position: 'absolute',
  top: '30%',
};

const leftColStyles = {
  marginLeft: '10%',
};

const h1Styles = {
  fontSize: '40px',
  color: 'white',
};

const spanStyles = {
  color: '#3498db',
};

const rightColStyles = {
  display: 'flex',
  alignItems: 'center',
  float: 'right',
  padding: '15px 40px',
  marginRight: '75%',
  marginTop: '200px',
  fontSize: '30px',
  color: 'white',
  fontWeight: 600,
  border: '2px solid white',
  borderRadius: '2em',
};

const HomePage = () => {
  return (
    <div style={contentStyles}>
      <div style={leftColStyles}>
        <h1>
          Shopping with a<span style={spanStyles}> HAH! </span>
          <br /> Where Every Purchase Sparks Joy
        </h1>
      </div>
      <img src="hah.png" alt="HAH Logo" className="hah" />
      <div style={rightColStyles}>
        <p>Shop Now</p>
      </div>
    </div>
  );
};

export default HomePage;
