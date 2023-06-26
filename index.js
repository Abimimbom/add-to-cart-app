import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

const appSettings = {
    databaseURL: "https://playground-c07ad-default-rtdb.europe-west1.firebasedatabase.app/"
}

const app = initializeApp(appSettings);
const database = getDatabase(app);
const shoppingListInDB = ref(database, "shoppingList");


const inputFieldEl = document.getElementById("input-field");
const addButtonEl = document.getElementById("add-button"); 
const shoppingListEl = document.getElementById("shopping-list");
const paraEl = document.getElementById("remove");

paraEl.addEventListener("click", function() {
    paraEl.remove();
 });

addButtonEl.addEventListener("click", function() {
    let inputValue = inputFieldEl.value;
    push(shoppingListInDB, inputValue);
    clearInputFieldEl();
});

onValue(shoppingListInDB, function(snapshot) {
    if (snapshot.exists()) {
        let itemsInShoppingList = Object.entries(snapshot.val());
    
        clearShoppingListEl();

        for (let i = 0; i < itemsInShoppingList.length; i++) {
            let currentItem = itemsInShoppingList[i];
            let currentItemID = currentItem[0];
            let currentItemValue = currentItem[1];

            appendItemToShoppingListEl(currentItem);
        }
    } else {
        shoppingListEl.innerHTML = "No items here... yet!";
    }
});

function clearShoppingListEl () {
    shoppingListEl.innerHTML = " ";
}

function appendItemToShoppingListEl (item) {
    let itemID = item[0];
    let itemValue = item[1];

    let newEl = document.createElement("li");
    newEl.textContent = itemValue;

    newEl.addEventListener("dblclick", function () {
        let exactLocationInDB = ref(database, `shoppingList/${itemID}`);
        
        remove(exactLocationInDB);
    });

    shoppingListEl.append(newEl);
}

function clearInputFieldEl() {
    inputFieldEl.value = "";
}