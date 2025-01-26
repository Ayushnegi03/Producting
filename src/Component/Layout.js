
import React, { useState } from 'react';
import useProducts from '../Hooks/useproducts';
import Details from './Page/Details';
import SearchBar from './SearchBar';

function Layout() {
  const { products, loading, error } = useProducts(); 
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(5);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProducts, setFilteredProducts] = useState(products);


  React.useEffect(() => {
    if (products) {
      const filtered = products.filter((product) =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredProducts(filtered);
    }
  }, [products, searchTerm]);

  const handleShowDetails = (product) => {
    setSelectedProduct(product); 
  };

  const handleCloseModal = () => {
    setSelectedProduct(null); 
  };

  const handleSearch = (query) => {
    setSearchTerm(query);
    setCurrentPage(1); 
  };

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!Array.isArray(filteredProducts)) return <div>No products found</div>;

  return (
    <div>
   <div
  style={{
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: '20px 0',
  }}
>
  <h1 style={{ flex: 2, textAlign: 'center', margin: 3 }}>Product List</h1>
  <SearchBar searchTerm={searchTerm} onSearch={handleSearch} />
</div>

      <table style={{ width: '100%', borderCollapse: 'collapse', tableLayout: 'fixed' }}>
      
        <thead>
          <tr>
            <th style={{ border: '1px solid #ddd', padding: '8px', width: '15%' }}>Image</th>
            <th style={{ border: '1px solid #ddd', padding: '8px', width: '50%' }}>Title</th>
            <th style={{ border: '1px solid #ddd', padding: '8px', width: '20%' }}>Price</th>
            <th style={{ border: '1px solid #ddd', padding: '8px', width: '15%' }}>Action</th>
          </tr>
        </thead>
        <tbody>
          {currentProducts.map((product) => (
            <tr key={product.id}>
              <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'center' }}>
                <div
                  style={{
                    width: '70px',
                    height: '82px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    overflow: 'hidden',
                    margin: '0 auto',
                  }}
                >
                  <img
                    src={product.image}
                    alt={product.title}
                    style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                  />
                </div>
              </td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{product.title}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>${product.price}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'center' }}>
                <button
                  onClick={() => handleShowDetails(product)}
                  style={{ background: '#54bdd9', color: '#fff', border: 'none', padding: '5px 10px', borderRadius: '5px' }}
                >
                  View Details
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div style={{ marginTop: '20px', textAlign: 'center' }}>
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span style={{ margin: '0 10px' }}>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>

      {selectedProduct && (
        <Details selectedProduct={selectedProduct} handleCloseModal={handleCloseModal} />
      )}
    </div>
  );
}

export default Layout;
