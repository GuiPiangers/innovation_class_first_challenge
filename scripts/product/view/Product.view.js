const productButtons = Array.from(document.querySelectorAll('[data-card="button"]'))


function initializeListeners({onButtonClick}){
    const handleOnButtonClick = (button) => {
        button.addEventListener("click", onButtonClick, {once: true})
    }

    productButtons.forEach(handleOnButtonClick , {once: true})
}

initializeListeners()