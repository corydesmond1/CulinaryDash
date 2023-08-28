require('dotenv').config();
require('./config/database');

const Category = require('./models/category');
const Item = require('./models/item');

// IIFE
// Immediately Invoked Function Expression
(async function() {
  await Category.deleteMany({});
  const categories = await Category.create([
    {name: 'Antipasti', sortOrder: 10},
    {name: 'Insalata', sortOrder: 20},
    {name: 'Pastas', sortOrder: 30},
    {name: 'Pizzas', sortOrder: 40},
    {name: 'Sides/Contorni', sortOrder: 50},
    {name: 'Desserts/Desserts', sortOrder: 60},
    {name: 'Drinks', sortOrder: 70},
  ]);

  await Item.deleteMany({});
  const items = await Item.create([
    {
      name: "Spaghetti Carbonara",
      description:
        "Spaghetti with creamy egg and cheese sauce, pancetta, and black pepper.",
      category: categories[2],  
      price: 14.99,
    },
    {
      name: "Margherita Pizza",
      description:
        "Fresh mozzarella, tomatoes, basil, and olive oil on thin crust.",
      category: categories[3],
      price: 12.99,
    },
    {
      name: "Chicken Alfredo",
      description:
        "Grilled chicken with fettuccine pasta in creamy Alfredo sauce.",
      category: categories[2],
      price: 16.49,
    },
    {
      name: "Ravioli Marinara",
      description:
        "Cheese-filled ravioli with marinara sauce and Parmesan cheese.",
      category: categories[2],  
      price: 13.99,
    },
    {
      name: "Lasagna Bolognese",
      description:
        "Layered pasta with rich meat sauce, béchamel, and melted cheese.",
      category: categories[2],
      price: 15.99,
    },
    {
      name: "Caprese Salad",
      description:
        "Fresh mozzarella, tomatoes, and basil drizzled with balsamic glaze.",
      category: categories[1],
      price: 9.49,
    },
    {
      name: "Tiramisu",
      description:
        "Classic Italian dessert with layers of coffee-soaked ladyfingers and mascarpone.",
      category: categories[5],  
      price: 7.99,
    },
    {
      name: "Veal Piccata",
      description:
        "Tender veal medallions in lemon-caper sauce with pasta on the side.",
      category: categories[4],
      price: 18.99,
    },
    {
      name: "Penne Arrabbiata",
      description:
        "Penne pasta in spicy tomato sauce with garlic and red pepper flakes.",
      category: categories[2],
      price: 11.99,
    },
    {
      name: "Gelato",
      description: "Assorted flavors of creamy Italian gelato.",
      category: categories[5],
      price: 5.99,
    },
  ]);

  console.log(items)

  process.exit();

})();
