import { hashPassword } from "../lib/hashPasswordArgon2.js";
import { prisma } from "../lib/prisma.js";
// let users = [
//   {
//     id: 1,
//     fullName: "Itsna Maulana Hasan",
//     email: "hasanmaulana453@gmail.com",
//     password: "12345",
//   },
//   {
//     id: 2,
//     fullName: "Budi",
//     email: "budi@mail.com",
//     password: "12345",
//   },
//   {
//     id: 3,
//     fullName: "Budu",
//     email: "budu@mail.com",
//     password: "12345",
//   },
//   {
//     id: 4,
//     fullName: "Budo",
//     email: "budo@mail.com",
//     password: "12345",
//   },
//   {
//     id: 5,
//     fullName: "Bude",
//     email: "bude@mail.com",
//     password: "12345",
//   },
//   {
//     id: 6,
//     fullName: "Buda",
//     email: "buda@mail.com",
//     password: "12345",
//   },
// ];

export async function addUser(data) {
  try {
    const hashed = await hashPassword(data.password);
    const result = await prisma.user.create({
      data: {
        fullName: data.fullName,
        email: data.email,
        password: hashed,
      },
    });
    return result;
  } catch (err) {
    console.log("Error while register: ", err);
    throw err;
  }
}

export async function getUserByEmail(email) {
  try {
    const result = await prisma.user.findFirst({
      where: {
        email: email,
      },
    });

    return result;
  } catch (err) {
    console.log("Error while get data user by email: ", err);
    throw err;
  }
}
