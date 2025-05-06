import { useState, useEffect } from "react";
import "../styles/Page.css";
import "../styles/Carousel.css";
import "../styles/WhyMilletio.css";
import slide1 from './assets/Poster_AllProductscombo.png';
import slide2 from './assets/Multi_millet_video.mp4';
import slide3 from './assets/nutri bars wedsite poster.png';
import slide4 from './assets/Spinach_Dosa_video.mp4';
import "../styles/BestProducts.css";
import "../styles/ProductDetail.css";
import ProductData from "../data/ProductData";
import "../styles/ProductCard.css";
import BestSellersSection from "../components/BestSellersSection";
import Recipes from "../components/Recipes";
import FeaturedVideo from "../components/FeaturedVideo";
import TestimonialCarousel from "../components/Review";
import ComboCarousel from "../components/ComboCarousel";
import { Card } from "flowbite-react";
import Article from "../components/Article";
import recipeList from "../data/ReceipeList";
import WhyChooseMillet from "../components/WhyChooseMillet";
import { useCart } from "../contexts/CartContext";

// Define carousel items with proper product information
const carouselItems = [
  { 
    type: "image", 
    src: slide1, 
    alt: "Offer 1", 
    itemType: "combo", 
    id: 4,
    name: "Nutri Bar Power Pack",
    price: 990,
    originalPrice: 1099
  },
  { 
    type: "image", 
    src: slide3, 
    alt: "Offer 2", 
    itemType: "combo", 
    id: 5,
    name: "Nutri Bars Combo",
    price: 499,
    originalPrice: 550
  },
  { 
    type: "video", 
    src: slide2, 
    alt: "Promo Video", 
    itemType: "product", 
    id: 3,
    name: "Multi Millet Mix",
    price: 149,
    originalPrice: 169,
    weight: "200g"
  },
  { 
    type: "video", 
    src: slide4, 
    alt: "Promo Video", 
    itemType: "product", 
    id: 4,
    name: "Spinach Dosa Mix",
    price: 119,
    originalPrice: 139,
    weight: "200g"
  }
];

