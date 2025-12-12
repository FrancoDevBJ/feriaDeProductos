const express = require('express');
require('dotenv').config();
const morgan = require('morgan');

const productsRouter = require('./routes/product.routes');
const authRoutes = require('./routes/auth.routes');
/* const cartRoutes = require('./routes/cart.routes');
const favoritesRoutes = require('./routes/favorites.routes');
const usersRoutes = require('./routes/user.routes'); */
const connectDB = require('./config/database');

const app = express();

connectDB();

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1/auth', authRoutes);
app.use("/api/v1/products", productsRouter)
/* app.use('/api/v1/cart', cartRoutes);
app.use('/api/v1/favorites', favoritesRoutes);
app.use('/api/v1/users', usersRoutes); */


const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`)
})