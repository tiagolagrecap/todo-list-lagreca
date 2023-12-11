



const getBD= () => JSON.parse(localStorage.getItem ('todoList')) ?? [];
const setBD = (BD) => localStorage.setItem ('todoList', JSON.stringify(BD));



//CREATE TASK
 const createTask = (task, status, index) => {
    const item = document.createElement('label');
    item.classList.add('todo-item');
    item.innerHTML = ` 
    <input type="checkbox" ${status} data-index=${index}>
        <div>${task}</div>
    <input type="button" value="X" data-index=${index}>
    `;
    document.getElementById('todoList').appendChild(item)
 }

 
 //NO REPEAT FUNCTION
 const clearTasks = () =>{
    const todoList = document.getElementById('todoList');
    while (todoList.firstChild) {
        todoList.removeChild(todoList.lastChild);
    }
}


 //FOR LOOP  AND UPDATE BD AND SCREEN
 const updateScreen = () => {
    clearTasks();
    const BD = getBD();
    BD.forEach((item, index) => createTask (item.task, item.status, index));
 }

 //ADD TASK 
 const addTask = (event) => {
    const key = event.key;
    const task = event.target.value;
    if(key === 'Enter'){
        const BD = getBD();
        BD.push({'task': task, 'status': ''})
        setBD(BD);
        updateScreen();
        event.target.value = '';
    }

 }

 //REMOVE TASK
 const removerItem = (index) => {
    const BD = getBD();
    BD.splice(index, 1);
    setBD(BD);
    updateScreen();
 }

//GET CHECKBOX
const updateItem = (index) =>{
    const BD = getBD();
    BD[index].status = BD[index].status === '' ? 'checked' : '';
    setBD(BD);
    updateScreen();
}



//GET CLICK
const clickItem = (event) => {
    const element = event.target;
    if(element.type === 'button'){
        const index = element.dataset.index;
        removerItem(index);
    } else if(element.type === 'checkbox'){
        const index = element.dataset.index;
        updateItem(index);
    }
}

 document.getElementById('newItem').addEventListener('keypress', addTask);
 document.getElementById('todoList').addEventListener('click', clickItem);
 

 updateScreen();

