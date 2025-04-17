import { Menu } from "./menu.js"

export class MobileMenu extends Menu {

    /** @type {Element} */
    #menuContainer
    /**
     * @param {Element} popover 
     * @param {Element} toggleElements
    */
    constructor(popover, toggleElements){
        super(popover, toggleElements)
        this.#menuContainer = popover.querySelector("#accordion")
    }

    /** @param {{ [key: string]: { [key: string]: { href: string; name: string; } []}}} menuStruct*/
    renderPopover(menuStruct){
        const menuHTML = Object.entries(menuStruct).reduce((acc, [departmentName, department]) => {
            const categories = Object.entries(department).reduce((acc, [subCategoryName, subcategory]) => {
                const itens = subcategory.reduce((acc, category) => {
                    return acc + `<a href="${category.href}" class="menu__category__link">${category.name}</a>`
                }, "")
                
                const subCategoryHTML = `
                    <div>
                        <h4 class="menu__title">${"Categoria"}</h4>
                        <ul class="menu__list">
                            ${itens}
                        </ul>
                    </div>
                `

                return acc + subCategoryHTML
                
            }, "")

            const departmentHTML = `
                <li class="accordion__item">
                    <button class="accordion__header">
                        <span>${"Departamento"}</span>
                        <img class="accordion__arrow" src="/public/images/accordion-arrow.svg">
                    </button>
                    <div class="accordion__body">
                        <div class="accordion__content">
                            ${categories}
                        </div>
                    </div>
                </li>
            `

            return acc + departmentHTML
        }, "")

        this.#menuContainer.innerHTML = menuHTML
    }
}