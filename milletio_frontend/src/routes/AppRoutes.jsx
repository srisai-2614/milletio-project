import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Products from "../pages/Products";
import About from "../pages/About";
import Contact from "../pages/Contact";
import ProductDetail from "../data/ProductDetail";
import { PrivacyPolicy, GeneralInformation, TermsOfService } from "../components/Policies";
import Cart from "../components/Cart";
import OrderConfirmation from "../components/OrderConfirmation";
import ScrollToTop from "../components/ScrollToTop"; // Import the ScrollToTop component
import FeatureStatus from "../components/FeatureStatus";
const AppRoutes = () => (
  <>
    <ScrollToTop /> {/* Add ScrollToTop component here */}
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/products" element={<Products />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/product/:id" element={<ProductDetail />} />
      <Route path='/Privacy-Policy' element={<PrivacyPolicy/>}/>
      <Route path='/General-Information' element={<GeneralInformation/>}/>
      <Route path='/Terms-of-Service' element={<TermsOfService/>}/>
      <Route path="/cart" element={<Cart />} />
      <Route path="/login" element={<FeatureStatus />} />
      <Route path="/add-recipe" element={<FeatureStatus />} />
      <Route path="/order-confirmation" element={<OrderConfirmation />} />
    </Routes>
  </>
);

export default AppRoutes;