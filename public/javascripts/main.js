
(() => {
    // /contact
    const productNameEl = document.querySelector("#productName")
    const emailEl = document.querySelector("#email")
    const contentsEl = document.querySelector("#contents")

    
    productNameEl.addEventListener('change', onChangeInputForm(productNameEl))
    emailEl.addEventListener('change', onChangeInputForm(emailEl))
    contentsEl.addEventListener('change', onChangeInputForm(contentsEl))

})();

function onChangeInputForm(el) {
    return function(e) {
        // console.log(el.children[0].classList.remove())
        const input = el.children[0]
        if(input.value.length > 0) {
            input.classList.remove('error')
            input.classList.remove('border-red-400')
            if(el.children.length === 2) {
                el.children[1].remove()
            }
        }
        
    }
}