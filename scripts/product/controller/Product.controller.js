import { ProductCard } from "../model/Product"
import { ProductCardRepository } from "../model/Product.repository"

class ProductCardController {
    #productCardModel

    constructor(productCardModel){
        this.#productCardModel = productCardModel
    }

    addProduct(product){
        return this.#productCardModel.addProduct(product)
    }

    removeProduct(product){
        return this.#productCardModel.removeProduct(product)
    }

    getPrice(){
        return this.#productCardModel.getPrice()
    }
}

const productCardRepository = new ProductCardRepository()
const productCardModel = new ProductCard(productCardRepository)
const productCardController = new ProductCardController(productCardModel)

export { productCardController }