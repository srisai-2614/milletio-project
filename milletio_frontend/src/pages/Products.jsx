import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import productData from "../data/ProductData";
import "../styles/BestProducts.css";
import ProductCard from "../components/ProductCard";
import { FiSearch, FiFilter, FiChevronDown } from "react-icons/fi";

const Products = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [filteredProducts, setFilteredProducts] = useState({});
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [animateIn, setAnimateIn] = useState(false);

  // Extract unique categories from product data
  const categories = ["all", ...new Set(
    Object.values(productData.products)
      .map(product => product.category)
      .filter(Boolean)
  )];

  // Handle adding products to cart
  const handleAddToCart = (product) => {
    alert(`${product.name} added to cart!`);
  };

  // Filter products based on search term and category
  useEffect(() => {
    setAnimateIn(false);
    
    // Short delay to allow exit animation
    setTimeout(() => {
      const filtered = Object.entries(productData.products)
        .filter(([id, product]) => {
          // Filter by search term
          const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                              product.description?.toLowerCase().includes(searchTerm.toLowerCase());
          
          // Filter by category
          const matchesCategory = selectedCategory === "all" || product.category === selectedCategory;
          
          return matchesSearch && matchesCategory;
        })
        .reduce((obj, [id, product]) => {
          obj[id] = product;
          return obj;
        }, {});
      
      setFilteredProducts(filtered);
      setAnimateIn(true);
    }, 300);
  }, [searchTerm, selectedCategory]);

  return (
    <section className="page products-page">
      <h2 className="section-title">Our Collection</h2>
      
      {/* Search and Filter Bar */}
      <div className="product-controls">
        <div className="search-container">
          <FiSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
        
        <div className="filter-container">
          <button 
            className="filter-toggle"
            onClick={() => setIsFilterOpen(!isFilterOpen)}
          >
            <FiFilter /> Categories
            <FiChevronDown className={`arrow-icon ${isFilterOpen ? 'open' : ''}`} />
          </button>
          
          <div className={`categories-dropdown ${isFilterOpen ? 'open' : ''}`}>
            {categories.map((category) => (
              <button
                key={category}
                className={`category-button ${selectedCategory === category ? 'active' : ''}`}
                onClick={() => {
                  setSelectedCategory(category);
                  setIsFilterOpen(false);
                }}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>
      
      
      {/* Product Grid */}
      <div className={`product-list-grid ${animateIn ? 'animate-in' : 'animate-out'}`}>
        {Object.keys(filteredProducts).length > 0 ? (
          Object.entries(filteredProducts).map(([id, product]) => (
            <ProductCard
              key={id}
              id={id}
              product={product}
              onAddToCart={handleAddToCart}
              animateIn={animateIn}
            />
          ))
        ) : (
          <div className="no-results">
            <h3>No products found</h3>
            <p>Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Products;