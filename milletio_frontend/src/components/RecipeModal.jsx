import { useState } from "react";
import "../styles/RecipeModal.css";

const stickyColors = ["#F9A825", "#FF7043", "#66BB6A", "#29B6F6", "#AB47BC"];

const RecipeModal = ({ recipe, onClose }) => {
  const [tab, setTab] = useState("recipe");

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="recipe-modal" onClick={(e) => e.stopPropagation()}>
        <div className="sticky-tab" style={{ backgroundColor: stickyColors[Math.floor(Math.random() * stickyColors.length)] }}>
          <span onClick={() => setTab("recipe")} className={tab === "recipe" ? "active" : ""}>📋 Recipe</span>
          <span onClick={() => setTab("image")} className={tab === "image" ? "active" : ""}>🖼 Image</span>
          <button onClick={onClose} className="close-btn">✕</button>
        </div>

        <div className="modal-content">
          {tab === "recipe" ? (
            <div className="modal-recipe-text">
              <h2>{recipe.title}</h2>
              <p>{recipe.fullRecipe}</p>
            </div>
          ) : (
            <img src={recipe.image} alt={recipe.title} className="modal-image" />
          )}
        </div>
      </div>
    </div>
  );
};

export default RecipeModal;
