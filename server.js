const express = require('express');
const app = express();
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const PORT = process.env.PORT || 8000;

app.use(express.json());
app.listen(PORT, () => console.log(`server is running on port ${PORT}`));

// GET method route
app.get('/products', async (req, res) => {
  try {
    const latestProducts = await prisma.product.findMany({
      take: 10,
      orderBy: {
        createdAt: 'desc',
      },
    });
    return res.json(latestProducts);
  }catch(err){
    console.log(err);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
})

// GET method route
app.get('/products/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const product = await prisma.product.findUnique({
      where: {
        id: Number(id),
      },
    });
    return res.json(product);
  }catch(err){
    console.log(err);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
})

// POST method route
app.post('/products/register', async (req, res) => {
  const { name, price } = req.body;

  if (!name || !price) {
    return res.status(400).json({ message: '入力項目が空です' });
  }

  try {
    const resp = await prisma.product.create({
      data: {
        name,
        price,
      },
    });

    res.status(201).json(resp);
  }catch(err){
    console.log(err);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
})

// PUT method route
app.put('/products/update/:id', async (req, res) => {
  const { id } = req.params;
  const { name, price } = req.body;

  if (!name || !price) {
    return res.status(400).json({ message: '入力項目が空です' });
  }

  try {
    const resp = await prisma.product.update({
      where: {
        id: Number(id),
      },
      data: {
        name,
        price,
      },
    });

    res.status(200).json(resp);
  }catch(err){
    console.log(err);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
})

// DELETE method route
app.delete('/products/delete/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const resp = await prisma.product.delete({
      where: {
        id: Number(id),
      },
    });

    res.status(200).json(resp);
  }catch(err){
    console.log(err);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
})