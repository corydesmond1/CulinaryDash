const americanMenu = [
  {
    name: "Classic Cheeseburger",
    description:
      "Juicy beef patty with American cheese, lettuce, tomato, and pickles.",
    price: 9.99,
  },
  {
    name: "BBQ Ribs",
    description: "Slow-cooked pork ribs glazed with tangy barbecue sauce.",
    price: 18.99,
  },
  {
    name: "Chicken Wings",
    description:
      "Crispy fried chicken wings with a choice of buffalo or BBQ sauce.",
    price: 12.49,
  },
  {
    name: "Caesar Salad",
    description:
      "Romaine lettuce, croutons, Parmesan cheese, and Caesar dressing.",
    price: 8.99,
  },
  {
    name: "Grilled Cheese Sandwich",
    description:
      "Toasted bread with melted cheddar cheese, served with tomato soup.",
    price: 7.99,
  },
  {
    name: "Macaroni and Cheese",
    description: "Creamy macaroni with a blend of melted cheeses.",
    price: 10.49,
  },
  {
    name: "Apple Pie",
    description:
      "Classic American dessert with flaky crust and spiced apple filling.",
    price: 6.99,
  },
  {
    name: "Fried Chicken Basket",
    description: "Crispy fried chicken tenders with coleslaw and fries.",
    price: 11.99,
  },
  {
    name: "Cheese Fries",
    description: "Golden fries loaded with melted cheese and bacon bits.",
    price: 6.49,
  },
  {
    name: "Milkshake",
    description: "Thick and creamy milkshake in various flavors.",
    price: 4.99,
  },
];

export default americanMenu;

// Example usage:
console.log(americanMenu[1].name); // Output: "BBQ Ribs"
console.log(americanMenu[3].description); // Output: "Romaine lettuce, croutons, Parmesan cheese, and Caesar dressing."
console.log(americanMenu[8].price); // Output: 6.49
