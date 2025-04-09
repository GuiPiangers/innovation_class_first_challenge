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


export class ProductCard{
    products = []
    #repository

    constructor(repository){
        this.#repository = repository
        this.products = this.#repository.listProducts() || []
    }

    addProduct(product){
        this.products.push(product)
        this.#repository.addProduct(product)
    }

    removeProduct(product){
        const productIndex = this.products.findIndex(
            (pd) => pd.name === product.name
        )
        this.products.splice(productIndex, 1)
        this.#repository.removeProduct(product)
    }

    getPrice(){
        return this.products.reduce(acc, product => {
            return acc + (product.getPrice() * product.getQuantity())
        }, 0)
    }

    getQuantity(){
        return this.products.reduce(acc, product => {
            return acc + product.getQuantity()
        }, 0)
    }
}
