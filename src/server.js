const express = require('express');
require('dotenv').config();
const morgan = require('morgan');

const productsRouter = require('./routes/product.routes');

const app = express();
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/products", productsRouter)

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`)
})