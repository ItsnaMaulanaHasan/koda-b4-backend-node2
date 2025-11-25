let products = [
  {
    id: 1,
    name: "Mixue Ice Cream",
    price: 8000,
  },
  {
    id: 2,
    name: "BOBA Sundae",
    price: 16000,
  },
  {
    id: 3,
    name: "Strawberry Mi-Shake",
    price: 16000,
  },
  {
    id: 4,
    name: "BOBA Mi-Shake",
    price: 16000,
  },
  {
    id: 5,
    name: "Chocolate Cookies Smoothies",
    price: 16000,
  },
  {
    id: 6,
    name: "Brown Sugar Pearl Milk Tea",
    price: 19000,
  },
  {
    id: 7,
    name: "Pearl Milk Tea",
    price: 22000,
  },
  {
    id: 8,
    name: "Oats Milk Tea",
    price: 22000,
  },
  {
    id: 9,
    name: "Coconut Jelly Milk Tea",
    price: 22000,
  },
  {
    id: 10,
    name: "Red Bean Milk Tea",
    price: 22000,
  },
  {
    id: 11,
    name: "Fresh Squeezed Lemonade",
    price: 10000,
  },
  {
    id: 12,
    name: "Peach Earl Grey Tea",
    price: 16000,
  },
  {
    id: 13,
    name: "Original Jasmine Tea",
    price: 10000,
  },
  {
    id: 14,
    name: "Original Earl Grey Tea",
    price: 10000,
  },
];

function getListProducts(search, sortname, sortprice) {
  const results = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  if (sortname && sortname === "asc") {
    results.sort((a, b) => a.name.localeCompare(b.name));
  }

  if (sortname && sortname === "desc") {
    results.sort((a, b) => b.name.localeCompare(a.name));
  }

  if (sortprice && sortprice === "asc") {
    results.sort((a, b) => a.price - b.price);
  }

  if (sortprice && sortprice === "desc") {
    results.sort((a, b) => b.price - a.price);
  }

  return results;
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
  getListProducts,
  getProductsById,
  addDataProduct,
  updateProductById,
  deleteProductById,
};
