import { useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function SavedRecipes()
{
  const { savedrecipes, removerecipe, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () =>
  {
    logout();
    navigate("/signin");
  };

  return (
    <div className="saved-recipes-container">
      <nav className="navbar">
        <div className="nav-logo">
          <h1>PartyMenu</h1>
        </div>
        <div className="nav-links">
          <Link to="/" className="menu-link">
            Back to Menu
          </Link>
          <button onClick={handleLogout} className="logout-btn">
            Logout
          </button>
        </div>
      </nav>

      <div className="saved-header">
        <h2>Your Saved Party Recipes</h2>
        <p>You have {savedrecipes.length} items reserved for your menu layout.</p>
      </div>

      {savedrecipes.length === 0 ? (
        <div className="empty-saved-state">
          <p>No recipes saved yet. Go browse the menu and click Save!</p>
          <Link to="/" className="browse-btn">Browse Menu</Link>
        </div>
      ) : (
        <div className="recipes-grid">
          {savedrecipes.map((recipe) => (
            <div key={recipe.id} className="recipe-card">
              <img src={recipe.image} alt={recipe.name} className="recipe-img" />
              <div className="recipe-info">
                <h3>{recipe.name}</h3>
                <p className="recipe-desc">{recipe.description}</p>
                <span className="recipe-tag">{recipe.category}</span>
                
                <div className="card-actions">
                  <Link to={`/menu/${recipe.id}`} className="view-details-btn">
                    View Recipe
                  </Link>
                  <button
                    onClick={() => removerecipe(recipe.id)}
                    className="remove-btn"
                  >Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}