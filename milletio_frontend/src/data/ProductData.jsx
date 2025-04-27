import Vanilla_Front from '../pages/assets/Vanilla_Pancake-front.jpg';
import Vanilla_Back from '../pages/assets/Vanilla_Pancake-back.jpg';
import Vanilla_Image3 from "../pages/assets/vanilla_pan_cake-img3.png";
import Ragi_Front from "../pages/assets/Ragi_Pancake-front.jpg";
import Ragi_Back from "../pages/assets/Ragi_Pancake-back.jpg";
import Ragi_Image3 from "../pages/assets/ragi_pancake-img3.png";
import Multi_millet_Front from '../pages/assets/Multimillet_Dosa-front.jpg';
import Multi_millet_Back from "../pages/assets/Multimillet_Dosa-back.jpg";
import Multi_millet_Image3 from '../pages/assets/Multi_millet_image3.png';
import Spinach_Front from "../pages/assets/Spinach_Dosa-front.jpg";
import Spinach_Back from '../pages/assets/Spinach_Dosa-back.jpg';
import Spinach_Image3 from '../pages/assets/Spinach_Dosa_Image3.png';

import Millet_Upma_front from "../pages/assets/Millet_Upma-front.jpg";
import Millet_Upma_back from "../pages/assets/Millet_Upma-back.jpg";

import Almond_bar from '../pages/assets/Almond_Coffee_Bar.jpg';
import Almond_bar_Image2 from "../pages/assets/Almond_bar-img2.png";
import Almond_bar_Image3 from "../pages/assets/Almond_bar-img-3.png";
import Berry_bar from '../pages/assets/Choco_berry_Bar.jpg';
import Berry_bar_Image2 from "../pages/assets/berry_bar-img2.png";
import Berry_bar_Image3 from "../pages/assets/berry_bar-img3.png";
import Nutty_bar from '../pages/assets/Nutty_Delight_Bar.jpg';
import Nutty_bar_Image2 from "../pages/assets/Nutty_Image2.png";
import Nutty_bar_Image3 from "../pages/assets/Nutty_bar-img3.png";
import Sesame_bar from '../pages/assets/Sesame_Date_Bar.jpg';
import Sesame_bar_Image2 from "../pages/assets/sesame_bar_img2.png";
import Sesame_bar_Image3 from "../pages/assets/sesame_bar-img-3.png";
import Spinach_Video from "../pages/assets/Spinach_Dosa_Video.mp4";
import Multi_millet_Video from "../pages/assets/Multi_millet_video.mp4";

