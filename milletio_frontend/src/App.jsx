import AppRoutes from "./routes/AppRoutes";
import Navbar from "./layouts/Navbar";
import Footer from "./layouts/Footer";
import "./App.css";
import { CartProvider } from "./contexts/CartContext";

function App() {
  return (
    <CartProvider>
      <div className="app-container">
      {/* <div className="marquee-wrapper">
        <div className="marquee">
          🌾 Welcome to our millet-based store — Healthy food, happy life! 🌱 &nbsp;
        </div>
      </div> */}
      <Navbar />
      <main className="main-content">
        <AppRoutes />
      </main>
     
      <Footer />
    </div>
    </CartProvider>
    
  );
}

export default App;