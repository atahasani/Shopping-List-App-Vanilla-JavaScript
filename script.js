const form = document.querySelector("form");
const input = document.querySelector(".form-item");
const filter = document.querySelector(".filter");
const ul = document.querySelector(".ul-list");
const clearBtn = document.querySelector(".clear-btn");

function onAddItemSubmit(e) {
  e.preventDefault();
  let newItem = input.value;
  if (newItem === "") {
    alert("Please enter item!!");
    return;
  }
  addItemDom(newItem);
  addItemStorage(newItem);
  input.value = "";
  CheckList();
}

function addItemDom(item) {
  const newItem = document.createElement("li");
  newItem.classList.add("item-list");
  const text = document.createTextNode(item);
  newItem.appendChild(text);
  ul.appendChild(newItem);
  const button = creatButton("remove-btn");
  newItem.appendChild(button);
}

function addItemStorage(item) {
  let itemFromStorage = getItemFromStorage();
  itemFromStorage.push(item);
  localStorage.setItem("items", JSON.stringify(itemFromStorage));
}

function clearItemStorage() {
  let itemFromStorage = getItemFromStorage();
  localStorage.removeItem("items");
}

function removeItemStorage(text) {
  let itemFromStorage = getItemFromStorage();
  itemFromStorage = itemFromStorage.filter((a) => a != text);
  localStorage.setItem("items", JSON.stringify(itemFromStorage));
}

function removeItem(e) {
  const bb = e.target.parentElement;
  if (bb.classList.contains("remove-btn")) {
    bb.parentElement.remove();
    removeItemStorage(bb.parentElement.textContent);
  }
  CheckList();
}

function clearItems() {
  while (ul.firstChild) {
    ul.removeChild(ul.firstChild);
    clearItemStorage();
  }
  CheckList();
}

function filterItem(e) {
  const li = document.querySelectorAll("li");
  const searchText = e.target.value.toLowerCase();
  li.forEach((item) => {
    const itemText = item.firstChild.textContent.toLowerCase();
    if (itemText.includes(searchText)) {
      item.style.display = "flex";
    } else {
      item.style.display = "none";
    }
  });
}

function creatButton(classes) {
  const button = document.createElement("button");
  button.classList = classes;
  const icon = createIcon("fa-solid fa-xmark");
  button.appendChild(icon);
  return button;
}

function createIcon(classes) {
  const icon = document.createElement("i");
  icon.classList = classes;
  return icon;
}

function CheckList() {
  if (!ul.firstElementChild) {
    clearBtn.style.display = "none";
    filter.style.display = "none";
  } else {
    clearBtn.style.display = "block";
    filter.style.display = "block";
  }
}

function checkStorage() {
  let itemFromStorage = getItemFromStorage();
  itemFromStorage.forEach((item) => addItemDom(item));
}

function getItemFromStorage() {
  let itemFromStorage;
  if (localStorage.getItem("items") === null) {
    itemFromStorage = [];
  } else {
    itemFromStorage = JSON.parse(localStorage.getItem("items"));
  }
  return itemFromStorage;
}
function run() {
  form.addEventListener("submit", onAddItemSubmit);
  ul.addEventListener("click", removeItem);
  clearBtn.addEventListener("click", clearItems);
  filter.addEventListener("input", filterItem);
}

run();
checkStorage();
CheckList();




