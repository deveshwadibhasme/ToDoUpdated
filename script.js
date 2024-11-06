let taskInput = document.querySelector('.input')
let taskValue = document.querySelector('.task-value')
let taskContainer = document.querySelector('.task-list-container')
let taskListLI = document.querySelector('.task-list')

function addTask() {                                        // Function for trigger add button
    if (taskInput.value === '') {
    }
    else {
        taskAdd();
    }
    saveForLater()
}
let currentTiming = new Date().toLocaleTimeString('en-us',  // Function for Current Timing
    {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
    })

function taskAdd() {                                        // HTML function for Adding task to taskContainer
    if (taskInput.value === '') {
    } else {
        let taskList = document.createElement('li')
        taskList.className = 'task-list'
        taskListAnime(taskList);
        taskList.innerHTML = `<div class = "check function">
                    <img src = "/img/not-checked.png" class = "check-tap" alt= "check">
                </div>
                <input class = "task-value" autofocus readonly value="${taskInput.value}" style = "cursor:pointer;"></input>
                <div class = "edit function">
                    <img src = "/img/edit.png" class="edit-tap" alt="edit">
                </div>
                <div class = "delete function">
                    <img src = "/img/delete.png" class="delete-tap" alt="delete">
                </div>
                <div class = "timing">Time: ${currentTiming}</div>`
        taskContainer.appendChild(taskList)
        saveForLater();
    }
    taskInput.value = ''
}

taskContainer.addEventListener('click', (e) => {            // Mouse Events Edit,Delete & Checked
    // Edit
    if (e.target.className === 'edit-tap') {
        // Input Changing
        const taskSelector = e.target.parentNode.previousElementSibling
        taskSelector.toggleAttribute('readonly')
        taskSelector.focus()
        taskSelector.setSelectionRange(taskSelector.value.length, taskSelector.value.length);
        saveForLater();
        // Sign Changing
        let editDone = true
        if (e.target.src === `${window.location.origin}/img/edit.png`) {
            editDone = false
            saveForLater();
        }
        e.target.src = editDone ? `${window.location.origin}/img/edit.png` : `${window.location.origin}/img/edit-done.svg`
        saveForLater();
    }

    // Delete
    if (e.target.className === 'delete-tap') {
        const taskDeletion = e.target.parentNode.parentNode
        taskListAnime(e.target, taskDeletion)
        setTimeout(() => taskDeletion.remove(), 200);
        saveForLater();
    }

    // Checked
    if (e.target.className === 'check-tap' || e.target.className === 'task-value') {
        let checkedBtn = e.target
        let checked = true
        if (checkedBtn.src === `${window.location.origin}/img/not-checked.png`) {
            checked = false
        }
        checkedBtn.src = checked ? `${window.location.origin}/img/not-checked.png` : `${window.location.origin}/img/checked.png`
        // if task was click
        if (e.target.className === 'task-value') {
            let taskClick = e.target
            if (taskClick.previousElementSibling.childNodes[1].src === `${window.location.origin}/img/not-checked.png`) {
                taskClick.previousElementSibling.childNodes[1].src = `${window.location.origin}/img/checked.png`
            } else {
                taskClick.previousElementSibling.childNodes[1].src = `${window.location.origin}/img/not-checked.png`
            }
            saveForLater();
        }
        saveForLater();
    }
    saveForLater();
})

taskContainer.addEventListener('keyup', (e) => {            // Keyboard Events Edit,Delete & Check
    // Edit
    if (e.key === 'Enter') {
        e.target.setAttribute('readonly', 'true')
        let editDone = false
        if (e.target.nextElementSibling.childNodes[1].src === `${window.location.origin}/img/edit.png`) {
            editDone = true
        }
        e.target.nextElementSibling.childNodes[1].src = editDone ? `${window.location.origin}/img/edit-done.svg` : `${window.location.origin}/img/edit.png`
    }
    saveForLater();
})
taskInput.addEventListener('keyup', (e) => {                // Keyboard Events Edit,Delete & Check
    if (e.key === 'Enter') {
        if (taskInput.value === '') {
        }
        else {
            taskAdd();
        }

    }
    saveForLater();
})

let count = 0;
function taskListAnime(fade, parentClass) {                 // RandomAnimation Function
    if (fade.className === 'task-list') {
        if (count % 2 === 0) {
            fade.style.animation = 'faded-in-right  0.4s linear'
        } else {
            fade.style.animation = 'faded-in-left 0.4s linear'
        }
    }
    if (fade.className === 'delete-tap') {
        if (count % 2 == 0) {
            parentClass.style.animation = 'faded-out-left 0.2s ease-out'
        } else {
            parentClass.style.animation = 'faded-out-right 0.2s ease-out'
        }
    }
    count++;
}

function saveForLater() {
    localStorage.setItem('data', taskContainer.innerHTML)
}

function showTheData() {
    let data = localStorage.getItem('data')
    taskContainer.innerHTML = data
}
showTheData();