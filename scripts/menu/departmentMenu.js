import { Menu } from "./menu.js"
import { menuCategory } from "./menuCategory.js"

export class DepartmentMenu extends Menu {
    /** @type {{ [key: string]: { href: string; name: string; } []}} */
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
            Object.entries(this.#categoriesStruct)
                .reduce((acc, [categoryName, itens])=>{
                    return acc + menuCategory(categoryName, itens)
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