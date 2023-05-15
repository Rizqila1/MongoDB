import express from "express";
import { allData, createProduct, deleteProduct, detailProduct, updateProduct } from "../controllers/products.js";

const Router = express.Router();

Router.get('/products', allData);
Router.get('/products/:id', detailProduct);
Router.delete('/products/:id', deleteProduct);
Router.post('/products/', createProduct);
Router.put('/products/:id', updateProduct);

export default Router;
