const input = document.querySelector(".forminput");
const addButton = document.querySelector("#next");
const ul = document.querySelector("ul");
const li = document.querySelectorAll("li");
const editbtn = document.querySelectorAll('.edit');
//NON
const modalbg = document.querySelector('.modal-bg');
const closebtn = document.querySelector('.fermer'); //QUEL BOUTON
const inputBtt = document.querySelector(".finput");
const saveBtt = document.querySelector(".savebtn"); //JE FAIS QUERY SELECTOR SANS LE ALL?CEST CA
const text = document.querySelector('.completed');
const hidden = document.querySelector('#hidden');
let datas = [];
let id = 0;
//non moi meme je necomprends pas

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





    } //DACCORD//DDACCORD ENVOIE MOI CA 

}
addButton.addEventListener("click", addTodo);


const todotemplate = function(todo, key) {
    return `<li class ="todolist"><div id ="elt" ><div class ="spa"><span  onclick="completeTask(${key})" class=${
        todo.completed && "completed"}>${todo.text}</span></div>
        <button onclick="editTodo(${key})" class="edit">Edit</button>
      <button  onclick="deleteTodo(${key})" class="delete">delete</button>

            </div>`;

}



function renderAllTodo() {

    let newtodolist = '';
    if (localStorage.getItem('datas')) {
        datas = JSON.parse(localStorage.getItem('datas'));
        for (let i = 0; i < datas.length; i++) {
            newtodolist += todotemplate(datas[i], i); //dac
        }

        ul.innerHTML = newtodolist;
    }

}




function deleteTodo(k) {


    // [1,2,3,4,5,6,7,8]
    // datas = datas.filter((el) => el.id != id);


    const newDatas = [];

    for (let i = 0; i < datas.length; i++) {
        if (k !== i) {
            console.log(id);
            newDatas.push(datas[i])
        }
    }
    datas = newDatas;
    localStorage.setItem('datas', JSON.stringify(datas));

    console.log(datas);
    renderAllTodo();
}




function completeTask(k) {
    datas = datas.map((element, index) => {
        console.log(element);
        if (k === index) {
            element.completed = !element.completed;
        }
        return element;

    });
    localStorage.setItem("datas", JSON.stringify(datas))

    console.log(datas);

    renderAllTodo();
};




function editTodo(k) {
    console.log(k);

    modalbg.classList.add("modal-active");
    closebtn.addEventListener("click", function() {
        modalbg.classList.remove("modal-active");
    });
    inputBtt.value = datas[k].text; //le k cest lindice de lelement tableau,ka
    //saveBtt.forEach(myFunction);


    //
    saveBtt.addEventListener("click", function() { //dacc// ALADE parle un peu fort stp
        //OK CEST A DIRE LINDICE DE LELEMENT


        datas[k].text = inputBtt.value; //je fais quoi tu as dis
        localStorage.setItem("datas", JSON.stringify(datas));
        console.log(datas);
        modalbg.classList.remove("modal-active");
        renderAllTodo(); //non  repete stp//pour parcourir chaque element OUII OUI
        console.log(datas[k].text);


    });

}
renderAllTodo();