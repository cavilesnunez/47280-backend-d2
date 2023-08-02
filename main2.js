    import { promises as fs } from 'fs';

    const FILE_PATH = './productos.txt';

    const readProducts = async () => {
    try {
        const content = await fs.readFile(FILE_PATH, 'utf-8');
        return JSON.parse(content);
    } catch (error) {
        // Si ocurre un error al leer el archivo devolvemos un array vacío
        return [];
    }
    };

    const saveProducts = async (products) => {
    await fs.writeFile(FILE_PATH, JSON.stringify(products));
    };

    const addProduct = async (product) => {
    const products = await readProducts();
    if (products.find((existingProduct) => existingProduct.id === product.id)) {
        return "Producto ya agregado";
    }
    products.push(product);
    await saveProducts(products);
    };

    const getProducts = async () => {
    const products = await readProducts();
    console.log(products);
    };

    const getProductById = async (id) => {
    const products = await readProducts();
    const product = products.find((product) => product.id === id);
    if (product) {
        console.log(product);
    } else {
        console.log("Producto no existe");
    }
    };

    const updateProduct = async (id, updatedAttributes) => {
    const products = await readProducts();
    const productIndex = products.findIndex((product) => product.id === id);
    if (productIndex !== -1) {
        // Actualizar atributos del producto
        Object.assign(products[productIndex], updatedAttributes);
        await saveProducts(products);
    } else {
        console.log("Producto no encontrado");
    }
    };

    const deleteProduct = async (id) => {
    const products = await readProducts();
    const filteredProducts = products.filter((product) => product.id !== id);
    await saveProducts(filteredProducts);
    };

    const product = { nombre: "Papa", id: 3 };

    // Ejemplos de uso
    // addProduct(product);
    // getProducts();
    // getProductById(2);
    // updateProduct(1, { nombre: "Espinaca" });
    // deleteProduct(1);
