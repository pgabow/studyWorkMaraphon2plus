const placeholders = document.querySelectorAll('.placeholder')
const taskForm = document.querySelector('.create-task-block')
const taskFormInput = taskForm.querySelector('.create-task-block__input')

taskForm.addEventListener('submit', (evt) => {
   evt.preventDefault()

   const newTask = document.createElement('div')
   newTask.id = new Date().getTime()
   newTask.classList.add('item')
   newTask.draggable = true

   const buttonCloseTask = document.createElement('button')
   buttonCloseTask.type = 'button'
   buttonCloseTask.classList.add('button-close-task')

   const spanCloseTask = document.createElement('span')
   spanCloseTask.classList.add('span-close-task')
   spanCloseTask.classList.add('visually-hidden')
   // spanCloseTask.textContent='Close';

   buttonCloseTask.append(spanCloseTask)

   const buttonCorrectTask = document.createElement('button')
   buttonCorrectTask.type = 'button'
   buttonCorrectTask.classList.add('button-correct-task')

   const spanCorrectTask = document.createElement('span')
   spanCorrectTask.classList.add('span-correct-task')
   // spanCloseTask.classList.add('visually-hidden');
   spanCorrectTask.textContent = '...'

   buttonCorrectTask.append(spanCorrectTask)

   setTimeout(() => newTask.append(buttonCloseTask, buttonCorrectTask), 0)

   if (taskFormInput.value.trim()) {
      newTask.textContent = taskFormInput.value
   } else {
      alert('Заполните поле ввода')
      taskFormInput.value = ''
      return
   }

   newTask.addEventListener('dragstart', dragStart)
   newTask.addEventListener('dragend', dragEnd)

   placeholders[0].append(newTask)
   taskFormInput.value = ''

   buttonCloseTask.addEventListener('click', (evt) => {
      if (evt) {
         if (confirm('данная задача будет удалена! Продолжить?'))
            buttonCloseTask.parentElement.remove()
      }
   })
   buttonCorrectTask.addEventListener('click', (evt) => {
      if (evt) {
         const correctText = prompt(
            'введите изминения',
            newTask.textContent.slice(0, -3)
         )
         if (!correctText) return

         newTask.innerText = correctText
      }
      setTimeout(() => newTask.append(buttonCloseTask, buttonCorrectTask), 0)
   })
})

for (let placeholder of placeholders) {
   placeholder.addEventListener('dragover', dragOver)
   placeholder.addEventListener('drop', drop)
}

function dragOver(evt) {
   if (evt.target.className === 'placeholder') evt.preventDefault()
}

function dragStart(evt) {
   evt.dataTransfer.setData('id', evt.target.id)
   evt.target.classList.add('hold')
   setTimeout(() => evt.target.classList.add('hide'), 0)
}

function drop(evt) {
   let taskId = evt.dataTransfer.getData('id')
   if (evt.target.className === 'item') return
   evt.target.append(document.getElementById(taskId))
}

function dragEnd(evt) {
   evt.target.className = 'item'
}
