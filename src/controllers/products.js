import Products from "../models/products.js";
import messages from "../utils/messages.js";
import { ObjectId } from "mongodb";

const allData = async (req, res) => {
  try {
    const data = await Products.find().toArray();

    messages(res, 200, "All Data", data);
  } catch (error) {
    messages(res, 500, error?.message || "Internal Server Error");
  }
};

const detailProduct = async (req, res) => {
  const id = req.params.id;
  try {
    const _id = new ObjectId(id)
    const detail = await Products.findOne({ _id });

    messages(res, 200, "Detail Product", detail);
  } catch (error) {
    messages(res, 404, error?.message || "Product not found");
  }
};

const deleteProduct = async (req, res) => {
  const id = req.params.id;
  try {
    const _id = new ObjectId(id)
    const detail = await Products.findOne({ _id });

    if(!detail) {
      return messages(res, 404, "Product not found, Delete Unsuccess");
    } else {
      await Products.deleteOne({ _id }) 
      return messages(res, 200, "Delete Success");
    };
    
  } catch (error) {
    messages(res, 500, error?.message || "Internal Server Error");
  }
};

const createProduct = async (req, res) => {
  const data = req.body;

  try {
    const detail = await Products.findOne({name: data.name})

    if (!detail) {
        await Products.insertOne(data);
        return messages(res, 201, "Create Success");   
      } else {
        messages(res, 400, "Product already exist, create unsuccess");
      }   

    } catch (error) {
      messages(res, 500, error?.message || "Internal Server Error");
    }    

};

const updateProduct = async (req, res) => {
  const id = req.params.id;
  const data = req.body;

  try {
    const _id = new ObjectId(id)
    const detail = await Products.findOne({ _id });

    if(!detail) {
      return messages(res, 404, "Product not found, Update Unsuccess");
    } else {
      await Products.updateOne({ _id }, { $set: { ...data } });

      return messages(res, 200, "Update Success");
    };
    
  } catch (error) {
    messages(res, 500, error?.message || "Internal Server Error");
  }
};


export { allData, detailProduct, deleteProduct, createProduct, updateProduct };
