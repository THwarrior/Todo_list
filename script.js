let listState = [];
const STATE_KEY = "todo-list";

function loadState(){
    const listState = localStorage.getItem(STATE_KEY);
    if(listState !== null){
        return JSON.parse(listState);
    }
    return [];
}

function saveState(list){
    localStorage.setItem(STATE_KEY, JSON.stringify(list));
}

function iniList(){
    // load state
    listState = loadState();

    // render list
    const ul = document.getElementById("list");
    for(const item of listState){
        // Put item into li
        const li = document.createElement("li");
        li.classList.add("item");
        li.innerText = item.text;
        li.onclick = checkItem;
        if(item.checked) li.classList.add("checked");

        const deleteButton = document.createElement("span");
        deleteButton.classList.add("delete");
        deleteButton.onclick = deleteItem;
        li.appendChild(deleteButton);
        
        ul.appendChild(li);
    }
}

function addItem(){
    const ul = document.getElementById("list");
    const input = document.getElementById("input");
    const text = input.value; /* get the input string from input */
    
    if(text === ""){
        alert("Please input the item");
        return;
    }

    const newItem = document.createElement("li");
    newItem.classList.add("item");
    newItem.innerText = text;
    newItem.onclick = checkItem;

    const deleteButton = document.createElement("span");
    deleteButton.classList.add("delete");
    deleteButton.onclick = deleteItem;

    newItem.appendChild(deleteButton);
    ul.appendChild(newItem);

    listState.push({
        text,
        checked: false
    });
    saveState(listState);

    input.value = "";
 }

function checkItem(){
    const item = this;
    const parent = item.parentNode;
    // Use Array.from let parent(iterable) become an array, and get item's index
    const index = Array.from(parent.childNodes).indexOf(item);
    // false -> true or true -> false
    listState[index].checked = !listState[index].checked;
    item.classList.toggle("checked");

    saveState(listState);
}

function deleteItem(){
    const item = this.parentNode;
    const parent = item.parentNode;
    const index = Array.from(parent.childNodes).indexOf(item);
    parent.removeChild(item);
    listState.splice(index, 1); // delete item in listState by 'splice' function
    saveState(listState);
}

iniList();
const addButton = document.getElementById("add-button");
addButton.addEventListener('click', addItem);

const form = document.getElementById("input-wrapper");
form.addEventListener('submit', (e) => {
    e.preventDefault(); /* Prevent to refresh webpage */
});