export class Product{
    id
    #price = 0
    #quantity = 1

    constructor({name, price, quantity, id}){
        this.id = id
        this.name = name
        this.#price = price
        this.#quantity = quantity || 1
    }

    getPrice() {
        return this.#price
    }

    getQuantity() {
        return this.#quantity 
    }
}

/**
 * @typedef {Object} ProductDTO
 * @property {string} id
 * @property {string} name
 * @property {number} price
 * @property {number} quantity
 */



export class ProductCard{
    /** @type {Map<string, Product>} */
    products = new Map()
    #repository

    constructor(repository){
        this.#repository = repository
        const products = this.#repository.listProducts() || []
        this.products = products.map(productDTO => new Product(productDTO))
    }

    /** @param {ProductDTO} product */
    addProduct(product){
        this.products.set(product.id, new Product(product))
        this.#repository.addProduct(product)
    }

    /** @param {string} id */
    removeProduct(id){
        const productIndex = this.products.delete(id)
        this.#repository.removeProduct(id)
    }

    /** @param {string} id */
    getProduct(id){
        return this.products.find(product => product.id === id )
    }

    getPrice(){
        return this.products.reduce((acc, product) => {
            return acc + (product.getPrice() * product.getQuantity())
        }, 0)
    }

    getQuantityAll(){
        return this.products.reduce((acc, product) => {
            return acc + product.getQuantity()
        }, 0)
    }

    /** @param {string} id */
    getQuantity(id){
        return this.products.find((product) => {
            return product.id === id
        }).getQuantity()
    }
}