const Home = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState('');
  const [animating, setAnimating] = useState(false);
  
  // Get addToCart function from context
  const { addToCart } = useCart();

  // Handle adding carousel item to cart
  const handleAddToCart = (item) => {
    if (!item) return;
    
    // Different handling based on item type
    if (item.itemType === "combo") {
      // For combos, we'll try to find the combo in ProductData
      const comboData = ProductData.comboData.find(combo => combo.id === item.id);
      
      if (comboData) {
        const comboProduct = {
          id: `combo-${comboData.id}`,
          name: comboData.name,
          price: comboData.price,
          regularPrice: comboData.regularPrice,
          image: comboData.components[0]?.image || item.src, 
          weight: `${comboData.components.length} items`,
          type: 'combo',
          quantity: 1,
          components: comboData.components,
          freeItems: comboData.freeItems || []
        };
        addToCart(comboProduct);
      } else {
        // Fallback if combo not found in ProductData
        addToCart({
          id: `combo-${item.id}`,
          name: item.name,
          price: item.price,
          originalPrice: item.originalPrice,
          image: item.src,
          weight: "Combo Package",
          type: 'combo',
          quantity: 1
        });
      }
    } else {
      // For regular products
      const product = ProductData.products.find(p => p.id === item.id);
      
      if (product) {
        // Use the full product data from ProductData
        addToCart({
          ...product,
          quantity: 1 
        });
      } else {
        // Fallback if product not found in ProductData
        addToCart({
          id: item.id,
          name: item.name,
          price: item.price,
          originalPrice: item.originalPrice,
          image: item.src,
          weight: item.weight || "Standard",
          quantity: 1
        });
      }
    }
    
    console.log("Added to cart:", item.name);
  };

  const goToPrev = () => {
    if (animating) return;
    setAnimating(true);
    setDirection('prev');
    setCurrentIndex((prev) => (prev - 1 + carouselItems.length) % carouselItems.length);
  };

  const goToNext = () => {
    if (animating) return;
    setAnimating(true);
    setDirection('next');
    setCurrentIndex((prev) => (prev + 1) % carouselItems.length);
  };

  // For dot navigation
  const goToSlide = (index) => {
    if (animating || index === currentIndex) return;
    setAnimating(true);
    setDirection(index > currentIndex ? 'next' : 'prev');
    setCurrentIndex(index);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimating(false);
    }, 700); // Slightly longer than animation to ensure completion
    
    return () => clearTimeout(timer);
  }, [currentIndex]);

  return (
    <section className="page">
    <section className="page">
      <div className="carousel_container">
        <div className="carousel">
          {carouselItems.map((item, idx) => (
            <div 
              key={idx} 
              className={`carousel-item-container ${idx === currentIndex ? 'active ' + direction : ''}`}
            >
              {item.type === "image" ? (
                <img src={item.src} alt={item.alt} className="carousel-item" />
              ) : (
                <video src={item.src} className="carousel-item" autoPlay muted loop />
              )}
              
              {/* Product Info */}
              <div className="product-info">
                <div className="product-name">{item.name}</div>
              </div>
              
              {/* Add to Cart Button */}
              <button 
                className="add-btn"
                onClick={() => handleAddToCart(carouselItems[currentIndex])}
              >
                Add to Cart
              </button>
            </div>
          ))}
          <button className="carousel-btn prev" onClick={goToPrev}>&#10094;</button>
          <button className="carousel-btn next" onClick={goToNext}>&#10095;</button>
        </div>

        <div className="carousel-dots">
          {carouselItems.map((_, idx) => (
            <span
              key={idx}
              className={`dot ${idx === currentIndex ? "active" : ""}`}
              onClick={() => goToSlide(idx)}
            ></span>
          ))}
        </div>
      </div>
    </section>
      <section className="page">
      <WhyChooseMillet/>
      </section>

      <section className="page" >
        <BestSellersSection
            products={ProductData.products}
        />
      </section>
      <section>
        <Recipes recipes={recipeList}/>
      </section>
      <section style={{marginTop:'2.3em', textAlign:'center'}}>
      <h2>Try out Popular Combos</h2>
        <ComboCarousel combos={ProductData.comboData}/>
      </section>
      
      {/* <section>
        <FeaturedVideo/>
      </section> */}
      {/* <section className="page">
          <div className='Projects'>
        <h3 className='Project-head' style={{fontFamily:"Dancing Script"}}>Hurry and Try out our recipes 👉</h3>        
              <Recipes className='card'  color={"#000000"} title={"Blood-Buddy"} description1={"Blood-Buddy is an innovative Blood Donor platform that streamlines the connection between donors and recipients.Our website prioritizes privacy and offers an intuitive user experience, fostering a dedicated community committed to saving lives."} link={"https://github.com/srisai-2614/Blood-Buddy"} Image={image}/>    
              <Recipes className='card' color={"#000000"} title={"Collaborative Text Editor"} description1={"Our Collaborative Text Editor,empowers multiple users to seamlessly work on a single document in real-time. Effortlessly edit, share, and save your work and witness live updates."}   description2={""} link={"https://github.com/srisai-2614/docsclone"} Image={image}/>
              <Recipes className='card' color={"#000000"} title={"Sorting Visualizer"} description1={"The Sorting Visualizer project is an interactive web application that visually demonstrates various sorting algorithms in real-time. Users can choose from algorithms and can observe the sorting process through a dynamic graphical representation."} link={"https://github.com/srisai-2614/Sorting-Visualizer"}   description2={""} Image={image}/>
              <Recipes className='card'  color={"#000000"} title={"Tom vs Jerry Tic-Tac-Toe"} description1={"Play Tic-Tac-Toe with a twist in this cat-and-mouse showdown. Be Jerry, outsmart Tom, and enjoy character-specific messages for an entertaining game,bring the classic rivalry to life in a delightful match."}   description2={""} link={"https://github.com/srisai-2614/tic-tac-toe"} Image={image}/>
              <Recipes className='card' color={"#000000"} title={"Weather Checker"} description1={"Weather Checker web app, developed using React and the OpenWeather API, provides up-to-the-minute weather data for cities across the globe and We can stay informed about weather conditions."}   description2={""} link={"https://github.com/srisai-2614/weatherapp"} Image={image}/>
        </div>
      </section> */}
      <section style={{marginTop:'2.3em', textAlign:'center'}}>
      <h2>Featured Articles</h2>
        <Article/>
      </section>
      <section>
        <TestimonialCarousel />
      </section>
    </section>
  );
};

export default Home;