import { prisma } from "../lib/prisma.js";

// let products = [
//   {
//     id: 1,
//     image: null,
//     name: "Mixue Ice Cream",
//     price: 8000,
//   },
//   {
//     id: 2,
//     image: null,
//     name: "BOBA Sundae",
//     price: 16000,
//   },
//   {
//     id: 3,
//     image: null,
//     name: "Strawberry Mi-Shake",
//     price: 16000,
//   },
//   {
//     id: 4,
//     image: null,
//     name: "BOBA Mi-Shake",
//     price: 16000,
//   },
//   {
//     id: 5,
//     image: null,
//     name: "Chocolate Cookies Smoothies",
//     price: 16000,
//   },
//   {
//     id: 6,
//     image: null,
//     name: "Brown Sugar Pearl Milk Tea",
//     price: 19000,
//   },
//   {
//     id: 7,
//     image: null,
//     name: "Pearl Milk Tea",
//     price: 22000,
//   },
//   {
//     id: 8,
//     image: null,
//     name: "Oats Milk Tea",
//     price: 22000,
//   },
//   {
//     id: 9,
//     image: null,
//     name: "Coconut Jelly Milk Tea",
//     price: 22000,
//   },
//   {
//     id: 10,
//     image: null,
//     name: "Red Bean Milk Tea",
//     price: 22000,
//   },
//   {
//     id: 11,
//     image: null,
//     name: "Fresh Squeezed Lemonade",
//     price: 10000,
//   },
//   {
//     id: 12,
//     image: null,
//     name: "Peach Earl Grey Tea",
//     price: 16000,
//   },
//   {
//     id: 13,
//     image: null,
//     name: "Original Jasmine Tea",
//     price: 10000,
//   },
//   {
//     id: 14,
//     image: null,
//     name: "Original Earl Grey Tea",
//     price: 10000,
//   },
// ];

export async function getTotalDataProducts(search) {
  try {
    return await prisma.product.count({
      where: {
        name: {
          contains: search || "",
        },
      },
    });
  } catch (err) {
    console.error("Error get total product:", err);
    throw err;
  }
}

export async function getListProducts(
  search,
  sortname,
  sortprice,
  page,
  limit
) {
  try {
    const skip = (page - 1) * limit;
    const take = limit;

    const orderBy = [];

    if (sortname === "asc") orderBy.push({ name: "asc" });
    if (sortname === "desc") orderBy.push({ name: "desc" });

    if (sortprice === "asc") orderBy.push({ price: "asc" });
    if (sortprice === "desc") orderBy.push({ price: "desc" });

    const results = await prisma.product.findMany({
      where: {
        name: {
          contains: search || "",
        },
      },
      orderBy,
      skip,
      take,
    });

    return results;
  } catch (err) {
    console.error("Error get list products:", err);
    throw err;
  }
}

export async function getProductsById(id) {
  try {
    const result = await prisma.product.findUnique({
      where: { id: id },
    });

    return result;
  } catch (err) {
    console.error("Error get detail product:", err);
    throw err;
  }
}

export async function addDataProduct(data) {
  try {
    const result = await prisma.product.create({
      data: {
        name: data.name,
        price: data.price,
      },
    });

    return result;
  } catch (err) {
    console.error("Error while add data product:", err);
    throw err;
  }
}

export async function updateProductById(id, body) {
  try {
    const result = await prisma.product.update({
      where: { id: Number(id) },
      data: { ...body },
    });

    return result;
  } catch (err) {
    if (err.code === "P2025") {
      return null;
    }

    console.error("Error while update product:", err);
    throw err;
  }
}

export async function deleteProductById(id) {
  try {
    await prisma.product.delete({
      where: { id: Number(id) },
    });

    return true;
  } catch (err) {
    if (err.code === "P2025") {
      return false;
    }

    console.error("Error while delete product:", err);
    throw err;
  }
}
