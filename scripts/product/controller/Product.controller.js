import { ProductCard } from "../model/Product.js"
import {ProductsView, ShopCardView} from "../view/Product.view.js"
/** @type {Array<HTMLButtonElement>} */
const productButtons = Array.from(document.querySelectorAll('[data-card="button-container"]'))
/** @type {HTMLDivElement} */
const shopCardQuantity = document.querySelector('[data-product="shop-card"]')

class ProductCardController {
    /** @type {ProductCard} */
    #productCardModel
    /** @type {ProductsView} */
    #productCardView

    /**
     * 
     * @param {ProductCard} productCardModel 
     * @param {ProductsView} productCardView 
     * @param {ShopCardView} shopCardView 
     */
    constructor(productCardModel, productCardView, shopCardView){
        this.#productCardModel = productCardModel
        this.#productCardView = productCardView
        this.#productCardView.initialize({
            getQuantity: (id) => this.#productCardModel.getQuantity(id), 
            onDecreaseQuantity: (id) => {
                this.#removeProduct(id)
                this.#updateShopCard()
            }, 
            onIncreaseQuantity: (id) => {
                const product = {
                    id,
                    name: "exemplo",
                    price: 0,
                    quantity: 1
                }

                this.#productCardModel.addProduct(product)
                this.#updateShopCard()            }
        })
    }

        #updateShopCard() {
            const totalQuantity = this.#productCardModel.getQuantityAll()
            shopCardView.updateCardProduct(totalQuantity < 100 ? totalQuantity.toString() : "+99")
        }

    /** @param {string} id */
    #removeProduct(id){
        return this.#productCardModel.removeProduct(id, 1)
    }
}

const productCardModel = new ProductCard()
const productCardView = new ProductsView({productButtons})
const shopCardView = new ShopCardView({ shopCardQuantity })
const productCardController = new ProductCardController(productCardModel, productCardView, shopCardView)

export { productCardController }