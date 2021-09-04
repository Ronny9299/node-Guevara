import express from 'express';
import morgan from 'morgan';
import pkg from '../package-lock.json';

import productRoutes from "./routes/products.routes";

const app = express();

app.set('pkg', pkg);

app.use(morgan('dev'));
app.use(express.json());

app.get('/', (req, res) => {
    res.json({
        author: app.get('pkg').name,
        decription: app.get('pkg').decription,
        version: app.get('pkg').version
    })
})

app.use('/products', productRoutes);
export default app;