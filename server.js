const input = document.querySelector(".forminput");
const addButton = document.querySelector("#next");
const ul = document.querySelector("ul");
const li = document.querySelectorAll("li");
const editbtn = document.querySelectorAll('.edit');
const modalbg = document.querySelector('.modal-bg');
const closebtn = document.querySelector('.fermer');
const inputBtt = document.querySelector(".finput");
const saveBtt = document.querySelector('.savebtn');
const text = document.querySelector('.completed');
const hidden = document.querySelector('#hidden');
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

            datas.push(todoModel);
            console.log(datas);


            localStorage.setItem('datas', JSON.stringify(datas))


        }



        input.value = '';
        renderAllTodo();





    }

}
addButton.addEventListener("click", addTodo);


const todotemplate = function(todo) {
    return `<li class ="todolist"><div id ="elt" ><div class ="spa"><span  onclick="completeTask(${todo.id})" class=${
        todo.completed && "completed"}>${todo.text}</span></div>
        <button onclick="editTodo(${todo.id})" class="edit">Edit</button>
      <button  onclick="deleteTodo(${todo.id})" class="delete">delete</button>

            </div>`;

}



function renderAllTodo() {

    let newtodolist = '';
    if (localStorage.getItem('datas')) {
        datas = JSON.parse(localStorage.getItem('datas'));
        for (let i = 0; i < datas.length; i++) {
            newtodolist += todotemplate(datas[i]);
        }

        ul.innerHTML = newtodolist;
    }

}




function deleteTodo(id) {


    // [1,2,3,4,5,6,7,8]
    // datas = datas.filter((el) => el.id != id);


    const newDatas = [];

    for (let i = 0; i < datas.length; i++) {
        if (datas[i].id !== id) {
            console.log(id);
            newDatas.push(datas[i])
        }
    }
    datas = newDatas;
    localStorage.setItem('datas', JSON.stringify(datas));

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
    localStorage.setItem("datas", JSON.stringify(datas))

    console.log(datas);

    renderAllTodo();
};

function editTodo(id) {

    modalbg.classList.add("modal-active");
    closebtn.addEventListener("click", function() {
        modalbg.classList.remove("modal-active");
    });
    inputBtt.value = datas[id];











    saveBtt.addEventListener("click", function() {


        datas[id].text = inputBtt.value;
        console.log(id);
        localStorage.setItem("datas", JSON.stringify(datas));
        renderAllTodo();






    });
    modalbg.classList.add("modal-active");



}



renderAllTodo();



renderAllTodo();



renderAllTodo();