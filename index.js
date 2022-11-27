const express = require("express");
const app = express();

app.use(express.json());
app.use(express.static("."));

app.listen(8080);

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

app.get("/demo", async (req, res) => {
  let data = await prisma.user.findMany({
    include: {
      food_type: true,
    },
    where: {
      food_name: {
        contains: "w", // where food_name like %a%
      },
    },
  });
  res.send(data);
});

app.post("/createFood", async (req, res) => {
  let { food_name, image, price, desc, type_id } = req,
    body;

  // create food
  await prisma.food.create({
    data: {
      food_name,
      image,
      price,
      desc,
      type_id,
    },
  });

  // update food
  await prisma.food.update({
    where: { food_id: 1 },
    data: {
      food_name,
      image,
      price,
      desc,
      type_id,
    },
  });

  // delete food
  await prisma.food.delete({
    where: { food_id: 1 },
    data: {
      food_name,
      image,
      price,
      desc,
      type_id,
    },
  });

  res.send(data);
});
