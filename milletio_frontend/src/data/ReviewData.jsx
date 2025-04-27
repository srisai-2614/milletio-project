import React from "react";

export const DefaultMaleAvatar = () => (
  <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <circle cx="50" cy="50" r="50" fill="#E1E8ED" />
    <circle cx="50" cy="40" r="20" fill="#99AAB5" />
    <path d="M50 65 C 30 65, 20 85, 20 95 L 80 95 C 80 85, 70 65, 50 65" fill="#99AAB5" />
  </svg>
);

export const DefaultFemaleAvatar = () => (
  <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <circle cx="50" cy="50" r="50" fill="#F9D7EA" />
    <circle cx="50" cy="40" r="20" fill="#E691B8" />
    <path d="M50 65 C 30 65, 20 85, 20 95 L 80 95 C 80 85, 70 65, 50 65" fill="#E691B8" />
  </svg>
);

export const DefaultUnknownAvatar = () => (
  <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <circle cx="50" cy="50" r="50" fill="#E1E8ED" />
    <circle cx="50" cy="40" r="20" fill="#657786" />
    <path d="M50 65 C 30 65, 20 85, 20 95 L 80 95 C 80 85, 70 65, 50 65" fill="#657786" />
  </svg>
);

// Array of dummy reviews for the home page testimonial carousel


const ReviewData = [
  {
    id: 1,
    user: "Ananya Sharma",
    productName: "Healthy Snacks",
    rating: 5,
    comment: "These organic snacks have transformed my afternoon cravings! Delicious, nutritious, and perfect for my health-conscious lifestyle. I love the natural ingredients and how they keep me energized throughout the day.",
    image: DefaultFemaleAvatar,
    gender: "female"
  },
  {
    id: 2,
    user: "Rajiv Kumar",
    productName: "Breakfast Mixes",
    rating: 5,
    comment: "As a busy professional, these quick breakfast options have been a game-changer. Ready in minutes but taste like they took hours to prepare. The flavors are authentic and remind me of home-cooked meals.",
    image: DefaultMaleAvatar,
    gender: "male"
  },
  {
    id: 3,
    user: "Priya Patel",
    productName: "Nutri Bars",
    rating: 4,
    comment: "Finally found snack bars that my kids love and I feel good about giving them! The natural sweetness and nutrient-dense ingredients make these perfect for school lunches or after-sports energy boosts.",
    image: DefaultFemaleAvatar,
    gender: "female"
  },
  {
    id: 4,
    user: "Arjun Singh",
    productName: "Fitness Range",
    rating: 5,
    comment: "These products have become an essential part of my fitness journey. Great macronutrient profile and clean ingredients that support my workout goals. The taste is exceptional compared to other fitness foods.",
    image: DefaultMaleAvatar,
    gender: "male"
  },
  {
    id: 5,
    user: "Lakshmi Iyer",
    productName: "Traditional Products",
    rating: 5,
    comment: "Living away from home, I miss traditional Indian foods. These mixes give me the authentic taste I crave with minimal effort. The quality and flavors are consistently excellent!",
    image: DefaultFemaleAvatar,
    gender: "female"
  },
  {
    id: 6,
    user: "Vivek Menon",
    productName: "Health Foods",
    rating: 5,
    comment: "After my doctor recommended dietary changes, these products have made the transition so much easier. Delicious, convenient, and genuinely health-focused without compromising on taste.",
    image: DefaultMaleAvatar,
    gender: "male"
  },
];

export default ReviewData;