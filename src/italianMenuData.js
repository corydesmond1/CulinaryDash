const italianMenu = [
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
];

export default italianMenu;

// Example usage:
console.log(italianMenu[2].name); // Output: "Chicken Alfredo"
console.log(italianMenu[4].description); // Output: "Layered pasta with rich meat sauce, béchamel, and melted cheese."
console.log(italianMenu[9].price); // Output: 5.99
