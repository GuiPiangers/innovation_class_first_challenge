export class Product{
    id
    #quantity = 1

    constructor({name, quantity, id}){
        this.id = id
        this.name = name
        this.#quantity = quantity ?? 1
    }

    getQuantity() {
        return this.#quantity 
    }
}

/**
 * @typedef {Object} ProductDTO
 * @property {string} id
 * @property {string} name
 * @property {number} quantity
 */



export class ProductCard{
    /** @type {{[key: string]: Product}} */
    products = {}

    /** @param {ProductDTO} product */
    addProduct(product){
        const currentProduct = this.products[product.id]
        this.products[product.id] = currentProduct 
            ? new Product({...product, quantity: product.quantity + currentProduct.getQuantity() }) 
            : new Product(product)
    }

    /** 
     * @param {string} id 
     * @param {number} quantity 
    */
    removeProduct(id, quantity){
        const currentProduct = this.products[id]

        if(quantity < 0) throw new Error("A quantidade deve ser maior que zero")
        if(this.products[id]?.getQuantity() - quantity < 0) return

        this.products[id] = currentProduct 
            ? new Product({...currentProduct, quantity: currentProduct.getQuantity() - quantity }) 
            : currentProduct
    }

    getQuantityAll(){
        return Object.values(this.products).reduce((acc, product) => {
            return acc + product.getQuantity()
        }, 0)
    }

    /** @param {string} id */
    getQuantity(id){
        return this.products[id]?.getQuantity() || 0
    }
}
