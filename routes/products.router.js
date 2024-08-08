const express = require("express");
const router = express.Router();
const ProductService = require("./../services/product.services");
const service = new ProductService();
const Joi = require('@hapi/joi');
const JoiValidator = require('@wastimy/joi-middleware');
const validateProduct = require('./../middlewares/productValidation');


router.get('/', async (req, res) => {
  try {
    const products = await service.find();
    res.json(products);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

router.get('/filter', (req, res) => {
  res.send('Yo soy un filter ¡Yeah! ');
});

router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await service.findOne(id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    next(error);
  }
});

router.post('/', validateProduct, async (req, res, next) => {
  try {
    const { name, price } = req.body;
    const newProduct = await service.create({ name, price });
    res.json({
      message: 'created :)',
      data: newProduct,
    });
  } catch (error) {
    next(error);
  }
});

router.patch('/:id', validateProduct, async (req, res, next) => {
  try {
    const { id } = req.params;
    const body = req.body;
    const product = await service.update(id, body);
    res.json({
      message: 'updated ;)',
      data: product,
    });
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const response = await service.delete(id);
    res.json({
      message: 'deleted :(',
      data: response,
    });
  } catch (error) {
    next(error);
  }
});








///////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////
/*
let product = [
  {
    id: 1,
    name: "Manzana",
    price: "2",
  },
];

router.get("/listProduct", (req, res) => {
  if (product.length === 0) {
    res.json({
      message: "No hay productos disponibles.",
    });
  } else {
    res.json(product);
  }
});
*/
// http://localhost:3000/api/v1/products AGREGAR UN PRODUCTO

/*
{
    "name": "Mango",
    "price": 5
}
 */

/*
router.post("/", (req, res) => {
  const { name, price } = req.body;
  const nuevoProducto = {
    id: product.length + 1,
    name,
    price,
  };

  product.push(nuevoProducto);
  res.json({
    message: "created",
    data: nuevoProducto,
  });
});
*/

// http://localhost:3000/api/v1/products/1
/*
{
    "name": "Mango",
    "price": 5
}

*/

/*
router.patch("/:id", (req, res) => {
  const { id } = req.params;

  const { name, price } = req.body;
  const producto = product.find((p) => p.id == id);

  if (!producto) {
    return res.status(404).json({ message: "Producto no encontrado :(" });
  }

  if (name) {
    producto.name = name;
  }
  if (price) {
    producto.price = price;
  }

  res.json({
    message: "updated",
    data: producto,
  });
});
*/

// http://localhost:3000/api/v1/products/idProductoAeliminar

/*
router.delete("/:id", (req, res) => {
  const { id } = req.params;

  const productoEncontrado = product.findIndex((product) => product.id == id);

  if (productoEncontrado !== -1) {
    const eliminarProducto = product.splice(productoEncontrado, 1);
    res.json({
      message: "deleted",
      data: eliminarProducto,
    });
  } else {
    res.status(404).json({ message: "Producto no encontrado :(" });
  }
});
*/

module.exports = router;
