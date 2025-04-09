export class Product{
    #price = 0

    constructor({name, price}){
        this.name = name
        this.#price = price
    }

    getPrice() {
        return this.#price
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
        this.products.reduce(acc, product => {
            return acc + product.getPrice()
        }, 0)
    }
}
