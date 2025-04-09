export class ProductCardRepository {
    #storageKey = 'cart_products'
  
    #getStoredProducts() {
      const productsJSON = localStorage.getItem(this.#storageKey);
      return productsJSON ? JSON.parse(productsJSON) : [];
    }
  
    #saveProducts(products) {
      localStorage.setItem(this.#storageKey, JSON.stringify(products));
    }
  
    addProduct(product) {
      const products = this.#getStoredProducts();
      products.push(product);
      this.#saveProducts(products);
    }
  
    removeProduct(productName) {
      const products = this.#getStoredProducts();
      const filtered = products.filter(p => p.name !== productName);
      this.#saveProducts(filtered);
    }
  
    listProducts() {
      return this.#getStoredProducts();
    }
  }
  