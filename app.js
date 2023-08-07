    const ProductManager = require('./ProductManager');
    const fs = require('fs');

    const filePath = 'productos.txt';
    const productManager = new ProductManager(filePath);

    // Obtener el primer argumento proporcionado desde la consola (omitimos "node" y "app.js")
    const args = process.argv.slice(2);
    const command = args[0];

    // Función para mostrar la lista de productos
    function showProducts() {
    const allProducts = productManager.getProducts();
    console.log('Todos los productos:', allProducts);
    }

    // Función para agregar un nuevo producto
    function addProduct(title, description, price, thumbnail, code, stock) {
    const newProduct = { title, description, price, thumbnail, code, stock };
    productManager.addProduct(newProduct);
    console.log('Nuevo producto agregado:', newProduct);
    }

    // Función para obtener un producto por ID
    function getProductById(id) {
    const productById = productManager.getProductById(parseInt(id));
    if (productById) {
        console.log('Producto con ID', id, ':', productById);
    } else {
        console.log('Producto no encontrado');
    }
    }

    // Función para actualizar un producto por ID
    function updateProduct(id, price, stock) {
    const productById = productManager.getProductById(parseInt(id));
    if (productById) {
        const updatedProduct = { ...productById, price: parseFloat(price), stock: parseInt(stock) };
        productManager.updateProduct(parseInt(id), updatedProduct);
        console.log('Producto actualizado:', updatedProduct);
    } else {
        console.log('Producto no encontrado');
    }
    }

    // Función para eliminar un producto por ID
    function deleteProduct(id) {
    const productToDelete = productManager.getProductById(parseInt(id));
    if (productToDelete) {
        productManager.deleteProduct(parseInt(id));
        console.log('Producto eliminado:', productToDelete);
    } else {
        console.log('Producto no encontrado');
    }
    }

    // Manejo de comandos y ejecución de funciones
    switch (command) {
    case 'show':
        showProducts();
        break;
    case 'add':
        const [, title, description, price, thumbnail, code, stock] = args;
        addProduct(title, description, parseFloat(price), thumbnail, code, parseInt(stock));
        break;
    case 'get':
        const [, id] = args;
        getProductById(id);
        break;
    case 'update':
        const [, productId, newPrice, newStock] = args;
        updateProduct(productId, parseFloat(newPrice), parseInt(newStock));
        break;
    case 'delete':
        const [, productIdToDelete] = args;
        deleteProduct(productIdToDelete);
        break;
    default:
        console.log('Comando no reconocido. Uso: node app.js [show | add | get | update | delete]');
        break;
    }
