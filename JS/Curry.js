//  Curry 
function curry(fn) {
  return function curried(...args) {
    if (args.length >= fn.length) {
      return fn.apply(this, args);
    }
    return function (...args2) {
      return curried.apply(this, args.concat(args2));
    };
  };
}

// Example function to curry
function filterProducts(category, priceRange, rating, products) {
  return products.filter(product =>
    product.category === category &&
    product.price >= priceRange.min &&
    product.price <= priceRange.max &&
    product.rating >= rating
  );
}

// Curry the function for filtering products
const curriedFilter = curry(filterProducts);

// Partial application for specific scenarios
const electronicsFilter = curriedFilter('Electronics');
const affordableElectronics = electronicsFilter({ min: 100, max: 500 });
const highRatedElectronics = affordableElectronics(4);

// Example list of products
const productList = [
  { name: 'Laptop', category: 'Electronics', price: 400, rating: 4.5 },
  { name: 'Camera', category: 'Electronics', price: 250, rating: 3.8 },
  { name: 'Headphones', category: 'Electronics', price: 120, rating: 4.2 }
];

// Usage
const filteredProducts = highRatedElectronics(productList);
console.log(filteredProducts);
