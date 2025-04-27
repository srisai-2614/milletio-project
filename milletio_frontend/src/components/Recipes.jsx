import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import "../styles/Recipes.css";

const Recipes = ({ recipes }) => {
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [activeFilter, setActiveFilter] = useState("All");
  const containerRef = useRef(null);

  const filterOptions = ["All", "Pancake", "Dosa", "Upma", "Nutri Bar"];

  // Only apply filtering when not in expanded view
  const filteredRecipes = expandedIndex !== null 
    ? recipes 
    : (activeFilter === "All" 
        ? recipes 
        : recipes.filter(recipe => recipe.category && recipe.category.includes(activeFilter)));

  const scrollToTop = () => {
    if (containerRef.current) {
      containerRef.current.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    }
  };

  return (
    <section className="recipes-section">
      <motion.h2 
        className="section-title recipe-title"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Delicious Millet Recipes
      </motion.h2>
      
      {/* Filter buttons - Uncomment if you want to use them */}
      <motion.div 
        className="recipe-filters"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {filterOptions.map((filter, index) => (
          <motion.button
            key={filter}
            className={`filter-btn ${activeFilter === filter ? 'active' : ''}`}
            onClick={() => {
              setActiveFilter(filter);
              setExpandedIndex(null); // Close expanded view when filtering
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * index }}
          >
            {filter}
          </motion.button>
        ))}
      </motion.div>

      <div 
        className="recipe-container" 
        ref={containerRef}
        style={{ height: expandedIndex !== null ? '500px' : 'auto', marginTop:'1.2em' }}
      >
        <motion.div 
          className="recipe-card-grid"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {expandedIndex !== null ? (
            // Display only the expanded recipe
            <motion.div 
              className="recipe-card expanded"
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
            >
              <motion.div 
                className="recipe-steps"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <div className="sticky-tab">
                  <span>{recipes[expandedIndex].title}</span>
                  <motion.button 
                    onClick={() => setExpandedIndex(null)} 
                    className="back-btn"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    ← Back
                  </motion.button>
                </div>
                
                <motion.div className="recipe-details">
                  <div className="recipe-ingredients">
                    <h4>Ingredients</h4>
                    <ul>
                      {recipes[expandedIndex].ingredients.map((ingredient, i) => (
                        <motion.li 
                          key={i}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.1 }}
                        >
                          {ingredient}
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="recipe-preparation">
                    <h4>Preparation</h4>
                    <ol className="step-list">
                      {recipes[expandedIndex].steps.map((step, i) => (
                        <motion.li 
                          key={i}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.5 + (i * 0.1) }}
                        >
                          {step}
                        </motion.li>
                      ))}
                    </ol>
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>
          ) : (
            // Display filtered recipe cards
            <>
              {filteredRecipes.map((recipe, index) => (
                <motion.div 
                  className="recipe-card"
                  key={index}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  whileHover={{ y: -10, boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)" }}
                >
                  <div className="recipe-image-container">
                    <img src={recipe.image} alt={recipe.title} className="recipe-image" />
                    {recipe.prepTime && (
                      <div className="recipe-time">
                        <span className="time-icon">⏱</span> {recipe.prepTime}
                      </div>
                    )}
                    {recipe.difficulty && (
                      <div className="recipe-difficulty">
                        {recipe.difficulty}
                      </div>
                    )}
                  </div>
                  <motion.div 
                    className="recipe-info"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    <h3>{recipe.title}</h3>
                    <p className="recipe-description">{recipe.description}</p>
                    <div className="recipe-tags">
                      {recipe.tags && recipe.tags.map((tag, i) => (
                        <span key={i} className="recipe-tag">{tag}</span>
                      ))}
                    </div>
                    <motion.button 
                      className="view-recipe-btn" 
                      onClick={() => {
                        // Find the actual index in the original recipes array
                        const actualIndex = recipes.findIndex(r => r.title === recipe.title);
                        setExpandedIndex(actualIndex);
                        scrollToTop();
                      }}
                      whileHover={{ scale: 1.05, backgroundColor: "#1b5e20" }}
                      whileTap={{ scale: 0.95 }}
                    >
                      View Recipe
                    </motion.button>
                  </motion.div>
                </motion.div>
              ))}
              
              <motion.div 
                className="recipe-card add-recipe-card"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: filteredRecipes.length * 0.1 }}
                whileHover={{ y: -10, boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)" }}
              >
                <div className="add-recipe-content">
                  <div className="add-recipe-icon">+</div>
                  <h3>Share Your Recipe</h3>
                  <p>Got a delicious millet recipe? Share it with our community!</p>
                  <Link to="/add-recipe">
                    <motion.button 
                      className="add-recipe-btn"
                      whileHover={{ scale: 1.05, backgroundColor: "#fb8c00" }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Add Recipe
                    </motion.button>
                  </Link>
                </div>
              </motion.div>
            </>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default Recipes;