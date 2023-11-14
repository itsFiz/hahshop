import React from 'react';
import './ProductCards.css'; // Import your CSS file
import blue from './blue-titanium.png'

const ProductCards = () => {
  return (
    <div className="container">
      <div className="card">
        <div className="imgBox">
          <img src={blue} alt="Blue Titanium" />
        </div>
        <div className="contentBox">
          <h2>iPhone 15</h2>
          <h3>Blue Titanium</h3>
          <h5>512GB</h5>
        </div>
        <div className="buy">
          <p>RM5899</p>
          <a href="#">Buy Now</a>
        </div>
      </div>
      <div className="card">
        <div className="imgBox">
          <img src="black-titanium.png" alt="Black Titanium" />
        </div>
        <div className="contentBox">
          <h2>iPhone 15</h2>
          <h3>Black Titanium</h3>
          <h5>512GB</h5>
        </div>
        <div className="buy">
          <p>RM5899</p>
          <a href="#">Buy Now</a>
        </div>
      </div>
      <div className="card">
        <div className="imgBox">
          <img src="natural-titanium.png" alt="Natural Titanium" />
        </div>
        <div className="contentBox">
          <h2>iPhone 15</h2>
          <h3>Natural Titanium</h3>
          <h5>512GB</h5>
        </div>
        <div className="buy">
          <p>RM5899</p>
          <a href="#">Buy Now</a>
        </div>
      </div>
    </div>
  );
};

export default ProductCards;
