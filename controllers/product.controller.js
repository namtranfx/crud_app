const dbproduct = require('../models/product.models.js');

const getAllProduct = async (req, res) => {
    try {
      const product = await dbproduct.getAll();
      res.status(200).json(product);
    } catch (err) {
      res.status(500).json({message: err.message});
    }
  
};

const getProductByID = async (req, res) => {
    try {
      const product = await dbproduct.findById(req.params.id);
      res.status(200).json(product);
    } catch (err) {
      res.status(500).json({message: err.message});
    }
};

const createProduct = async (req, res) => {
    try {
      const result = await dbproduct.addProduct(req.body);
      res.status(201).json(result);
    } catch (err) {
      res.status(500).json({message: err.message})
    }
};

const updateProduct = async (req, res) => {
    try {
      const {id} = req.params;
      const product = {
        name: req.body.name,
        price: req.body.price,
        quantity: req.body.quantity,
        description: req.body.description
      }
      const result = dbproduct.updateProduct(id, product);
      
      if (result.rowCount === 0) {
        return res.status(404).json({ message: 'Product not found' });
      }
      return res.status(200).json({ message: 'Product updated successfully' });
    } catch (err) {
      res.status(500).json({ message: 'Internal server error' });
    }
};

const deleteProduct = async (req, res) => {
    try {
      const {id} = req.params;
      const result = dbproduct.deleteByID(id);
      if (result.rowCount === 0) {
        return res.status(404).json({ message: 'No product found to delete' });
      }
      return res.status(204).json({ message: 'Product deleted' });
    } catch (err) {
      res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = {
    getProductByID,
    getAllProduct,
    createProduct,
    updateProduct,
    deleteProduct
}