export const products = [
  {
    id: 1,
    name: "Vanilla Pancake Mix",
    shortName: "Vanilla Pancake",
    description: "A delicious and easy-to-prepare vanilla flavored pancake mix. Perfect for a quick breakfast or brunch option. Made with premium ingredients for fluffy, tasty pancakes every time.",
    longDescription: "Our Vanilla Pancake Mix is crafted with the finest ingredients to give you restaurant-quality pancakes at home. The delicate vanilla flavor pairs perfectly with maple syrup, fresh fruits, or chocolate chips. Each batch is carefully formulated to deliver consistent fluffiness and taste every time you prepare it. Simply add water or milk, mix, and cook for a delightful breakfast experience in minutes.",
    weight: "200g",
    price: 149,
    originalPrice: 199,
    category: "Pancake Mix",
    images: {
      front: Vanilla_Front,
      back: Vanilla_Back,
      image_3: Vanilla_Image3
    },
    nutritionalInfo: {
      calories: "380 kcal per 100g",
      protein: "8g per 100g",
      carbs: "68g per 100g",
      fat: "9g per 100g",
      fiber: "3g per 100g",
      sugar: "15g per 100g"
    },
    ingredients: "Whole wheat flour, Vanilla extract, Sugar, Baking powder, Salt",
    preparationTime: "5 minutes",
    inStock: true,
    highlights: [
      "Natural vanilla flavor",
      "No artificial preservatives",
      "Quick and easy preparation",
      "High in protein"
    ],
    usageInstructions: [
      "Mix 50g of pancake mix with 100ml of milk or water",
      "Let the batter rest for 1-2 minutes",
      "Heat a non-stick pan and add a little oil or butter",
      "Pour a small amount of batter and cook until bubbles form on top",
      "Flip and cook for another 1-2 minutes until golden brown"
    ],
    benefits: [
      "Good source of whole grains",
      "Quick breakfast solution",
      "Versatile - add fruits or nuts for variation",
      "Perfect for family breakfasts"
    ],
    reviews: [
      {
        user: "Aarav Sharma",
        rating: 5,
        date: "March 15, 2025",
        comment: "The vanilla flavor is perfect - not too strong, not too weak. Makes delicious pancakes every time!"
      },
      {
        user: "Priya Patel",
        rating: 4,
        date: "February 22, 2025",
        comment: "My kids love these pancakes. I wish the pack was larger though!"
      },
      {
        user: "Rahul Verma",
        rating: 5,
        date: "January 30, 2025",
        comment: "So convenient for busy mornings. Just add water and you get perfect pancakes."
      }
    ]
  },
  {
    id: 2,
    name: "Ragi Choco Pancake Mix",
    shortName: "Ragi Pancake",
    description: "A nutritious blend of ragi (finger millet) and chocolate, this pancake mix offers a healthy twist to traditional pancakes. Rich in calcium and dietary fiber with the goodness of chocolate.",
    longDescription: "Our Ragi Choco Pancake Mix combines the nutritional benefits of ragi (finger millet) with the irresistible taste of chocolate. Ragi is known for its high calcium content and dietary fiber, making this pancake mix not just delicious but also nutritious. The chocolate flavor comes from organic cocoa powder, giving the pancakes a rich taste without excessive sweetness. Perfect for health-conscious individuals who don't want to compromise on taste.",
    weight: "200g",
    price: 149,
    originalPrice: 179,
    category: "Pancake Mix",
    images: {
      front: Ragi_Front,
      back: Ragi_Back,
      image_3: Ragi_Image3
    },
    nutritionalInfo: {
      calories: "360 kcal per 100g",
      protein: "9g per 100g",
      carbs: "62g per 100g",
      fat: "8g per 100g",
      calcium: "250mg per 100g",
      iron: "3mg per 100g"
    },
    ingredients: "Ragi flour, Cocoa powder, Whole wheat flour, Sugar, Baking powder, Salt",
    preparationTime: "5 minutes",
    inStock: true,
    highlights: [
      "Rich in calcium from ragi",
      "High in dietary fiber",
      "Authentic chocolate flavor",
      "No artificial colors or flavors"
    ],
    usageInstructions: [
      "Mix 50g of pancake mix with 120ml of milk or water",
      "Let the batter rest for 2-3 minutes",
      "Heat a non-stick pan and add a little oil or butter",
      "Pour a small amount of batter and cook until bubbles form on top",
      "Flip and cook for another 1-2 minutes until cooked through"
    ],
    benefits: [
      "Excellent source of calcium for bone health",
      "Ragi helps with blood sugar management",
      "Natural chocolate flavor satisfies sweet cravings",
      "High in dietary fiber for gut health"
    ],
    reviews: [
      {
        user: "Aditya Khanna",
        rating: 5,
        date: "April 10, 2025",
        comment: "Perfect balance of chocolate and ragi. Even my kids love it!"
      },
      {
        user: "Nisha Mehta",
        rating: 4,
        date: "March 18, 2025",
        comment: "Love the nutritional profile. The taste is good but could use a bit more chocolate flavor."
      },
      {
        user: "Vikram Singh",
        rating: 5,
        date: "February 5, 2025",
        comment: "As a fitness enthusiast, I appreciate this healthy alternative to regular pancakes."
      },
      {
        user: "Meera Reddy",
        rating: 3,
        date: "January 12, 2025",
        comment: "Good nutritional value but requires more liquid than stated in the instructions."
      }
    ]
  },
  {
    id: 3,
    name: "Multi Millet Dosa Mix",
    shortName: "Millet Dosa",
    description: "A wholesome dosa mix made with multiple varieties of millets. This ready-to-cook mix helps you prepare crispy, nutritious dosas quickly. Perfect for busy mornings or evening snacks.",
    longDescription: "Our Multi Millet Dosa Mix brings together the goodness of various traditional millets to create a nutritious and delicious alternative to regular dosas. The mix includes pearl millet, finger millet, and foxtail millet, combined with the right proportion of rice and urad dal for authentic taste and texture. The millets provide an excellent source of complex carbohydrates, proteins, and essential minerals, making this dosa mix a powerhouse of nutrition. The dosas cook to a perfect golden-brown crispiness with soft interiors.",
    weight: "200g",
    price: 119,
    originalPrice: 149,
    category: "Dosa Mix",
    images: {
      front: Multi_millet_Front,
      back: Multi_millet_Back,
      image_3: Multi_millet_Image3
    },
    videos: {
      v_one: Multi_millet_Video
    },
    nutritionalInfo: {
      calories: "340 kcal per 100g",
      protein: "10g per 100g",
      carbs: "65g per 100g",
      fat: "5g per 100g",
      fiber: "7g per 100g",
      iron: "4mg per 100g"
    },
    ingredients: "Pearl millet, Finger millet, Foxtail millet, Rice, Urad dal, Spices",
    preparationTime: "5 minutes (plus soaking time if required)",
    inStock: true,
    highlights: [
      "Blend of 3 nutritious millets",
      "High in dietary fiber",
      "Rich in minerals and antioxidants",
      "Authentic South Indian taste"
    ],
    usageInstructions: [
      "Mix 100g of dosa mix with 250ml of water",
      "Let the batter rest for 5-10 minutes (or overnight for fermentation)",
      "Heat a dosa tawa or flat pan and grease lightly",
      "Pour a ladle of batter and spread in a circular motion",
      "Cook on medium heat until the edges start to lift",
      "Flip and cook for another minute",
      "Serve hot with chutney or sambar"
    ],
    benefits: [
      "Rich in complex carbohydrates for sustained energy",
      "High in dietary fiber for improved digestion",
      "Good source of plant-based protein",
      "Contains essential minerals like iron, calcium, and zinc"
    ],
    reviews: [
      {
        user: "Lakshmi Iyer",
        rating: 5,
        date: "April 5, 2025",
        comment: "Tastes just like traditional dosas but with the added benefits of millets. Crispy texture and delicious flavor!"
      },
      {
        user: "Karthik Narayanan",
        rating: 5,
        date: "March 27, 2025",
        comment: "Perfect alternative to rice dosas. My family can't tell the difference but loves the health benefits."
      },
      {
        user: "Sheela Ganesh",
        rating: 4,
        date: "February 15, 2025",
        comment: "Great taste and texture. I add some chopped onions and green chilies to the batter for extra flavor."
      }
    ]
  },
  {
    id: 4,
    name: "Spinach Dosa Mix",
    shortName: "Spinach Dosa",
    description: "A unique and nutritious dosa mix enriched with the goodness of spinach. This instant mix helps you prepare healthy, green dosas with a mild spinach flavor. A great way to include greens in your diet.",
    longDescription: "Our Spinach Dosa Mix is a unique blend that incorporates the nutritional benefits of spinach into the traditional dosa. The dehydrated spinach powder gives these dosas their distinctive green color and adds a mild, pleasant flavor that complements the traditional dosa taste. This mix is an excellent way to incorporate leafy greens into your diet, especially for children or those who typically avoid vegetables. The dosas cook to a beautiful green color with golden-brown spots and maintain the classic crispy texture of traditional dosas.",
    weight: "200g",
    price: 119,
    originalPrice: 139,
    category: "Dosa Mix",
    images: {
      front: Spinach_Front,
      back: Spinach_Back,
      image_3: Spinach_Image3
    },
    videos: {
      v_one: Spinach_Video
    },
    nutritionalInfo: {
      calories: "320 kcal per 100g",
      protein: "12g per 100g",
      carbs: "60g per 100g",
      fat: "4g per 100g",
      iron: "5mg per 100g",
      vitamin_a: "500 IU per 100g",
      fiber: "6g per 100g"
    },
    ingredients: "Rice flour, Dried spinach powder, Urad dal flour, Salt, Spices",
    preparationTime: "5 minutes",
    inStock: true,
    highlights: [
      "Enriched with real spinach",
      "High in iron and vitamin A",
      "Natural green color",
      "No artificial flavors or preservatives"
    ],
    usageInstructions: [
      "Mix 100g of dosa mix with 220ml of water",
      "Let the batter rest for 5 minutes",
      "Heat a dosa tawa or flat pan and grease lightly",
      "Pour a ladle of batter and spread in a circular motion",
      "Cook on medium heat until the edges start to lift",
      "Flip and cook for another minute",
      "Serve hot with coconut chutney or sambar"
    ],
    benefits: [
      "Excellent way to include greens in your diet",
      "Rich in iron for better hemoglobin levels",
      "Source of vitamin A for improved vision and immunity",
      "High protein content from urad dal and spinach"
    ],
    reviews: [
      {
        user: "Anjali Desai",
        rating: 5,
        date: "April 12, 2025",
        comment: "Finally found a way to get my kids to eat spinach! They love the color and don't even realize they're eating vegetables."
      },
      {
        user: "Rajat Kumar",
        rating: 4,
        date: "March 20, 2025",
        comment: "Great concept and good taste. The spinach flavor is subtle which works well with different chutneys."
      },
      {
        user: "Pooja Singh",
        rating: 5,
        date: "February 28, 2025",
        comment: "As someone with low iron levels, I appreciate this product. Tastes great and helps me include more iron in my diet."
      },
      {
        user: "Dinesh Rao",
        rating: 3,
        date: "January 5, 2025",
        comment: "Good product but needs more water than mentioned on the package to get the right consistency."
      }
    ]
  },
  {
    id: 5,
    name: "Instant Upma Mix",
    shortName: "Upma Mix",
    description: "A traditional South Indian breakfast made easy. This instant upma mix lets you prepare delicious, savory upma in minutes. Made with high-quality semolina and carefully selected spices.",
    longDescription: "Our Instant Upma Mix brings the authentic taste of South Indian upma to your table with minimal effort. We use premium quality semolina (rava) combined with millet grains for added nutrition, and a carefully balanced blend of spices and dehydrated vegetables. The mix is pre-roasted to save you time and ensure consistent flavor every time. Just add hot water, and in minutes you'll have a steaming bowl of aromatic, savory upma - perfect for breakfast or a quick snack any time of day.",
    weight: "200g",
    price: 149,
    originalPrice: 169,
    category: "Breakfast Mix",
    images: {
      front: Millet_Upma_front,
      back: Millet_Upma_back,

    },
    nutritionalInfo: {
      calories: "350 kcal per 100g",
      protein: "11g per 100g",
      carbs: "70g per 100g",
      fat: "5g per 100g",
      fiber: "5g per 100g",
      sodium: "300mg per 100g"
    },
    ingredients: "Roasted semolina, Millet, Dried vegetables (carrots, peas, onions), Mustard seeds, Curry leaves, Turmeric, Salt, Spices",
    preparationTime: "3-5 minutes",
    inStock: true,
    highlights: [
      "Ready in just 5 minutes",
      "Authentic South Indian taste",
      "Enhanced with nutritious millets",
      "Contains real vegetables"
    ],
    usageInstructions: [
      "Boil 250ml of water in a pan",
      "Add 100g of upma mix while stirring continuously",
      "Reduce heat to low and cover with a lid",
      "Cook for 2-3 minutes, stirring occasionally",
      "Turn off heat and let it rest for 1 minute",
      "Add a teaspoon of ghee or butter (optional) and mix well",
      "Serve hot with coconut chutney or pickle"
    ],
    benefits: [
      "Quick and convenient breakfast option",
      "Good source of complex carbohydrates",
      "Moderate protein content from semolina and millets",
      "Balanced spice blend aids digestion"
    ],
    reviews: [
      {
        user: "Suresh Menon",
        rating: 5,
        date: "April 15, 2025",
        comment: "Tastes just like homemade upma but so much quicker to prepare. Perfect for busy mornings!"
      },
      {
        user: "Anita Joshi",
        rating: 4,
        date: "March 10, 2025",
        comment: "Good flavor and texture. I add some fresh coriander and a squeeze of lemon at the end for extra freshness."
      },
      {
        user: "Venkat Rao",
        rating: 5,
        date: "February 22, 2025",
        comment: "As a bachelor with limited cooking skills, this product is a lifesaver. Tasty, nutritious, and incredibly easy to make."
      }
    ]
  },
  {
    id: 6,
    name: "Almond Coffee Bliss Nutri Bar",
    shortName: "Almond Coffee Bar",
    description: "A delicious and energizing nutri bar made with premium almonds and real coffee. Perfect for a quick energy boost during the day or as a post-workout snack. Each bar is packed with nutrients and flavor.",
    longDescription: "Our Almond Coffee Bliss Nutri Bar combines the rich flavor of freshly ground coffee with the crunchy goodness of premium California almonds. Sweetened naturally with dates, this bar provides a perfect balance of protein, healthy fats, and complex carbohydrates. The subtle coffee infusion not only adds a distinctive flavor but also provides a gentle energy boost without the crash associated with caffeine drinks. These bars are individually wrapped for freshness and convenience, making them perfect for on-the-go snacking, pre-workout energy, or a satisfying treat with your afternoon coffee.",
    weight: "50g",
    price: 89,
    originalPrice: 99,
    category: "Nutri Bar",
    images: {
      front: Almond_bar,
      image_2: Almond_bar_Image2,
      image_3: Almond_bar_Image3,
    },
    nutritionalInfo: {
      calories: "220 kcal per bar",
      protein: "8g per bar",
      carbs: "24g per bar",
      fat: "12g per bar",
      fiber: "5g per bar",
      caffeine: "30mg per bar"
    },
    ingredients: "Almonds, Dates, Coffee extract, Honey, Oats",
    shelfLife: "6 months",
    inStock: true,
    highlights: [
      "Made with premium California almonds",
      "Contains real coffee extract",
      "No artificial sweeteners or preservatives",
      "High protein, energy-dense snack"
    ],
    usageInstructions: [
      "Consume as is for a quick energy boost",
      "Best enjoyed with coffee or tea",
      "Ideal for pre or post-workout nutrition",
      "Store in a cool, dry place"
    ],
    benefits: [
      "Natural energy from coffee and complex carbs",
      "Protein for muscle recovery and satiety",
      "Healthy fats from almonds for sustained energy",
      "Convenient on-the-go nutrition"
    ],
    reviews: [
      {
        user: "Rahul Kapoor",
        rating: 5,
        date: "April 8, 2025",
        comment: "Perfect energy bar for my morning workouts. Love the coffee flavor!"
      },
      {
        user: "Neha Gupta",
        rating: 4,
        date: "March 25, 2025",
        comment: "Great taste and keeps me full. Would love a slightly larger size."
      },
      {
        user: "Amit Shah",
        rating: 5,
        date: "February 12, 2025",
        comment: "As a coffee lover, this bar is heaven. Nice texture and not too sweet."
      }
    ]
  },
  {
    id: 7,
    name: "Sesame Date Fusion Nutri Bar",
    shortName: "Sesame Date Bar",
    description: "A wholesome nutri bar that combines the goodness of sesame seeds and dates. This fusion bar offers a perfect balance of sweetness and nuttiness. An excellent source of energy, calcium, and iron.",
    longDescription: "Our Sesame Date Fusion Nutri Bar brings together the ancient superfood sesame seeds with naturally sweet dates to create a nutritious and delicious snack. Sesame seeds are packed with calcium, iron, and healthy oils, while dates provide natural sweetness and quick energy. This bar has a distinctive nutty flavor with a hint of sweetness and a satisfying chewy texture. Perfect for those who prefer a less sweet energy bar option while still getting all the nutritional benefits of a premium snack bar.",
    weight: "50g",
    price: 65,
    originalPrice: 80,
    category: "Nutri Bar",
    images: {
      front: Sesame_bar,
      image_2: Sesame_bar_Image2,
      image_3: Sesame_bar_Image3
    },
    nutritionalInfo: {
      calories: "190 kcal per bar",
      protein: "6g per bar",
      carbs: "22g per bar",
      fat: "9g per bar",
      calcium: "150mg per bar",
      iron: "3mg per bar",
      fiber: "4g per bar"
    },
    ingredients: "Sesame seeds, Dates, Honey, Puffed rice, Cinnamon",
    shelfLife: "6 months",
    inStock: true,
    highlights: [
      "Rich in calcium from sesame seeds",
      "Good source of iron",
      "Natural sweetness from dates",
      "No added refined sugar"
    ],
    usageInstructions: [
      "Consume as is for a quick energy boost",
      "Pairs well with tea or as a mid-day snack",
      "Store in a cool, dry place",
      "Can be crumbled over yogurt for added texture and nutrition"
    ],
    benefits: [
      "Excellent plant-based source of calcium",
      "Iron content helps maintain healthy hemoglobin levels",
      "Provides quick and sustained energy from natural carbs",
      "Sesame seeds support bone health and immunity"
    ],
    reviews: [
      {
        user: "Sanjay Mehta",
        rating: 5,
        date: "April 5, 2025",
        comment: "Love the nutty flavor of sesame seeds paired with the sweetness of dates. Not too sweet like other bars!"
      },
      {
        user: "Meera Patel",
        rating: 4,
        date: "March 15, 2025",
        comment: "Great nutritional profile. I have one every day with my morning tea."
      },
      {
        user: "Arjun Singh",
        rating: 5,
        date: "February 20, 2025",
        comment: "As someone with low iron, I appreciate this natural iron-rich snack option."
      }
    ]
  },
  {
    id: 8,
    name: "Nutty Choco Delight Nutri Bar",
    shortName: "Nutty Choco Bar",
    description: "A decadent yet nutritious bar featuring a blend of nuts and rich chocolate. This nutri bar satisfies sweet cravings while providing essential nutrients. Perfect for chocolate lovers who want a healthier option.",
    longDescription: "Our Nutty Choco Delight Nutri Bar offers the perfect balance of indulgence and nutrition. We've combined a variety of premium nuts including almonds, walnuts, and cashews with high-quality dark chocolate for a truly satisfying snack. The dark chocolate provides antioxidants while the nuts deliver protein, healthy fats, and essential minerals. Each bar is crafted to provide the perfect chocolate hit without excessive sugar, making it an ideal option for health-conscious individuals with a sweet tooth or chocolate cravings.",
    weight: "50g",
    price: 65,
    originalPrice: 75,
    category: "Nutri Bar",
    images: {
      front: Nutty_bar,
      image_2: Nutty_bar_Image2,
      image_3: Nutty_bar_Image3
    },
    nutritionalInfo: {
      calories: "210 kcal per bar",
      protein: "7g per bar",
      carbs: "20g per bar",
      fat: "13g per bar",
      fiber: "4g per bar",
      sugar: "10g per bar",
      antioxidants: "High in flavonoids from dark chocolate"
    },
    ingredients: "Mixed nuts (almonds, walnuts, cashews), Dark chocolate, Honey, Oats, Natural vanilla",
    shelfLife: "6 months",
    inStock: true,
    highlights: [
      "Premium dark chocolate with 70% cocoa",
      "Blend of three nutritious nuts",
      "Low glycemic index",
      "No artificial flavors or preservatives"
    ],
    usageInstructions: [
      "Enjoy as a satisfying snack between meals",
      "Perfect for chocolate cravings",
      "Store in a cool, dry place",
      "Avoid exposure to direct sunlight as chocolate may melt"
    ],
    benefits: [
      "Antioxidants from dark chocolate support heart health",
      "Nuts provide healthy fats and protein",
      "Satisfies sweet cravings in a healthier way",
      "Provides lasting energy without sugar crashes"
    ],
    reviews: [
      {
        user: "Priya Sharma",
        rating: 5,
        date: "April 10, 2025",
        comment: "As a chocolate lover trying to eat healthy, this bar is perfect! Rich chocolate flavor but doesn't feel unhealthy."
      },
      {
        user: "Vijay Kumar",
        rating: 4,
        date: "March 18, 2025",
        comment: "Good taste and texture. Keeps me full and satisfies my sweet tooth."
      },
      {
        user: "Sneha Rao",
        rating: 5,
        date: "February 25, 2025",
        comment: "Love the combination of nuts and chocolate. Not too sweet and very satisfying."
      }
    ]
  },
  {
    id: 9,
    name: "Berry Nutri Bar",
    shortName: "Berry Bar",
    description: "A fruity and refreshing nutri bar loaded with the goodness of mixed berries. This bar offers a perfect blend of tartness and sweetness. Rich in antioxidants and essential vitamins for a healthy snack option.",
    longDescription: "Our Berry Nutri Bar brings the vibrant flavors and nutritional benefits of mixed berries into a convenient, delicious snack. We use a blend of dried cranberries, blueberries, and strawberries combined with oats and honey for a perfectly balanced sweet-tart flavor profile. Berries are well known for their high antioxidant content and vitamin levels, making this bar not just tasty but also beneficial for overall health and immunity. The chewy texture and bright berry flavor make this a refreshing alternative to chocolate or nut-focused bars.",
    weight: "50g",
    price: 65,
    originalPrice: 85,
    category: "Nutri Bar",
    images: {
      front: Berry_bar,
      image_2: Berry_bar_Image2,
      image_3: Berry_bar_Image3
    },
    nutritionalInfo: {
      calories: "180 kcal per bar",
      protein: "5g per bar",
      carbs: "25g per bar",
      fat: "7g per bar",
      fiber: "6g per bar",
      sugar: "12g per bar",
      vitamin_c: "15% DV per bar",
      antioxidants: "High in anthocyanins from berries"
    },
    ingredients: "Mixed berries (cranberries, blueberries, strawberries), Oats, Honey, Almonds, Chia seeds",
    shelfLife: "6 months",
    inStock: true,
    highlights: [
      "Made with real dried berries",
      "Rich in antioxidants",
      "Good source of vitamin C",
      "Contains omega-3 rich chia seeds"
    ],
    usageInstructions: [
      "Enjoy as a refreshing snack anytime",
      "Perfect for mid-afternoon energy boost",
      "Store in a cool, dry place",
      "Ideal companion for outdoor activities"
    ],
    benefits: [
      "Antioxidants from berries support immune health",
      "Dietary fiber aids digestion",
      "Vitamin C supports collagen production and immunity",
      "Chia seeds provide omega-3 fatty acids for heart health"
    ],
    reviews: [
      {
        user: "Deepa Nair",
        rating: 5,
        date: "April 15, 2025",
        comment: "Love the tangy berry flavor! Not overly sweet and leaves me feeling energized."
      },
      {
        user: "Raj Malhotra",
        rating: 4,
        date: "March 20, 2025",
        comment: "Great taste and I like that it's lower in calories than most bars."
      },
      {
        user: "Ananya Gupta",
        rating: 5,
        date: "February 18, 2025",
        comment: "The perfect snack for my hiking trips. Light yet satisfying and full of flavor."
      }
    ]
  }
];
export const productCategories = [
  "Pancake Mix",
  "Dosa Mix", 
  "Breakfast Mix",
  "Nutri Bar",
  "All in one"
];

