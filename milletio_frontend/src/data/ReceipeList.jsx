import Vanilla_Front from '../pages/assets/Vanilla_Pancake-front.jpg';
import Vanilla_Back from '../pages/assets/Vanilla_Pancake-back.jpg';
import Ragi_Front from "../pages/assets/Ragi_Pancake-front.jpg";
import Ragi_Back from "../pages/assets/Ragi_Pancake-back.jpg";
import Multi_millet_Front from '../pages/assets/Multimillet_Dosa-front.jpg';
import Multi_millet_Back from "../pages/assets/Multimillet_Dosa-back.jpg";
import Spinach_Front from "../pages/assets/Spinach_Dosa-front.jpg";
import Spinach_Back from '../pages/assets/Spinach_Dosa-back.jpg';
import Millet_Upma_front from "../pages/assets/Millet_Upma-front.jpg";
import Millet_Upma_back from "../pages/assets/Millet_Upma-back.jpg";
import Almond_bar from '../pages/assets/Almond_Coffee_Bar.jpg';
import Berry_bar from '../pages/assets/Choco_berry_Bar.jpg';
import Nutty_bar from '../pages/assets/Nutty_Delight_Bar.jpg';
import Sesame_bar from '../pages/assets/Sesame_Date_Bar.jpg';
import Spinach_Image3 from '../pages/assets/Spinach_Dosa_Image3.png';
import Spinach_Video from "../pages/assets/Spinach_Dosa_Video.mp4";
import Multi_millet_Image3 from '../pages/assets/Multi_millet_image3.png';
import Multi_millet_Video from "../pages/assets/Multi_millet_video.mp4";
const recipeList = [
    {
      title: "Fluffy Vanilla Pancakes",
      description: "Light and fluffy pancakes with a delightful vanilla flavor, perfect for a weekend breakfast.",
      image: Vanilla_Front,
      totalTime: "15 min",
      productUsed: "Vanilla Pancake Mix",
      prepTime: "5 min",
      cookTime: "10 min",
      category:"Pancake",
      ingredients: [
        "1 cup pancake mix",
        "1/2 cup milk",
        "1 tbsp melted butter",
        "Your fave spread & fruits 🍓🍌"
      ],
      steps: [
        "Stir pancake mix, milk, and butter till smooth (no lumps!",
        "Rest the batter for 10 mins — trust us, it's worth it!",
        "Heat a non-stick pan over medium heat and lightly grease with butter.",
        "Pour ¼ cup of batter for each pancake onto the hot pan.",
        "Flip and cook the both sides until golden brown (about 1-2 minutes).",
        "Add your favorite spread + juicy fruits on top! 😋"
      ],
      tags: ["breakfast", "sweet", "family-friendly", "quick", "Pancake"]
    },
    {
      title: "Crispy Multi Millet Dosa",
      description: "Thin, crispy dosas made with our nutritious Multi Millet Dosa Mix.",
      image: Multi_millet_Front,
      totalTime: "25 min",
      productUsed: "Multi Millet Dosa Mix",
      prepTime: "10 min",
      cookTime: "15 min",
      category:"Dosa",

      ingredients: [
        "1 cup of our Multi Millet Dosa or Spinach Dosa Mix",
        "1 cup of water",
        "1 cup of curd",
        "Oil or Ghee for cooking",
      ],
      steps: [
        "In a bowl, combine dosa mix, curd, and water.",
        "Stir until smooth—no lumps!",
        "Let the batter sit for 5–10 minutes.",
        "Heat a dosa tawa or non-stick pan on medium-high heat.",
        "Once hot, reduce to medium heat and lightly grease the surface with oil.",
        "Pour a ladle of batter in the center and spread in circular motions to form a thin dosa.",
        "Drizzle some oil around the edges, cover and cook for 1-2 minutes.",
        "Once the bottom is golden and crisp, flip and cook for another minute.",
      ],
      tags: ["breakfast", "dinner", "south-indian", "crispy","Dosa"]
    },
    {
      title: "Quick Millet Upma",
      description: "A nutritious breakfast or snack made with our Instant Upma Mix, ready in minutes.",
      image: Millet_Upma_front,
      totalTime: "10 min",
      productUsed: "Instant Upma Mix",
      prepTime: "2 min",
      cookTime: "8 min",
      category:"Upma",
      ingredients: [
        "1 cup of Instant Upma Mix (200g)",
        "4.5 cups of water",
        "1 tbsp ghee or oil",
        "Fresh coriander leaves for garnish",
      ],
      steps: [
        "In a thick-bottomed vessel, bring 4.5 cups of water to a boil.",
        "Slowly add 1 cup of upma mix. Stir well to avoid lumps.",
        "Cover and cook on low heat for 20 minutes, stirring occasionally until all the water is absorbed.",
        "Sprinkle with fresh coriander leaves and serve hot!",
      ],
      tags: ["breakfast", "quick", "savory", "vegetarian", "Upma"]
    },
    // {
    //   title: "Energy-Boosting Coffee Almond Smoothie",
    //   description: "A delicious and energizing smoothie featuring our Almond Coffee Bliss Nutri Bar.",
    //   image: Almond_bar,
    //   difficulty: "Easy",
    //   totalTime: "5 min",
    //   productUsed: "Almond Coffee Bliss Nutri Bar",
    //   prepTime: "5 min",
    //   cookTime: "0 min",
    //   Category: "Nutri Bar",
    //   ingredients: [
    //     "1 Almond Coffee Bliss Nutri Bar",
    //     "1 banana",
    //     "1 cup milk (or plant-based alternative)",
    //     "½ cup Greek yogurt",
    //     "1 tsp honey (optional)",
    //     "¼ tsp cinnamon",
    //     "6-8 ice cubes",
    //     "Coffee beans for garnish (optional)"
    //   ],
    //   steps: [
    //     "Break the Almond Coffee Bliss Nutri Bar into pieces.",
    //     "Add the bar pieces, banana, milk, yogurt, honey, and cinnamon to a blender.",
    //     "Blend until smooth and creamy.",
    //     "Add ice cubes and blend again until smooth.",
    //     "Pour into a glass and garnish with a sprinkle of crushed nutri bar and coffee beans if desired.",
    //     "Serve immediately for a perfect energy-boosting breakfast or snack."
    //   ],
    //   tags: ["drink", "smoothie", "energy", "coffee", "Nutri Bar"]
    // },
    // {
    //   title: "Sesame Date Energy Balls",
    //   description: "No-bake energy balls using our Sesame Date Fusion Nutri Bar, perfect for snacking on the go.",
    //   image: Sesame_bar,
    //   difficulty: "Easy",
    //   totalTime: "15 min",
    //   productUsed: "Sesame Date Fusion Nutri Bar",
    //   prepTime: "15 min",
    //   cookTime: "0 min",
    //   Category: "Nutri Bar",
    //   ingredients: [
    //     "2 Sesame Date Fusion Nutri Bars",
    //     "½ cup rolled oats",
    //     "2 tbsp honey or maple syrup",
    //     "2 tbsp nut butter (almond or peanut)",
    //     "1 tbsp chia seeds",
    //     "¼ tsp cardamom powder",
    //     "2 tbsp desiccated coconut for coating"
    //   ],
    //   steps: [
    //     "Crumble the Sesame Date Fusion Nutri Bars into a food processor.",
    //     "Add rolled oats, honey, nut butter, chia seeds, and cardamom powder.",
    //     "Pulse until the mixture comes together and forms a sticky dough.",
    //     "Using clean hands, roll the mixture into small bite-sized balls.",
    //     "Roll each ball in desiccated coconut to coat evenly.",
    //     "Place energy balls on a tray lined with parchment paper.",
    //     "Refrigerate for at least 30 minutes before serving.",
    //     "Store in an airtight container in the refrigerator for up to a week."
    //   ],
    //   tags: ["snack", "no-bake", "energy", "quick", "Nutri Bar"]
    // },
    // {
    //   title: "Berry Yogurt Parfait",
    //   description: "A layered breakfast parfait featuring crushed Berry Nutri Bar, yogurt, and fresh fruits.",
    //   image: Berry_bar,
    //   difficulty: "Easy",
    //   totalTime: "10 min",
    //   productUsed: "Berry Nutri Bar",
    //   prepTime: "10 min",
    //   cookTime: "0 min",
    //   Category: "Nutri Bar",
    //   ingredients: [
    //     "2 Berry Nutri Bars, crushed",
    //     "2 cups Greek yogurt",
    //     "1 cup mixed berries (strawberries, blueberries, raspberries)",
    //     "2 tbsp honey or maple syrup",
    //     "½ tsp vanilla extract",
    //     "2 tbsp chopped nuts",
    //     "Fresh mint leaves for garnish"
    //   ],
    //   steps: [
    //     "Mix Greek yogurt with honey and vanilla extract in a bowl.",
    //     "Crush the Berry Nutri Bars into small pieces but not into powder.",
    //     "In serving glasses, layer crushed nutri bar at the bottom.",
    //     "Add a layer of yogurt mixture, then a layer of mixed berries.",
    //     "Repeat the layers ending with berries on top.",
    //     "Sprinkle chopped nuts and any remaining nutri bar crumbs on top.",
    //     "Garnish with fresh mint leaves.",
    //     "Serve immediately or refrigerate for up to 2 hours before serving."
    //   ],
    //   tags: ["breakfast", "healthy", "parfait", "berries", "Nutri Bar"]
    // }
  ];
  
  export default recipeList;