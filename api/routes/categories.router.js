const express = require('express');
const router = express.Router();


const categories = [
    {
        categoryId: "1",
        categoryName: "Electrónica",
        products: [
            { productId: "1", productName: "Televisor", price: 500, quantity: 10 },
            { productId: "2", productName: "Laptop", price: 1000, quantity: 5 },
            { productId: "3", productName: "Teléfono", price: 300, quantity: 20 },
            { productId: "4", productName: "Auriculares", price: 50, quantity: 50 },
            { productId: "5", productName: "Cámara", price: 700, quantity: 8 },
            { productId: "6", productName: "Altavoz", price: 100, quantity: 15 },
            { productId: "7", productName: "Teclado", price: 30, quantity: 25 },
            { productId: "8", productName: "Ratón", price: 20, quantity: 30 },
            { productId: "9", productName: "Monitor", price: 200, quantity: 10 },
            { productId: "10", productName: "Impresora", price: 150, quantity: 12 },
        ]
    },
    {
        categoryId: "2",
        categoryName: "Hogar",
        products: [
            { productId: "1", productName: "Sofá", price: 300, quantity: 5 },
            { productId: "2", productName: "Mesa", price: 150, quantity: 10 },
            { productId: "3", productName: "Silla", price: 50, quantity: 20 },
            { productId: "4", productName: "Cama", price: 400, quantity: 3 },
            { productId: "5", productName: "Lámpara", price: 30, quantity: 25 },
            { productId: "6", productName: "Reloj de pared", price: 20, quantity: 15 },
            { productId: "7", productName: "Estantería", price: 100, quantity: 10 },
            { productId: "8", productName: "Alfombra", price: 70, quantity: 8 },
            { productId: "9", productName: "Cortinas", price: 40, quantity: 20 },
            { productId: "10", productName: "Espejo", price: 60, quantity: 12 },
        ]
    },
    {
        categoryId: "3",
        categoryName: "Ropa",
        products: [
            { productId: "1", productName: "Camisa", price: 25, quantity: 30 },
            { productId: "2", productName: "Pantalones", price: 40, quantity: 20 },
            { productId: "3", productName: "Zapatos", price: 60, quantity: 15 },
            { productId: "4", productName: "Chaqueta", price: 100, quantity: 10 },
            { productId: "5", productName: "Sombrero", price: 15, quantity: 50 },
            { productId: "6", productName: "Bufanda", price: 20, quantity: 25 },
            { productId: "7", productName: "Guantes", price: 10, quantity: 30 },
            { productId: "8", productName: "Calcetines", price: 5, quantity: 40 },
            { productId: "9", productName: "Vestido", price: 50, quantity: 12 },
            { productId: "10", productName: "Traje", price: 150, quantity: 5 },
        ]
    }
];

router.get('/:categoryId/productos/:productId', (req, res) => {
    const { categoryId, productId } = req.params;

    const category = categories.find(cat => cat.categoryId === categoryId);
    if (!category) {
        return res.status(404).send(`Categoría con ID ${categoryId} no encontrada.`);
    }

    const product = category.products.find(prod => prod.productId === productId);
    if (!product) {
        return res.status(404).send(`Producto con ID ${productId} no encontrado en la categoría ${categoryId}.`);
    }

    res.json({
        categoryId,
        categoria: category.categoryName,
        productId,
        producto: product.productName,
        precio: product.price,
        cantidad: product.quantity
    });
});

module.exports = router;