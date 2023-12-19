const itemForm = document.getElementById('item-form');
const itemInput = document.getElementById('item-input');
const itemList = document.getElementById('item-list');
const filterWord = document.getElementById('filter');
let filterDiv = document.querySelector('.filter');
const clearBtn = document.getElementById('clear')
let editMode = false;
const addBtn = itemForm.querySelector('button');

const displayItems = () => {
    const items = getItemsFromStorage();
    items.forEach((item) => {
        addItem(item)
    });
    checkUi();
}

const onAddItemSubmit = (e) => {
    e.preventDefault();

    if(editMode){
        editMode = false;
        addBtn.innerHTML = '<i class="fa-solid fa-plus"></i> Add Item'
    }

    const newValue = itemInput.value

    if( newValue === ''){
        alert('Please enter an item');
        return;
    }

    if(checkInStorage(newValue)){
        alert('Item already exists');
        return;
    }

    addItem(newValue);
    addItemStorage(newValue);
    checkUi();
    itemInput.value = '';
}

const checkInStorage = (item) => {
    const items = getItemsFromStorage();
    return items.includes(item);
}

const addItem = (item) => {
    const li = document.createElement('li');
    li.appendChild(document.createTextNode(item));

    const button = createButton(['remove-item', 'btn-link', 'text-red'])
    li.appendChild(button);
    itemList.appendChild(li)
}

const addItemStorage = (item) => {
    const items = getItemsFromStorage();
    items.push(item);
    localStorage.setItem('items', JSON.stringify(items));
}


const filterItems = (e) => {
    const filterValue = e.target.value.toLowerCase();
    const items = itemList.querySelectorAll('li');
    items.forEach((item) => {
        const word = item.firstChild.textContent.toLowerCase();
        if(word.indexOf(filterValue) === -1){
            item.style.display = 'none';
        }
        else{
                item.style.display = 'flex';
            }
    })
    
}

const onItemClick = (item) => {
    const clickedItem = item.target
    if(clickedItem.parentElement.classList.contains('remove-item')){
        removeItem(clickedItem.parentElement)
        
    }else{
        setItemToEdit(clickedItem)
    }
}

const setItemToEdit = (item) => {
    editMode = true;
    console.log(addBtn)
    addBtn.innerHTML = '<i class="fa-solid fa-pen"></i> Update Item'
    itemInput.value = item.textContent
}

const removeItem = (item) => {
    if(confirm('Are you sure you want to remove this item?')){
        item.parentElement.remove()
        checkUi();
        removeFromStorage(item)
    }
}

const removeFromStorage = (item) => {
    const items = JSON.parse(localStorage.getItem('items')) || [];
    items.splice(items.indexOf(item.parentElement.textContent), 1)
    localStorage.setItem('items', JSON.stringify(items));
}


const getItemsFromStorage = () => {
    return JSON.parse(localStorage.getItem('items')) || [];
    
}




const createButton = (arrClasses) => {
    const button = document.createElement('button');
    button.classList.add(...arrClasses);
    const i = createIcon(['fa-solid', 'fa-xmark'])
    button.appendChild(i);
    return button;

}

const createIcon = (arrClasses) => {
    const i = document.createElement('i');
    i.classList.add(...arrClasses);
    return i;
}

const checkUi = () => {
    const items = itemList.querySelectorAll('li');
    if(items.length === 0) {
        filterDiv.style.display = 'none';
        clearBtn.style.display = 'none';
    }
    else {
            filterDiv.style.display = 'block';
            clearBtn.style.display = 'block';
        }
}

const clearItems = () => {
    while(itemList.firstChild){
        itemList.removeChild(itemList.firstChild)
    }
    localStorage.removeItem('items');

    checkUi();
}

checkUi();
getItemsFromStorage();

//Event form listeners
itemForm.addEventListener('submit' , onAddItemSubmit)
//Remove item
itemList.addEventListener('click', onItemClick)
//Remove items
clearBtn.addEventListener('click', clearItems);
//Filter items
filterWord.addEventListener('input', filterItems)

document.addEventListener('DOMContentLoaded', displayItems)