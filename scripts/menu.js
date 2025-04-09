const popoverMenuContainer = document.querySelector('[data-menu="popover_container"]')

function renderDepartmentsMenusAndTriggers(){
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
        `<li><button class="nav-item" data-toggle="department">Departamento</button></li>` + popoverHTML
    )

    popoverMenuContainer.insertAdjacentHTML("beforeend", departmentElements.join(""))
}

renderDepartmentsMenusAndTriggers()

const mainMenuToggleButton = document.getElementById("main_menu_toggle_bt")
const mainMenuElement = document.getElementById("main_menu")
const departmentMenuElement = document.getElementById("department_menu")
const departmentToggleMenuButtons = Array.from(document.querySelectorAll('[data-toggle="department"]'))

const defaultMenuCategories = {
    subcategory1: [
        {
            href: "/",
            name: "Categoria"
        },
        {
            href: "/",
            name: "Categoria"
        },
        {
            href: "/",
            name: "Categoria"
        },
        {
            href: "/",
            name: "Categoria"
        },
        {
            href: "/",
            name: "Categoria"
        },
        {
            href: "/",
            name: "Categoria"
        },
        {
            href: "/",
            name: "Categoria"
        },
    ],
    subcategory2: [
        {
            href: "/",
            name: "Categoria"
        },
        {
            href: "/",
            name: "Categoria"
        },
        {
            href: "/",
            name: "Categoria"
        },
        {
            href: "/",
            name: "Categoria"
        },
        {
            href: "/",
            name: "Categoria"
        },
        {
            href: "/",
            name: "Categoria"
        },
        {
            href: "/",
            name: "Categoria"
        },
    ],
    subcategory3: [
        {
            href: "/",
            name: "Categoria"
        },
        {
            href: "/",
            name: "Categoria"
        },
        {
            href: "/",
            name: "Categoria"
        },
        {
            href: "/",
            name: "Categoria"
        },
        {
            href: "/",
            name: "Categoria"
        },
        {
            href: "/",
            name: "Categoria"
        },
        {
            href: "/",
            name: "Categoria"
        },
    ],
}


class Menu {
    #popover = null
    #toggleElement = null
    isOpen = false

    constructor(popover, toggleElements) {
        this.#popover = popover
        this.#toggleElement = toggleElements

        this.#setToggleListener()
    }
    
    toggle(){
        this.isOpen = !this.isOpen
        if(this.isOpen) {
            this.#setElementVisible(true)
            this.#setElementCloseMethods()
        }
        else {
            this.#setElementVisible(false)
        }
    }
    
    close(){
        this.#setElementVisible(false)
        this.isOpen = false
    }

    #setElementCloseMethods(){
        const closeOnClickOut = (e) => {
            if(!this.#popover.contains(e.target) && (!this.#toggleElement.contains(e.target))){
                this.close()
                document.removeEventListener("click", closeOnClickOut)
                document.removeEventListener("keyDown", closeOnEsq)
            }
        }

        const closeOnEsq = (e) => {
            if(e.code === "Escape"){
                this.close()
                document.removeEventListener("keyDown", closeOnEsq)
                document.removeEventListener("click", closeOnClickOut)
            }
        }

        document.addEventListener("click", closeOnClickOut)
        document.addEventListener("keydown", closeOnEsq)
    }

    #setSelectedToggleButton(isSelected){
        if(isSelected) {
            this.#toggleElement.classList.add("--hidden")
        } else {
            this.#popover.classList.remove("--hidden")
        }
    }

    #setElementVisible(isVisible){
        if(!isVisible) {
            this.#popover.classList.add("--hidden")
        } else {
            this.#popover.classList.remove("--hidden")
        }
    }

    #setToggleListener(){
        this.#toggleElement.addEventListener("click", (e)=>{
            this.toggle()
        })
    }
}

class MainMenu extends Menu {
    #departmentsStruct = {
        department1: defaultMenuCategories,
        department2: defaultMenuCategories,
        department3: defaultMenuCategories,
        department4: defaultMenuCategories,
        department5: defaultMenuCategories,
        department6: defaultMenuCategories,
        department7: defaultMenuCategories,
        department8: defaultMenuCategories,
        department9: defaultMenuCategories,
        department10: defaultMenuCategories
    }

    #menuCategoriesElement = null
    selectedDepartment = "department1"
    isOpen = false
    #menuItensElements = null

    constructor(popover, toggleElements) {
        super(popover, toggleElements)
        this.#menuCategoriesElement = popover.querySelector(".menu__categories")
        this.#renderCategories()
        
        const menuItens = Array.from(popover.querySelectorAll(".menu__list__item"))

        menuItens.forEach(menuItem => {
            menuItem.addEventListener("click", (e) => {
                const selectedElement = e.currentTarget.getAttribute("id")
                this.setSelectedDepartment(selectedElement)
            })
        });

        this.#menuItensElements = menuItens
    }

    setSelectedDepartment(item) {
        this.selectedDepartment = item
        this.#setActiveDepartmentStyle(this)
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
    #setActiveDepartmentStyle(menu){
        this.#menuItensElements.forEach(menuItem => {
            menuItem.classList.remove("--selected")
    
            if(menuItem.getAttribute("id") === menu.selectedDepartment){
                menuItem.classList.add("--selected")
            }
        });
    }
}

class DepartmentMenu extends Menu {
    #categoriesStruct = {}
    #categoryContainerElement = null

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

new MainMenu(mainMenuElement, mainMenuToggleButton)

departmentToggleMenuButtons.forEach((toggleButton, index) => {
        const departmentMenuElements = Array.from(document.querySelectorAll(`[data-menu="department_popover"]`))

    new DepartmentMenu(departmentMenuElements[index], toggleButton, defaultMenuCategories)
})

