import { Menu } from "./menu.js"

export class DepartmentMenu extends Menu {
    #categoriesStruct = {}
    #categoryContainerElement = null

    /**
     * @param {Element} popover 
     * @param {Element} toggleElements 
     * @param {*} categoriesStruct 
     */

    constructor(popover, toggleElements, categoriesStruct) {
        super(popover, toggleElements)
        this.#categoriesStruct = categoriesStruct
        this.#categoryContainerElement = popover.getElementsByClassName("popover-department__container")[0]
        this.#renderCategories()
    }

    #renderCategories(){
        const categoriesHTML = `<div class="menu__categories">` + 
            Object.entries(this.#categoriesStruct).reduce((acc, [key, value])=>{
                const itens = value.reduce((acc, item) => {
                    return acc + `<li><a class="menu__category__link" href="${item.href}">${item.name}</a></li>`
                }, "")
        
                return acc + `
                        <div class="col menu__category">
                            <h4 class="menu__title">${"Categoria"}</h4>
                            <ul class="menu__list">
                                ${itens}
                            </ul>
                        </div>
                `
            }, "")
        + `</div>`

        this.#categoryContainerElement.innerHTML = '<h3 class="font--regular font--bold">Departamento</h3>' + categoriesHTML
    }
}

/**
 * @param {Element} popoverMenuContainer 
 */
export function renderDepartmentsMenusAndTriggers(popoverMenuContainer){
    const popoverHTML = `
        <div class="popover --hidden" data-menu="department_popover">
            <div class="popover-department__container">
                // Data will be insert here
            </div>
            <div class="col destaque">
                <div class="menu__image">
                    <p>Confira os <br>Produtos<strong><br>Que <br/>acabaram<br/>De chegar</strong></p>
                    <button>VER TODOS</button>
                </div>
            </div>
        </div>`

    const departmentElements = new Array(8).fill(
        `<li>
            <button class="nav-item" data-toggle="department">Departamento</button>
        </li>` + popoverHTML
    )

    popoverMenuContainer.insertAdjacentHTML("beforeend", departmentElements.join(""))
}