// Popular combos using product IDs for reference
export const comboData = [
  // {
  //   id: 1,
  //   name: "Breakfast Combo",
  //   description: "Start your day right with our perfect breakfast combination.",
  //   price: 249,
  //   regularPrice: 387,
  //   savingPercentage: 36,
  //   components: [
  //     {
  //       name: "Vanilla Pancake Mix 200g",
  //       regularPrice: 149,
  //       image: Vanilla_Front
  //     },
  //     {
  //       name: "Instant Upma Mix 200g",
  //       regularPrice: 149,
  //       image: Millet_Upma_front
  //     }
  //   ],
  //   freeItems: [
  //     {
  //       name: "Almond Coffee Bliss Bar 50g",
  //       regularPrice: 89,
  //       image: Almond_bar
  //     }
  //   ]
  // },
  // {
  //   id: 2,
  //   name: "Pancake Lover's Combo",
  //   description: "The ultimate combo for pancake enthusiasts.",
  //   price: 298,
  //   regularPrice: 363,
  //   savingPercentage: 18,
  //   components: [
  //     {
  //       name: "Vanilla Pancake Mix 200g",
  //       regularPrice: 149,
  //       image: Vanilla_Front
  //     },
  //     {
  //       name: "Ragi Choco Pancake Mix 200g",
  //       regularPrice: 149,
  //       image: Ragi_Front
  //     }
  //   ],
  //   freeItems: [
  //     {
  //       name: "Nutty Choco Delight Bar 50g",
  //       regularPrice: 65,
  //       image: Nutty_bar
  //     }
  //   ]
  // },
  // {
  //   id: 3,
  //   name: "South-Indian Combo",
  //   description: "Experience authentic South Indian flavors with our dosa combo.",
  //   price: 198,
  //   regularPrice: 303,
  //   savingPercentage: 35,
  //   components: [
  //     {
  //       name: "Multi Millet Dosa Mix 200g",
  //       regularPrice: 119,
  //       image: Multi_millet_Front
  //     },
  //     {
  //       name: "Spinach Dosa Mix 200g",
  //       regularPrice: 119,
  //       image: Spinach_Front
  //     }
  //   ],
  //   freeItems: [
  //     {
  //       name: "Sesame Date Fusion Bar 50g",
  //       regularPrice: 65,
  //       image: Sesame_bar
  //     }
  //   ]
  // },
  {
    id: 4,
    name: "Nutri Bar Power Pack",
    description: "4 sets of each nutri bar (total 16 bars) – A power-packed energy bundle.",
    price: 990,
    regularPrice: 1099,
    savingPercentage: 10,
    components: [
      {
        name: "Almond Coffee Bliss Bar 50g (x4)",
        regularPrice: 89 * 4,
        image: Almond_bar
      },
      {
        name: "Sesame Date Fusion Bar 50g (x4)",
        regularPrice: 65 * 4,
        image: Sesame_bar
      },
      {
        name: "Nutty Choco Delight Bar 50g (x4)",
        regularPrice: 65 * 4,
        image: Nutty_bar
      },
      {
        name: "Choco Berry Bar 50g (x4)",
        regularPrice: 65 * 4,
        image: Berry_bar
      }
    ],
    freeItems: []
  },
  {
    id: 5,
    name: "Complete Milletio Bundle",
    description: "Get all of Milletio’s current products in one wholesome bundle.",
    price: 799,
    regularPrice: 935,
    savingPercentage: 15,
    components: [
      {
        name: "Vanilla Pancake Mix 200g",
        regularPrice: 149,
        image: Vanilla_Front
      },
      {
        name: "Ragi Choco Pancake Mix 200g",
        regularPrice: 149,
        image: Ragi_Front
      },
      {
        name: "Multi Millet Dosa Mix 200g",
        regularPrice: 119,
        image: Multi_millet_Front
      },
      {
        name: "Spinach Dosa Mix 200g",
        regularPrice: 119,
        image: Spinach_Front
      },
      {
        name: "Instant Upma Mix 200g",
        regularPrice: 149,
        image: Millet_Upma_front
      },{
        name: "Almond Coffee Bliss Bar 50g",
        regularPrice: 89 ,
        image: Almond_bar
      },
      {
        name: "Sesame Date Fusion Bar 50g (x4)",
        regularPrice: 65,
        image: Sesame_bar
      },
      {
        name: "Nutty Choco Delight Bar 50g",
        regularPrice: 65,
        image: Nutty_bar
      },
      {
        name: "Choco Berry Bar 50g",
        regularPrice: 65 ,
        image: Berry_bar
      }
    ],
    freeItems: []
  }
];


// Helper function to get a product by ID
export const getProductById = (id) => {
  return products.find(product => product.id === id);
};

// Helper function to get full combo details with product objects instead of IDs
export const getComboWithDetails = (comboId) => {
  const combo = comboData.find(c => c.id === comboId);
  if (!combo) return null;
  
  return {
    ...combo,
    componentDetails: combo.components.map(id => getProductById(id)),
    freeItemDetails: combo.freeItems.map(id => getProductById(id))
  };
};

// Get all combos with full product details
export const getAllCombosWithDetails = () => {
  return comboData.map(combo => ({
    ...combo,
    componentDetails: combo.components.map(id => getProductById(id)),
    freeItemDetails: combo.freeItems.map(id => getProductById(id))
  }));
};

export default {
  products,
  productCategories,
  comboData,
  getProductById,
  getComboWithDetails,
  getAllCombosWithDetails
};