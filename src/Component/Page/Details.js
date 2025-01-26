import React from 'react';
import './Detail.page.css'; // Ensure the file path is correct

function Details({ selectedProduct, handleCloseModal }) {
  if (!selectedProduct) return null; // Don't render if no product is selected

  return (
    <div className="overlay">
      <div className="modal">
        <button onClick={handleCloseModal} className="close-button" style={{background:'#54bdd9  '}}>
          X
        </button>
        <h2>{selectedProduct.title}</h2>
        <img
          src={selectedProduct.image}
          alt={selectedProduct.title}
          style={{ width: '200px', marginBottom: '10px' }}
        />
        <p>{selectedProduct.description}</p>
        <p>Price: ${selectedProduct.price}</p>
        <p>
          Rating: {selectedProduct.rating.rate} ({selectedProduct.rating.count} reviews)
        </p>
      </div>
    </div>
  );
}

export default Details;
