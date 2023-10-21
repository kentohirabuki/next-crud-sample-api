const express = require('express');
const app = express();
const productRoute = require('./routers/product');

const PORT = process.env.PORT || 8000;

app.use(express.json());

app.use('/api/product', productRoute);

app.listen(PORT, () => console.log(`server is running on port ${PORT}`));

