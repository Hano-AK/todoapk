const input = document.querySelector("input");
const addButton = document.querySelector("#next");
const ul = document.querySelector("ul");
const li = document.querySelectorAll("li");

let datas = [];

let id = 0;

function addTodo() {

    ++id;
    const inputValue = input.value;
    if (inputValue.trim()) {
        console.log(inputValue);
        const todoModel = {
            id: id,
            text: inputValue,
            completed: false
        };

        if (!localStorage.getItem('datas')) {


            datas.push(todoModel);

            localStorage.setItem('datas', JSON.stringify(datas));





        } else {
            console.log(typeof datas);
            datas = JSON.parse(localStorage.getItem('datas'));
            console.log(typeof datas);

            /* datas.push(todoModel);*/
            console.log(datas);


            localStorage.setItem('datas', JSON.stringify(datas))


        }


        input.value = '';
        renderAllTodo();





    }

}
addButton.addEventListener("click", addTodo);


const todotemplate = function(todo) {
    return `<li class ="todolist"><div id ="elt" onclick="completeTask(${todo.id})" class=${
        todo.completed && "completed"
      }><span>${todo.text}</span>
            <button  onclick="deleteTodo(${todo.id})" class="delete">delete</button>
            </div>`;

}


function renderAllTodo() {

    let newtodolist = '';
    /*if (localStorage.getItem('datas')) {
        datas = JSON.parse(localStorage.getItem('datas'));*/
    for (let i = 0; i < datas.length; i++) {
        newtodolist += todotemplate(datas[i]);
    }

    ul.innerHTML = newtodolist;
}

/*}*/



function deleteTodo(id) {

    // [1,2,3,4,5,6,7,8]
    // datas = datas.filter((el) => el.id != id);
    const newDatas = [];

    for (let i = 0; i < datas.length; i++) {
        if (datas[i].id !== id) {
            newDatas.push(datas[i])
        }
    }
    datas = newDatas;
    console.log(datas);
    renderAllTodo();
}


function completeTask(id) {
    datas = datas.map((element) => {
        console.log(element);
        if (element.id === id) {
            element.completed = !element.completed;
        }
        return element;
    });
    console.log(datas);

    renderAllTodo();
}
renderAllTodo();