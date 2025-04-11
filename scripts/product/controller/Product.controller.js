import { ProductCard } from "../model/Product"
import { ProductCardRepository } from "../model/Product.repository"
import {ProductCardView} from "../view/Product.view"

class ProductCardController {
    /** @type {ProductCard} */
    #productCardModel
    /** @type {ProductCardView} */
    #productCardView

    /**
     * 
     * @param {ProductCard} productCardModel 
     * @param {ProductCardView} productCardView 
     */
    constructor(productCardModel, productCardView){
        this.#productCardModel = productCardModel
        this.#productCardView = productCardView
        this.#productCardView.initialize({
            getQuantity: this.getQuantity, 
            onDecreaseQuantity: this.removeProduct, 
            onIncreaseQuantity: (id) => {
                const product = {
                    id,
                    name: "exemplo",
                    price: 0,
                    quantity: 1
                }

                this.addProduct(product)
            }
        })
    }

    /** @param {import("../model/Product").ProductDTO} product */
    addProduct(product){
        return this.#productCardModel.addProduct(product)
    }

    /** @param {string} id */
    removeProduct(id){
        return this.#productCardModel.removeProduct(id)
    }

    getPrice(){
        return this.#productCardModel.getPrice()
    }

    /** @param {string} id */
    getQuantity(id){
        return this.#productCardModel.getQuantity(id)
    }
}

const productCardRepository = new ProductCardRepository()
const productCardModel = new ProductCard(productCardRepository)
const productCardView = new ProductCardView()
const productCardController = new ProductCardController(productCardModel, productCardView)

export { productCardController }