"use strict"

const todoHolder = document.querySelector(".todo-holder")
const todoList = document.querySelector(".todo-list")
const todoDeleteIcon = document.querySelector(".todo-delete-icon")
const todosCount = document.querySelector(".todo-count")
const selectionTodo = document.querySelector(".selection-todo")
const todoNavigationBar = document.querySelector(".todo-navigation")
const clearCompletedTodo = document.querySelector(".clear-todos")
const inputTodo = document.querySelector(".input-todo")
const inputForm = document.querySelector("form")
const body = document.querySelector("body")
const toggleModes = document.querySelector(".toggle-modes")
const backGroundImg = document.querySelector(".background-img")
const todoHeader = document.querySelector(".todo-header")
const inputElement = document.querySelector("input")
const todoBottom = document.querySelector(".todo-bottom")

// MOBILE CLASSES
const mobileNav = document.querySelector(".mobile-nav")
const mobileBtnHolder = document.querySelector(".btn-holder")
const mobileAll = document.querySelector(".mobile-all")
const mobileActive = document.querySelector(".mobile-active")
const mobilecomplete = document.querySelector(".mobile-complete")





const displayTodo = function (todoData, status) {
    const checkMode = toggleModes.getAttribute("src")
    console.log(checkMode)
    // ./images/icon-sun.svg toggle-color-light
    const todoDataLength = todoData.length
    todoList.innerHTML = ""
    todoData.forEach(el => {
        todoList.insertAdjacentHTML("afterbegin", `<div class="todo-holder todo-header border-bottom ${checkMode === "./images/icon-moon.svg" ? "light-theme" : ""}">
                <div class="selection-todo">
                    <img class="strike-img ${el.strike === 1 ? "" : "hidden"}" src="./images/icon-check.svg" alt="check image" />
                </div>
                <p class="todo-text ${checkMode === "./images/icon-moon.svg" ? "toggle-color-light" : ""} ${el.strike === 1 ? "todoStrike" : ""}">${el.todos}</p>
                <button class="delete-todo">
                    <svg xmlns="http://www.w3.org/2000/svg" class="todo-delete-icon" fill="none" viewBox="0 0 24 24"
                        stroke="currentColor" stroke-width="2">
                        <path class="todo-delete-icon" stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>`)
    })
    todosCount.textContent = `${todoDataLength} item left`

}


//Local Storage function
const getLocalStorageData = function () {
    return JSON.parse(localStorage.getItem("todosData"))
}

const setLocalStorageData = function (data) {
    localStorage.setItem("todosData", JSON.stringify(data))
}


//Checking localstorage for the new window
let localStorageData = []
if (getLocalStorageData() === null) {
    localStorage.setItem("todosData", JSON.stringify(localStorageData))
}
else {
    localStorageData = getLocalStorageData()
}
displayTodo(getLocalStorageData())




inputForm.addEventListener("submit", function (e) {
    e.preventDefault()
    if (inputTodo.value === "") return
    localStorageData = getLocalStorageData()
    const newTodo = {
        todos: `${inputTodo.value}`,
        strike: 0
    }
    localStorageData.push(newTodo)
    setLocalStorageData(localStorageData)
    displayTodo(getLocalStorageData())
    inputTodo.value = ""
})


todoList.addEventListener("click", function (e) {
    console.log(e.target)
    if (e.target.classList.contains("todo-delete-icon")) {
        const currentTodoText = e.target.closest(".todo-holder").querySelector(".todo-text").textContent
        console.log(currentTodoText)
        // implement localstorage
        const newData = getLocalStorageData().filter(el => {
            return el.todos !== currentTodoText
        })
        setLocalStorageData(newData)
        displayTodo(getLocalStorageData())
    }


    //Strike Todo
    if (e.target.closest(".selection-todo")) {
        const todoStrike = e.target.closest(".selection-todo").parentElement.querySelector(".todo-text")
        const findTodo = localStorageData.findIndex(el => {
            return el.todos === todoStrike.textContent
        })
        localStorageData[findTodo].strike = localStorageData[findTodo].strike === 0 ? 1 : 0
        setLocalStorageData(localStorageData)
        todoStrike.classList.toggle("todoStrike")
        const strikeImg = e.target.closest(".selection-todo").parentElement.querySelector(".strike-img")
        localStorageData[findTodo].strike === 1 ? strikeImg.classList.remove("hidden") : strikeImg.classList.add("hidden")

    }

})



body.addEventListener("click", function (e) {

    if (e.target.classList.contains("completed")) {
        const completedTodo = getLocalStorageData().filter(el => {
            return el.strike === 1
        })
        displayTodo(completedTodo, "completed")
    }


    if (e.target.classList.contains("active")) {
        const activeTodo = getLocalStorageData().filter(el => {
            return el.strike === 0
        })
        displayTodo(activeTodo)
    }


    if (e.target.classList.contains("all")) {
        displayTodo(getLocalStorageData())
    }


})


clearCompletedTodo.addEventListener("click", function () {
    let newLocalStorageData = getLocalStorageData()
    const clearCompletedTodos = newLocalStorageData.filter(el => {
        return el.strike === 0
    })
    newLocalStorageData = clearCompletedTodos
    setLocalStorageData(newLocalStorageData)
    displayTodo(getLocalStorageData())
})


// TOGGLE MODES
let modeListener = true
body.style.backgroundColor = "#000"
const toggleFunction = function (status) {

    toggleModes.src = `./images/icon-${status === true ? "moon" : "sun"}.svg`
    backGroundImg.src = `./images/bg-desktop-${status === true ? "light" : "dark"}.jpg`
    todoHeader.classList.toggle("light-theme")
    todoList.classList.toggle("light-theme")
    body.style.backgroundColor = `${status ? "hsl(236, 33%, 92%)" : "#000"}`

    const todoText = document.querySelectorAll(".todo-text")
    todoText.forEach(el => {
        console.log(el)
        if (el.classList.contains("toggle-color-light")) {
            el.style.color = "#fff"
        }
        else {
            el.style.color = "#000"
        }
    })



    const allTodoHolder = document.querySelectorAll(".todo-holder")
    allTodoHolder.forEach(el => {
        el.style.backgroundColor = `${status ? "#fff" : "hsl(237, 14%, 26%)"}`
    })

    inputElement.style.backgroundColor = `${status ? "#fff" : "hsl(237, 14%, 26%)"}`


    inputElement.classList.toggle("light-theme")
    mobileNav.classList.toggle("mobile-nav-light-color")
    todosCount.classList.toggle("toggle-color")
    clearCompletedTodo.classList.toggle("toggle-color")
    todoBottom.classList.toggle("toggle-color")
}


toggleModes.addEventListener("click", function () {
    toggleFunction(modeListener)
    console.log(modeListener)
    modeListener = !modeListener

})

mobileBtnHolder.addEventListener("click", function (e) {
    if (e.target.classList.contains("mobile-all")) {
        e.target.style.color = "hsl(220, 98%, 61%)"
        mobileActive.style.color = ""
        mobilecomplete.style.color = ""

    }
    if (e.target.classList.contains("mobile-active")) {
        e.target.style.color = "hsl(220, 98%, 61%)"
        mobileAll.style.color = ""
        mobilecomplete.style.color = ""
    }
    if (e.target.classList.contains("mobile-complete")) {
        e.target.style.color = "hsl(220, 98%, 61%)"
        mobileAll.style.color = ""
        mobileActive.style.color = ""

    }
})
