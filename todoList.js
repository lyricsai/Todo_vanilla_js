function onPageLoaded() {
    const input = document.querySelector('#todo__input')
    const add = document.querySelector('#todo__add')
    const remove = document.querySelector('#todo__remove')
    const hide = document.querySelector('#todo__hide')
    const show = document.querySelector('#todo__show')
    const empty = document.querySelector('#todo__empty')

    let list = document.querySelector('#todo__list')
    let liNodes = document.getElementsByTagName("LI")

    function fromSaveTodoList() {
        list.innerHTML = localStorage.getItem('todos')
    }

    fromSaveTodoList()

    function isEmpty() { (liNodes.length === 0) ? empty.innerText = 'is Empty' : empty.innerText = '' }
    isEmpty()

    function createTodo() {
        if (!input.value) { return input.placeholder = 'Type something...' }

        const li = document.createElement("li")
        const todoText = document.createElement("p")
        todoText.classList.add("todo__text")
        todoText.append(input.value)

        list.appendChild(li).append(todoText)
        input.value = ""
        isEmpty()
    }

    function checkToggle(event) {
        if (event.target.tagName === "LI") {
            event.target.classList.toggle("checked")
        } else if (event.target.tagName === "P") {
            event.target.parentNode.classList.toggle("checked")
        }
    }

    list.addEventListener("click", checkToggle)

    add.addEventListener('click', () => {
        createTodo()
        saveTodoList()
    })

    remove.addEventListener('click', () => {

        Array.from(liNodes).forEach(liNode => {
            if (liNode.classList.contains('checked')) {
                liNode.remove()
            }
        })
        isEmpty()
        saveTodoList()
    })

    hide.addEventListener('click', () => {

        Array.from(liNodes).forEach(liNode => {
            if (liNode.classList.contains('checked')) {
                liNode.style.display = 'none'
            }
        })
        saveTodoList()
    })

    show.addEventListener('click', () => {

        Array.from(liNodes).forEach(liNode => {
            if (liNode.classList.contains('checked') && liNode.style.display === 'none') {
                liNode.style.display = 'flex'
            }
        })
        saveTodoList()
    })

    function saveTodoList() {
        localStorage.setItem('todos', list.innerHTML)
    }

}
document.addEventListener("DOMContentLoaded", onPageLoaded)
