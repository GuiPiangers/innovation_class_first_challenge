import { Menu } from "./menu.js"

export class MainMenu extends Menu {
    #departmentsStruct
    
    /** @type {HTMLElement} */
    #menuCategoriesElement = null
    
    /** @type {HTMLElement[]} */
    #menuItensElements = null
    
    selectedDepartment = "department1"
    isOpen = false

    /**
     * 
     * @param {HTMLElement} popover 
     * @param {HTMLElement} toggleElements 
     * @param {*} departmentStruct 
     */
    constructor(popover, toggleElements, departmentStruct) {
        super(popover, toggleElements)
        this.#departmentsStruct = departmentStruct
        this.#menuCategoriesElement = popover.querySelector(".menu__categories")
        this.#renderCategories()

        /** @type {HTMLElement[]} */        
        const menuItens = Array.from(popover.querySelectorAll(".menu__list__item"))

        menuItens.forEach(menuItem => {
            menuItem.addEventListener("click", (e) => {
                const target = /** @type {HTMLElement} */ (e.currentTarget);
                const selectedElement = target.getAttribute("id")
                this.setSelectedDepartment(selectedElement)
            })
        });

        this.#menuItensElements = menuItens
    }

    /**
     * @param {string} item 
     */
    setSelectedDepartment(item) {
        this.selectedDepartment = item
        this.#setActiveDepartmentStyle()
        this.#renderCategories()
    }

    #getDepartmentStruct() {
        return this.#departmentsStruct[this.selectedDepartment]
    }

    #renderCategories() {
        const categoriesHTML = Object.entries(this.#getDepartmentStruct()).reduce((acc, [key, value])=>{
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
    
        this.#menuCategoriesElement.innerHTML = categoriesHTML
    }

    #setActiveDepartmentStyle(){
        this.#menuItensElements.forEach(menuItem => {
            menuItem.classList.remove("--selected")
    
            if(menuItem.getAttribute("id") === this.selectedDepartment){
                menuItem.classList.add("--selected")
            }
        });
    }
}