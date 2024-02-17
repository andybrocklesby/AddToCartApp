import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://realtime-database-bf40c-default-rtdb.firebaseio.com/"
}

const app = initializeApp(appSettings);
const database = getDatabase(app);
const shoppingListInDB = ref(database, "mediaList");

const inputEl = document.getElementById("input-field");
const addButton = document.getElementById("add-button");
const shoppingListEl = document.getElementById("shopping-list");
let shoppingListItems = "";

addButton.addEventListener("click", function(){
    let inputValue = inputEl.value;

    if(inputValue == ""){
        alert("enter a valid item");
    }
    else{
        push(shoppingListInDB, inputValue);
    }
    

    clearInputField();
})


onValue(shoppingListInDB, function(snapshot){

    if(snapshot.exists()){
        clearListItems()

        let listArray = Object.entries(snapshot.val());
    
        for(let i = 0; i < listArray.length; i++){
    
            let currentItem = listArray[i];
    
            appendListItem(currentItem);
        }
    }
    else{
        clearInputField();
        shoppingListEl.innerHTML = "No items here... yet."
        shoppingListEl.style.margin = "20px auto";
    }
    
})

function clearInputField(){
    inputEl.value = "";
}

function clearListItems(){
    shoppingListItems = "";
    shoppingListEl.innerHTML = "";
}

function appendListItem(item){
    let itemKey = item[0];
    let itemValue = item[1];

    let newLi = document.createElement("li");

    newLi.textContent = itemValue;

    newLi.addEventListener("click", function(){
        let exactLocationInDB = ref(database, `mediaList/${itemKey}`);

        remove(exactLocationInDB);
    })

    shoppingListEl.append(newLi);
}

