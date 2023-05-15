import db from "../config/mongo.js";

const Products = db.collection("products");

export default Products;
