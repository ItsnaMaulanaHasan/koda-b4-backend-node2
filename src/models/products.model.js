let products = [
  {
    id: 1,
    image: null,
    name: "Mixue Ice Cream",
    price: 8000,
  },
  {
    id: 2,
    image: null,
    name: "BOBA Sundae",
    price: 16000,
  },
  {
    id: 3,
    image: null,
    name: "Strawberry Mi-Shake",
    price: 16000,
  },
  {
    id: 4,
    image: null,
    name: "BOBA Mi-Shake",
    price: 16000,
  },
  {
    id: 5,
    image: null,
    name: "Chocolate Cookies Smoothies",
    price: 16000,
  },
  {
    id: 6,
    image: null,
    name: "Brown Sugar Pearl Milk Tea",
    price: 19000,
  },
  {
    id: 7,
    image: null,
    name: "Pearl Milk Tea",
    price: 22000,
  },
  {
    id: 8,
    image: null,
    name: "Oats Milk Tea",
    price: 22000,
  },
  {
    id: 9,
    image: null,
    name: "Coconut Jelly Milk Tea",
    price: 22000,
  },
  {
    id: 10,
    image: null,
    name: "Red Bean Milk Tea",
    price: 22000,
  },
  {
    id: 11,
    image: null,
    name: "Fresh Squeezed Lemonade",
    price: 10000,
  },
  {
    id: 12,
    image: null,
    name: "Peach Earl Grey Tea",
    price: 16000,
  },
  {
    id: 13,
    image: null,
    name: "Original Jasmine Tea",
    price: 10000,
  },
  {
    id: 14,
    image: null,
    name: "Original Earl Grey Tea",
    price: 10000,
  },
];

function getTotalDataProducts(search) {
  const results = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  return results.length;
}

function getListProducts(search, sortname, sortprice, page, limit) {
  const results = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  if (sortname === "asc") {
    results.sort((a, b) => a.name.localeCompare(b.name));
  } else if (sortname === "desc") {
    results.sort((a, b) => b.name.localeCompare(a.name));
  }

  if (sortprice === "asc") {
    results.sort((a, b) => a.price - b.price);
  } else if (sortprice === "desc") {
    results.sort((a, b) => b.price - a.price);
  }

  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  const paginatedResults = results.slice(startIndex, endIndex);

  return paginatedResults;
}

function getProductsById(id) {
  return products.find((product) => product.id === id);
}

function addDataProduct(data) {
  data = { id: products.length + 1, ...data };
  products.push(data);
}

function updateProductById(id, body) {
  const index = products.findIndex((p) => p.id == id);

  if (index === -1) {
    return null;
  }

  products[index] = { ...products[index], ...body };
  return products[index];
}

function deleteProductById(id) {
  const data = products.find((product) => product.id === id);
  if (!data) {
    return false;
  }

  products = products.filter((product) => product.id !== id);
  return true;
}

module.exports = {
  getTotalDataProducts,
  getListProducts,
  getProductsById,
  addDataProduct,
  updateProductById,
  deleteProductById,
};
