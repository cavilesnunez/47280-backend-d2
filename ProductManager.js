    const fs = require('fs');

    class ProductManager {
    constructor(filePath) {
        this.path = filePath;
        this.products = [];
        this.loadProducts();
    }

    loadProducts() {
        try {
        const data = fs.readFileSync(this.path, 'utf-8');
        this.products = JSON.parse(data);
        } catch (error) {
        // Si no existe o está vacío, inicialice vacío.
        this.products = [];
        }
    }

    saveProducts() {
        fs.writeFileSync(this.path, JSON.stringify(this.products, null, 2), 'utf-8');
    }

    addProduct(product) {
        const newProduct = {
        ...product,
        id: this.products.length + 1, 
        };
        this.products.push(newProduct);
        this.saveProducts();
    }

    getProducts() {
        return this.products;
    }

    getProductById(id) {
        return this.products.find((product) => product.id === id);
    }

    updateProduct(id, updatedProduct) {
        this.products = this.products.map((product) =>
        product.id === id ? { ...updatedProduct, id } : product
        );
        this.saveProducts();
    }

    deleteProduct(id) {
        this.products = this.products.filter((product) => product.id !== id);
        this.saveProducts();
    }
    }

    module.exports = ProductManager;
