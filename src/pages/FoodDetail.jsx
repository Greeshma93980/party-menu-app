import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function FoodDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { savedrecipes, togglesaverecipe } = useContext(AuthContext);

  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);

  // Complete list matching your Menu.jsx local dataset
  const localFallbackRecipes = [
    {
      id: 1,
      name: "Tandoori Chicken",
      category: "main",
      isVeg: false,
      description: "Succulent chicken marinated in yogurt and spices, roasted in a clay oven until charred and juicy.",
      image: "https://images.unsplash.com/photo-1775211578178-61f06027adf3?auto=format&fit=crop&w=1200&q=80",
      ingredients: [
        { name: "Chicken (bone-in)", quantity: "500 g" },
        { name: "Hung curd", quantity: "1/2 cup" },
        { name: "Kashmiri chilli", quantity: "1 tsp" },
        { name: "Garam masala", quantity: "1/2 tsp" },
        { name: "Mustard oil", quantity: "2 tbsp" }
      ],
      instructions: ["Marinate the chicken with curd and spices.", "Roast in a tandoor or oven until charred."]
    },
    {
      id: 2,
      name: "Dal Makhani",
      category: "main",
      isVeg: true,
      description: "Slow-cooked black lentils simmered overnight with butter, cream, and warming spices.",
      image: "https://images.unsplash.com/photo-1775211578178-61f06027adf3?auto=format&fit=crop&w=1200&q=80",
      ingredients: [
        { name: "Black urad dal", quantity: "1 cup" },
        { name: "Butter", quantity: "3 tbsp" },
        { name: "Fresh cream", quantity: "1/4 cup" },
        { name: "Tomato puree", quantity: "1/2 cup" },
        { name: "Ginger-garlic paste", quantity: "1 tbsp" }
      ],
      instructions: ["Boil the lentils with spices until mashy.", "Simmer with tomato puree, butter, and heavy cream."]
    },
    {
      id: 3,
      name: "Paneer Tikka",
      category: "starter",
      isVeg: true,
      description: "Cubes of cottage cheese grilled with bell peppers and onion in spiced marinade.",
      image: "https://images.unsplash.com/photo-1775211578178-61f06027adf3?auto=format&fit=crop&w=1200&q=80",
      ingredients: [
        { name: "Paneer", quantity: "250 g" },
        { name: "Bell pepper", quantity: "1 Pc" },
        { name: "Onion", quantity: "1 Pc" },
        { name: "Tandoori masala", quantity: "2 tsp" },
        { name: "Hung curd", quantity: "1/2 cup" }
      ],
      instructions: ["Marinate cubes in hung curd and tandoori spices.", "Skewer them with veggies and grill till charred."]
    },
    {
      id: 4,
      name: "Chicken 65",
      category: "starter",
      isVeg: false,
      description: "Crispy fried chicken bites tossed with curry leaves, chilli, and South Indian spices.",
      image: "https://images.unsplash.com/photo-1775211578178-61f06027adf3?auto=format&fit=crop&w=1200&q=80",
      ingredients: [
        { name: "Chicken cubes", quantity: "400 g" },
        { name: "Curry leaves", quantity: "12 leaves" },
        { name: "Red chilli powder", quantity: "1 tsp" },
        { name: "Corn flour", quantity: "2 tbsp" },
        { name: "Yogurt", quantity: "3 tbsp" }
      ],
      instructions: ["Coat chicken pieces with corn flour and spice marinade.", "Deep fry until crunchy and toss with seasoned curry leaves."]
    },
    {
      id: 5,
      name: "Gulab Jamun",
      category: "desert",
      isVeg: true,
      description: "Soft milk-solid dumplings soaked in rose-cardamom sugar syrup.",
      image: "https://images.unsplash.com/photo-1775211578178-61f06027adf3?auto=format&fit=crop&w=1200&q=80",
      ingredients: [
        { name: "Khoya", quantity: "200 g" },
        { name: "Sugar", quantity: "1 cup" },
        { name: "Rose water", quantity: "1 tsp" },
        { name: "Cardamom powder", quantity: "1/2 tsp" },
        { name: "Ghee", quantity: "for frying" }
      ],
      instructions: ["Roll soft khoya balls smoothly with no cracks.", "Deep fry on low heat and immediately soak in warm sugar syrup."]
    },
    {
      id: 6,
      name: "Jeera Rice",
      category: "sides",
      isVeg: true,
      description: "Fragrant basmati rice tempered with cumin seeds and ghee.",
      image: "https://images.unsplash.com/photo-1775211578178-61f06027adf3?auto=format&fit=crop&w=1200&q=80",
      ingredients: [
        { name: "Basmati rice", quantity: "1 cup" },
        { name: "Cumin seeds", quantity: "1 tsp" },
        { name: "Ghee", quantity: "2 tbsp" },
        { name: "Bay leaf", quantity: "1 Pc" }
      ],
      instructions: ["Wash and cook basmati rice fully.", "Toss with hot ghee, cumin seeds, and a bay leaf."]
    },
    {
      id: 7,
      name: "Fried Avocado Tacos",
      category: "main",
      isVeg: true,
      description: "Crispy tortillas filled with fried avocado, salsa, and fresh herbs.",
      image: "https://images.unsplash.com/photo-1775211578178-61f06027adf3?auto=format&fit=crop&w=1200&q=80",
      ingredients: [
        { name: "Avocado", quantity: "2 Pc" },
        { name: "Corn tortillas", quantity: "6 Pc" },
        { name: "Cherry tomato", quantity: "100 g" },
        { name: "Lime", quantity: "2 Pc" }
      ],
      instructions: ["Slice avocados, batter and fry until gold-brown.", "Assemble onto warm corn tortillas with chopped tomatoes and lime juice."]
    },
    {
      id: 8,
      name: "Butter Naan",
      category: "sides",
      isVeg: true,
      description: "Soft leavened flatbread brushed with butter from the tandoor.",
      image: "https://images.unsplash.com/photo-1775211578178-61f06027adf3?auto=format&fit=crop&w=1200&q=80",
      ingredients: [
        { name: "Refined flour", quantity: "2 cups" },
        { name: "Yeast", quantity: "1 tsp" },
        { name: "Butter", quantity: "3 tbsp" },
        { name: "Yogurt", quantity: "2 tbsp" }
      ],
      instructions: ["Prepare a soft dough using yeast and yogurt; let it rise.", "Roll into tear shapes, bake on hot tawa or tandoor, and brush with butter."]
    },
    {
      id: 9,
      name: "Samosa Platter",
      category: "starter",
      isVeg: true,
      description: "Crisp pastry pockets stuffed with spiced potatoes and peas, served with chutneys.",
      image: "https://images.unsplash.com/photo-1775211578178-61f06027adf3?auto=format&fit=crop&w=1200&q=80",
      ingredients: [
        { name: "Potato", quantity: "3 Pc" },
        { name: "Peas", quantity: "1/2 cup" },
        { name: "Refined flour", quantity: "2 cups" },
        { name: "Oil", quantity: "for frying" }
      ],
      instructions: ["Cook and smash potatoes with spices and green peas.", "Fold pastry sheets into cones, stuff, seal, and deep fry until golden."]
    },
    {
      id: 10,
      name: "Papdi Chaat",
      category: "starter",
      isVeg: true,
      description: "Crispy wafers topped with yogurt, chutneys, sev, and chaat masala.",
      image: "https://images.unsplash.com/photo-1775211578178-61f06027adf3?auto=format&fit=crop&w=1200&q=80",
      ingredients: [
        { name: "Papdi", quantity: "24 Pc" },
        { name: "Yogurt", quantity: "1 cup" },
        { name: "Boiled potato", quantity: "2 Pc" },
        { name: "Sev", quantity: "1/2 cup" }
      ],
      instructions: ["Arrange flat papdi on plates.", "Layer with diced potatoes, whipped yogurt, sweet/spicy chutneys, and top with crunchy sev."]
    },
    {
      id: 11,
      name: "Hara Bhara Kebab",
      category: "starter",
      isVeg: true,
      description: "Spinach and green pea patties shallow-fried until crisp outside.",
      image: "https://images.unsplash.com/photo-1775211578178-61f06027adf3?auto=format&fit=crop&w=1200&q=80",
      ingredients: [
        { name: "Spinach", quantity: "200 g" },
        { name: "Green peas", quantity: "1/2 cup" },
        { name: "Paneer", quantity: "100 g" },
        { name: "Potato", quantity: "1 Pc" }
      ],
      instructions: ["Blanch spinach and blend into a paste with cooked peas.", "Mix with potato and paneer, shape into discs, and pan fry with minimal oil."]
    },
    {
      id: 12,
      name: "Fish Amritsari",
      category: "starter",
      isVeg: false,
      description: "Batter-fried fish fillets with ajwain and carom-spiced coating.",
      image: "https://images.unsplash.com/photo-1775211578178-61f06027adf3?auto=format&fit=crop&w=1200&q=80",
      ingredients: [
        { name: "Fish fillet", quantity: "400 g" },
        { name: "Gram flour", quantity: "1/2 cup" },
        { name: "Ajwain", quantity: "1 tsp" },
        { name: "Red chilli powder", quantity: "1 tsp" }
      ],
      instructions: ["Cut fish into finger strips and coat with lime juice.", "Make a spiced gram flour (besan) batter, dip fish, and deep fry crisp."]
    },
    {
      id: 13,
      name: "Tom Yum Soup",
      category: "starter",
      isVeg: false,
      description: "Hot and sour soup with lemongrass, galangal, and prawns.",
      image: "https://images.unsplash.com/photo-1775211578178-61f06027adf3?auto=format&fit=crop&w=1200&q=80",
      ingredients: [
        { name: "Prawns", quantity: "200 g" },
        { name: "Lemongrass", quantity: "2 stalks" },
        { name: "Galangal", quantity: "30 g" },
        { name: "Lime juice", quantity: "2 tbsp" }
      ],
      instructions: ["Boil clear stock with bruised lemongrass, galangal, and chilies.", "Add fresh prawns and cook briefly. Turn off flame and stir in fresh lime juice."]
    },
    {
      id: 14,
      name: "Bruschetta Trio",
      category: "starter",
      isVeg: true,
      description: "Toasted baguette with tomato-basil, olive tapenade, and ricotta.",
      image: "https://images.unsplash.com/photo-1775211578178-61f06027adf3?auto=format&fit=crop&w=1200&q=80",
      ingredients: [
        { name: "Baguette", quantity: "1/2 loaf" },
        { name: "Cherry tomato", quantity: "200 g" },
        { name: "Fresh basil", quantity: "1 bunch" },
        { name: "Ricotta", quantity: "100 g" }
      ],
      instructions: ["Slice and grill baguette bread slices with olive oil.", "Top cleanly with tomato basil mixes, ricotta cheese, or olive spreads."]
    },
    {
      id: 15,
      name: "Spring Rolls",
      category: "starter",
      isVeg: true,
      description: "Crispy rolls with glass noodles, cabbage, and carrot.",
      image: "https://images.unsplash.com/photo-1775211578178-61f06027adf3?auto=format&fit=crop&w=1200&q=80",
      ingredients: [
        { name: "Spring roll wrappers", quantity: "12 Pc" },
        { name: "Glass noodles", quantity: "50 g" },
        { name: "Cabbage", quantity: "1 cup" },
        { name: "Carrot", quantity: "1 Pc" }
      ],
      instructions: ["Stir-fry shredded carrots and cabbage in a hot wok with soy sauce.", "Wrap inside sheets tightly, seal edges, and deep fry until golden brown."]
    },
    {
      id: 16,
      name: "Buffalo Wings",
      category: "starter",
      isVeg: false,
      description: "Crispy wings glazed in spicy butter sauce with blue cheese dip.",
      image: "https://images.unsplash.com/photo-1775211578178-61f06027adf3?auto=format&fit=crop&w=1200&q=80",
      ingredients: [
        { name: "Chicken wings", quantity: "500 g" },
        { name: "Hot sauce", quantity: "1/4 cup" },
        { name: "Butter", quantity: "3 tbsp" }
      ],
      instructions: ["Bake or deep-fry seasoned chicken wings until crispy.", "Toss hot wings directly into a mix of melted butter and buffalo hot sauce."]
    },
    {
      id: 17,
      name: "Caprese Skewers",
      category: "starter",
      isVeg: true,
      description: "Cherry tomato, mozzarella, and basil with balsamic drizzle.",
      image: "https://images.unsplash.com/photo-1775211578178-61f06027adf3?auto=format&fit=crop&w=1200&q=80",
      ingredients: [
        { name: "Cherry tomato", quantity: "200 g" },
        { name: "Mozzarella balls", quantity: "150 g" },
        { name: "Fresh basil", quantity: "20 leaves" }
      ],
      instructions: ["Thread a cherry tomato, basil leaf, and small mozzarella ball onto small sticks.", "Drizzle over with sweet balsamic glaze before serving cold."]
    },
    {
      id: 18,
      name: "Mutton Rogan Josh",
      category: "main",
      isVeg: false,
      description: "Kashmiri-style lamb curry with yoghurt and aromatic spices.",
      image: "https://images.unsplash.com/photo-1775211578178-61f06027adf3?auto=format&fit=crop&w=1200&q=80",
      ingredients: [
        { name: "Mutton", quantity: "600 g" },
        { name: "Yogurt", quantity: "1 cup" },
        { name: "Kashmiri chilli", quantity: "2 tbsp" },
        { name: "Onion", quantity: "3 Pc" }
      ],
      instructions: ["Sauté meat pieces with whole spices in hot oil.", "Pour in whipped yogurt mixed with red chili powder, simmer slowly until tender."]
    },
    {
      id: 19,
      name: "Butter Chicken",
      category: "main",
      isVeg: false,
      description: "Tandoori chicken in silky tomato-butter-cream gravy.",
      image: "https://images.unsplash.com/photo-1775211578178-61f06027adf3?auto=format&fit=crop&w=1200&q=80",
      ingredients: [
        { name: "Chicken tikka", quantity: "400 g" },
        { name: "Tomato puree", quantity: "2 cups" },
        { name: "Butter", quantity: "100 g" },
        { name: "Fresh cream", quantity: "1/2 cup" }
      ],
      instructions: ["Simmer smooth tomato puree with aromatic whole spices.", "Whisk in roasted chicken tikka cubes, lots of butter, and fresh cream."]
    },
    {
      id: 20,
      name: "Palak Paneer",
      category: "main",
      isVeg: true,
      description: "Cottage cheese cubes in creamy spinach gravy.",
      image: "https://images.unsplash.com/photo-1775211578178-61f06027adf3?auto=format&fit=crop&w=1200&q=80",
      ingredients: [
        { name: "Paneer", quantity: "300 g" },
        { name: "Spinach", quantity: "500 g" },
        { name: "Onion", quantity: "1 Pc" },
        { name: "Fresh cream", quantity: "2 tbsp" }
      ],
      instructions: ["Blanch spinach and blend into a green, smooth puree.", "Cook garlic and onions, add the puree, insert raw paneer cubes, and cream."]
    },
    {
      id: 21,
      name: "Hyderabadi Biryani",
      category: "main",
      isVeg: false,
      description: "Layered basmati rice with marinated chicken, saffron, and mint.",
      image: "https://images.unsplash.com/photo-1775211578178-61f06027adf3?auto=format&fit=crop&w=1200&q=80",
      ingredients: [
        { name: "Basmati rice", quantity: "2 cups" },
        { name: "Chicken", quantity: "500 g" },
        { name: "Yogurt", quantity: "3/4 cup" },
        { name: "Fried onion", quantity: "1 cup" }
      ],
      instructions: ["Marinate meat chunks with yogurt and spicy green masalas.", "Layer par-boiled basmati rice over chicken, add saffron milk, and seal to dum-cook."]
    },
    {
      id: 22,
      name: "Veg Biryani",
      category: "main",
      isVeg: true,
      description: "Aromatic rice with mixed vegetables, mint, and whole spices.",
      image: "https://images.unsplash.com/photo-1775211578178-61f06027adf3?auto=format&fit=crop&w=1200&q=80",
      ingredients: [
        { name: "Basmati rice", quantity: "2 cups" },
        { name: "Mixed vegetables", quantity: "400 g" },
        { name: "Mint", quantity: "1/2 cup" },
        { name: "Ghee", quantity: "4 tbsp" }
      ],
      instructions: ["Cook vegetables with robust korma spices.", "Alternate layer with aromatic long grain rice and steam tightly with ghee."]
    },
    {
      id: 23,
      name: "Penne Arrabbiata",
      category: "main",
      isVeg: true,
      description: "Penne in spicy tomato sauce with garlic and chilli flakes.",
      image: "https://images.unsplash.com/photo-1775211578178-61f06027adf3?auto=format&fit=crop&w=1200&q=80",
      ingredients: [
        { name: "Penne pasta", quantity: "400 g" },
        { name: "Tomato", quantity: "600 g" },
        { name: "Garlic", quantity: "6 cloves" },
        { name: "Chilli flakes", quantity: "1 tsp" }
      ],
      instructions: ["Boil pasta until al-dente.", "Sauté garlic and chili flakes in olive oil, toss in crushed tomatoes, and mix with pasta."]
    },
    {
      id: 24,
      name: "Grilled Salmon",
      category: "main",
      isVeg: false,
      description: "Atlantic salmon with lemon butter, asparagus, and herbs.",
      image: "https://images.unsplash.com/photo-1775211578178-61f06027adf3?auto=format&fit=crop&w=1200&q=80",
      ingredients: [
        { name: "Salmon fillet", quantity: "400 g" },
        { name: "Butter", quantity: "50 g" },
        { name: "Lemon", quantity: "2 Pc" },
        { name: "Asparagus", quantity: "200 g" }
      ],
      instructions: ["Pan-sear seasoned salmon fillets skin-side down until crispy.", "Serve alongside blanched asparagus and simple lemon-garlic butter sauce."]
    },
    {
      id: 25,
      name: "Margherita Pizza",
      category: "main",
      isVeg: true,
      description: "Wood-fired pizza with tomato, mozzarella, and fresh basil.",
      image: "https://images.unsplash.com/photo-1775211578178-61f06027adf3?auto=format&fit=crop&w=1200&q=80",
      ingredients: [
        { name: "Pizza dough", quantity: "1 ball" },
        { name: "Mozzarella", quantity: "200 g" },
        { name: "Tomato sauce", quantity: "1/2 cup" },
        { name: "Fresh basil", quantity: "12 leaves" }
      ],
      instructions: ["Roll out standard pizza dough into a neat round sheet.", "Spread tomato purees, mozzarella cubes, and bake at extreme heat. Finish with fresh basil."]
    },
    {
      id: 26,
      name: "Beef Steak Frites",
      category: "main",
      isVeg: false,
      description: "Grilled sirloin with herb butter and hand-cut fries.",
      image: "https://images.unsplash.com/photo-1775211578178-61f06027adf3?auto=format&fit=crop&w=1200&q=80",
      ingredients: [
        { name: "Beef sirloin", quantity: "400 g" },
        { name: "Potato", quantity: "4 Pc" },
        { name: "Butter", quantity: "60 g" }
      ],
      instructions: ["Sear heavy sirloin steak to perfect medium-rare.", "Top with mixed herb butter, let it rest, then serve with crispy hand-cut french fries."]
    },
    {
      id: 27,
      name: "Pad Thai",
      category: "main",
      isVeg: false,
      description: "Stir-fried rice noodles with prawns, tamarind, and peanuts.",
      image: "https://images.unsplash.com/photo-1775211578178-61f06027adf3?auto=format&fit=crop&w=1200&q=80",
      ingredients: [
        { name: "Rice noodles", quantity: "300 g" },
        { name: "Prawns", quantity: "200 g" },
        { name: "Tamarind paste", quantity: "2 tbsp" },
        { name: "Peanuts", quantity: "1/4 cup" }
      ],
      instructions: ["Soak flat noodles. Stir-fry prawns and scrambled egg in a wok.", "Add noodles, authentic tamarind sauces, and coat well. Toss in crushed roasted peanuts."]
    },
    {
      id: 28,
      name: "Chicken Katsu Curry",
      category: "main",
      isVeg: false,
      description: "Breaded chicken cutlet with mild Japanese curry and rice.",
      image: "https://images.unsplash.com/photo-1775211578178-61f06027adf3?auto=format&fit=crop&w=1200&q=80",
      ingredients: [
        { name: "Chicken breast", quantity: "400 g" },
        { name: "Panko", quantity: "1 cup" },
        { name: "Japanese curry roux", quantity: "1/2 pack" },
        { name: "Steamed rice", quantity: "2 cups" }
      ],
      instructions: ["Coat chicken breasts in egg and crunchy panko crumbs, then deep fry.", "Boil curry roux blocks with carrots/potatoes and pour over sliced chicken and hot rice."]
    },
    {
      id: 29,
      name: "Chole Bhature",
      category: "main",
      isVeg: true,
      description: "Spiced chickpea curry with fluffy deep-fried bread.",
      image: "https://images.unsplash.com/photo-1775211578178-61f06027adf3?auto=format&fit=crop&w=1200&q=80",
      ingredients: [
        { name: "Chickpeas", quantity: "2 cups" },
        { name: "Refined flour", quantity: "2 cups" },
        { name: "Yogurt", quantity: "1/2 cup" },
        { name: "Amchur", quantity: "1 tsp" }
      ],
      instructions: ["Simmer soaked chickpeas with dark tea bags and rich spices.", "Knead an airy flour dough with yogurt, roll thick rounds, and deep fry until fully ballooned."]
    },
    {
      id: 30,
      name: "Malai Kofta",
      category: "main",
      isVeg: true,
      description: "Fried paneer-potato balls in rich tomato-cashew gravy.",
      image: "https://images.unsplash.com/photo-1775211578178-61f06027adf3?auto=format&fit=crop&w=1200&q=80",
      ingredients: [
        { name: "Paneer", quantity: "200 g" },
        { name: "Potato", quantity: "2 Pc" },
        { name: "Cashew paste", quantity: "1/4 cup" },
        { name: "Fresh cream", quantity: "1/2 cup" }
      ],
      instructions: ["Mash paneer and potato together, stuff with raisins, roll to balls, and fry.", "Make a sweet cashew-tomato gravy, garnish with fresh cream, and drop in koftas."]
    },
    {
      id: 31,
      name: "Prawn Moilee",
      category: "main",
      isVeg: false,
      description: "Kerala-style prawns in coconut milk and curry leaves.",
      image: "https://images.unsplash.com/photo-1775211578178-61f06027adf3?auto=format&fit=crop&w=1200&q=80",
      ingredients: [
        { name: "Prawns", quantity: "400 g" },
        { name: "Coconut milk", quantity: "400 ml" },
        { name: "Curry leaves", quantity: "2 sprigs" },
        { name: "Turmeric", quantity: "1/2 tsp" }
      ],
      instructions: ["Gently cook green chilies, ginger, and curry leaves in hot coconut oil.", "Add light turmeric, fresh prawns, and thin coconut milk. Finish with thick milk reduction."]
    },
    {
      id: 32,
      name: "Mushroom Risotto",
      category: "main",
      isVeg: true,
      description: "Creamy arborio rice with wild mushrooms and parmesan.",
      image: "https://images.unsplash.com/photo-1775211578178-61f06027adf3?auto=format&fit=crop&w=1200&q=80",
      ingredients: [
        { name: "Arborio rice", quantity: "300 g" },
        { name: "Mixed mushrooms", quantity: "300 g" },
        { name: "Parmesan", quantity: "80 g" },
        { name: "White wine", quantity: "100 ml" }
      ],
      instructions: ["Sauté mixed mushrooms with garlic.", "Slowly stir hot stock ladle-by-ladle into arborio rice, finishing with wine and plenty of parmesan."]
    },
    {
      id: 33,
      name: "Lamb Tagine",
      category: "main",
      isVeg: false,
      description: "Moroccan lamb with dried apricots, almonds, and couscous.",
      image: "https://images.unsplash.com/photo-1775211578178-61f06027adf3?auto=format&fit=crop&w=1200&q=80",
      ingredients: [
        { name: "Lamb shoulder", quantity: "600 g" },
        { name: "Dried apricot", quantity: "1/2 cup" },
        { name: "Almonds", quantity: "1/4 cup" },
        { name: "Couscous", quantity: "1 cup" }
      ],
      instructions: ["Brown the lamb cuts inside an authentic tagine or clay pot.", "Add dried apricots, sweet honey, exotic Moroccan spices, and slow cook for hours."]
    },
    {
      id: 34,
      name: "Katsu Ramen",
      category: "main",
      isVeg: false,
      description: "Rich tonkotsu broth with noodles, egg, and pork chashu.",
      image: "https://images.unsplash.com/photo-1775211578178-61f06027adf3?auto=format&fit=crop&w=1200&q=80",
      ingredients: [
        { name: "Ramen noodles", quantity: "2 portions" },
        { name: "Chashu", quantity: "150 g" },
        { name: "Soft-boiled egg", quantity: "2 Pc" },
        { name: "Nori", quantity: "2 sheets" }
      ],
      instructions: ["Bring savory miso or bone broth to a steady, piping hot boil.", "Assemble cooked ramen noodles, pork slices, soft boiled egg halves, and crispy seaweed."]
    },
    {
      id: 35,
      name: "Rasmalai",
      category: "desert",
      isVeg: true,
      description: "Soft cheese discs soaked in saffron-cardamom milk.",
      image: "https://images.unsplash.com/photo-1775211578178-61f06027adf3?auto=format&fit=crop&w=1200&q=80",
      ingredients: [
        { name: "Full cream milk", quantity: "1 litre" },
        { name: "Chenna", quantity: "300 g" },
        { name: "Saffron", quantity: "few strands" },
        { name: "Cardamom", quantity: "4 pods" }
      ],
      instructions: ["Prepare tiny flatten patties out of kneaded milk solids (chenna).", "Poach them in water syrup, squeeze out gently, and immerse in sweet saffron rabri."]
    },
    {
      id: 36,
      name: "Chocolate Lava Cake",
      category: "desert",
      isVeg: true,
      description: "Warm chocolate cake with molten centre and vanilla ice cream.",
      image: "https://images.unsplash.com/photo-1775211578178-61f06027adf3?auto=format&fit=crop&w=1200&q=80",
      ingredients: [
        { name: "Dark chocolate", quantity: "150 g" },
        { name: "Butter", quantity: "80 g" },
        { name: "Eggs", quantity: "3 Pc" },
        { name: "Plain flour", quantity: "40 g" }
      ],
      instructions: ["Whip melted chocolate and real butter with egg whites and yolks.", "Fold flour, fill ramekins, and bake at high heat exactly until edges firm but centre remains fluid."]
    },
    {
      id: 37,
      name: "Tiramisu",
      category: "desert",
      isVeg: true,
      description: "Coffee-soaked ladyfingers with mascarpone and cocoa.",
      image: "https://images.unsplash.com/photo-1775211578178-61f06027adf3?auto=format&fit=crop&w=1200&q=80",
      ingredients: [
        { name: "Mascarpone cheese", quantity: "250 g" },
        { name: "Espresso coffee", quantity: "1 cup" },
        { name: "Ladyfingers", quantity: "12 Pc" },
        { name: "Sugar", quantity: "1/2 cup" }
      ],
      instructions: ["Whip cold mascarpone cheese smoothly with a bit of sugar and egg yolks.", "Dip cookie sponge layers inside robust espresso, top with cheese mixture, dust cocoa."]
    }
  ];

  useEffect(() => {
    const getSingleRecipe = async () => {
      try {
        const response = await fetch("https://serverless-api-teal.vercel.app/api/recipes");
        const data = await response.json();
        
        let allRecipes = localFallbackRecipes;
        if (data.success && data.data && data.data.length > 0) {
          allRecipes = data.data;
        }
        
        const found = allRecipes.find((item) => String(item.id) === String(id));
        setRecipe(found || null);
        setLoading(false);
      } catch (err) {
        console.error("Could not load details:", err);
        const found = localFallbackRecipes.find((item) => String(item.id) === String(id));
        setRecipe(found || null);
        setLoading(false);
      }
    };

    getSingleRecipe();
  }, [id]);

  if (loading) {
    return (
      <div className="loading-container">
        <h2>Loading Recipe Details...</h2>
      </div>
    );
  }

  if (!recipe) {
    return (
      <div className="error-container">
        <h2>Recipe not found!</h2>
        <Link to="/">Back to Menu</Link>
      </div>
    );
  }

  const isSaved = savedrecipes?.some((item) => String(item.id) === String(recipe.id)) || false;

  return (
    <div className="detail-page-container">
      <header className="detail-header">
        <button onClick={() => navigate("/")} className="back-btn">
          ← Back to Menu
        </button>
        <button
          onClick={() => togglesaverecipe(recipe)}
          className="save-detail-btn"
        >
          {isSaved ? "❤️ Saved to Party List" : "🖤 Save Recipe"}
        </button>
      </header>

      <div className="detail-layout">
        <div className="detail-hero">
          <img src={recipe.image} alt={recipe.name} className="detail-img" />
          <div className="detail-title-box">
            <h1>{recipe.name}</h1>
            <span className="recipe-tag">{recipe.category}</span>
          </div>
        </div>

        <div className="detail-content">
          <div className="detail-section">
            <h3>Description</h3>
            <p>{recipe.description}</p>
          </div>

          <div className="detail-section">
            <h3>Ingredients Needed</h3>
            <ul className="ingredients-list">
              {recipe.ingredients && recipe.ingredients.map((ing, index) => (
                <li key={index}>
                  {typeof ing === "object" ? `${ing.name} - ${ing.quantity}` : ing}
                </li>
              ))}
            </ul>
          </div>

          <div className="detail-section">
            <h3>Preparation Instructions</h3>
            <ol className="instructions-list">
              {recipe.instructions && recipe.instructions.map((step, index) => (
                <li key={index}>{step}</li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}