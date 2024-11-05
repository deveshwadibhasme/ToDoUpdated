let taskInput = document.querySelector('.input')
let taskValue = document.querySelector('.task-value')
let taskContainer = document.querySelector('.task-list-container')

function taskAdd(){
    let taskList = document.createElement('li')
    taskList.className = 'task-list'
    taskList.innerHTML = `<div class="check function">
                    <img src="/img/not-checked.png" class="check-tap" alt="check">
                </div>
                <input class="task-value" autofocus readonly value="${taskInput.value}"></input>
                <div class="edit function">
                    <img src="/img/edit.png" class="edit-tap" alt="edit">
                </div>
                <div class="delete function">
                    <img src="/img/delete.png" class="delete-tap" alt="delete">
                </div>`
    taskContainer.appendChild(taskList)
}

function addTask(){
        if (taskInput.value === '') {
        }
        else{
        taskAdd();
    }
}


document.addEventListener('click', (e) => {
    console.log(e)
    if(e.target.className === 'edit-tap'){
        const taskSelector = e.target.parentNode.previousElementSibling
        taskSelector.toggleAttribute('readonly')
        taskSelector.focus()
        taskSelector.setSelectionRange(taskSelector.value.length, taskSelector.value.length);
        let editDone = false
        if(e.target.src === `${window.location.origin}/img/edit.png`){
            editDone = true
        }
        e.target.src = editDone ? `${window.location.origin}/img/edit-done.svg` : `${window.location.origin}/img/edit.png`
    }
})

taskValue.addEventListener('keyup', (e) => {
    console.log(e)
    if(e.key === 'Enter'){
        e.target.setAttribute('readonly','true')
        let editDone = false
        if(e.target.nextElementSibling.childNodes[1].src === `${window.location.origin}/img/edit.png`){
            editDone = true
        }
        e.target.nextElementSibling.childNodes[1].src = editDone ? `${window.location.origin}/img/edit-done.svg` : `${window.location.origin}/img/edit.png`
    }
})