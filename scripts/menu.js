const mainMenuToggleButton = document.getElementById("main_menu_toggle_bt")
const mainMenuElement = document.getElementById("main_menu")
const departmentMenuElement = document.getElementById("department_menu")

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
    isOpen = false

    constructor(popover) {
        this.#popover = popover
    }
    
    toggle(){
        this.isOpen = !this.isOpen
        this.#setElementVisible(this.isOpen)
    }
    
    close(){
        this.#setElementVisible(false)
        this.isOpen = false
    }

    #setElementVisible(isVisible){
        const closeOnClickOut = (e) => {
            if(!this.#popover.contains(e.target)){
                this.close()
                document.removeEventListener("click", closeOnClickOut)
            }
        }

        const closeOnEsq = (e) => {
            if(e.code === "Escape"){
                this.close()
                document.removeEventListener("keyDown", closeOnEsq)
            }
        }

        if(!isVisible) {
            this.#popover.classList.add("--hidden")
        } else {
            this.#popover.classList.remove("--hidden")
            document.addEventListener("click", closeOnClickOut)
            document.addEventListener("keydown", closeOnEsq)
        }
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

    constructor(popover) {
        super(popover)
        this.#menuCategoriesElement = popover.getElementsByClassName("menu__categories")[0]
        this.#renderCategories()
        
        const menuItens = Array.from(popover.getElementsByClassName("menu__list__item"))

        menuItens.forEach(menuItem => {
            menuItem.addEventListener("click", (e) => {
                const selectedElement = e.currentTarget.getAttribute("id")
                mainMenu.setSelectedDepartment(selectedElement)
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

    constructor(popover, categoriesStruct) {
        super(popover)
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

        console.log(categoriesHTML)
                
        this.#categoryContainerElement.innerHTML = '<h3 class="font--regular font--bold">Departamento</h3>' + categoriesHTML
    }
}

const mainMenu = new MainMenu(mainMenuElement)
const departmentMenu = new DepartmentMenu(departmentMenuElement, defaultMenuCategories)

mainMenuToggleButton.addEventListener("click", (e)=>{
    e.stopPropagation()
    mainMenu.toggle()
})