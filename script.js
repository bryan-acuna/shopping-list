const itemForm = document.getElementById('item-form');
const itemInput = document.getElementById('item-input');
const itemList = document.getElementById('item-list');
const filterWord = document.getElementById('filter');
let filterDiv = document.querySelector('.filter');
const filterDivCopy = filterDiv.cloneNode(true);
let listItems = [...document.querySelectorAll('li')];
const removeBtn = document.getElementById('clear')

const addItems = (arr) => {
    arr.forEach((item) => {
        itemList.appendChild(item)
    })
}


const addItem = (e) => {
    e.preventDefault();

    const newValue = itemInput.value

    if( newValue === ''){
        alert('Please enter an item');
        return;
    }

    if(filterDiv.innerHTML === ''){
        filterDiv.innerHTML = filterDivCopy.innerHTML;
        const filterWord = document.getElementById('filter');
        filterWord.addEventListener('input', filterItems)
    }

    const li = document.createElement('li');
    li.appendChild(document.createTextNode(newValue));
    const button = createButton(['remove-item', 'btn-link', 'text-red'])
    li.appendChild(button);
    itemList.appendChild(li)
    itemInput.value = '';
}

const createButton = (arrClasses) => {
    const button = document.createElement('button');
    button.classList.add(...arrClasses);
    const i = createIcon(['fa-solid', 'fa-xmark'])
    button.appendChild(i);
    i.classList.add()
    return button;

}

const createIcon = (arrClasses) => {
    const i = document.createElement('i');
    i.classList.add(...arrClasses);
    return i;
}

const removeFilter = () => {
    filterDiv.innerHTML = '';
}

const clearItems = () => {
    itemList.innerHTML = '';
}

const filterItems = (e) => {
    const filterValue = e.target.value.toLowerCase();
    const filteredList = listItems.filter( item =>  {
        return item.innerText.toLowerCase().includes(filterValue.toLowerCase())})

    clearItems();

    addItems(filteredList);
    
}

const removeItem = (item) => {
    clearItems();
    console.log(item.innerText);
    listItems = listItems.filter((oldItem) => {  
        return oldItem.innerText != item.innerText
    })
    addItems(listItems);
    console.log(listItems);
}

//Event form listener
itemForm.addEventListener('submit' , addItem)

//Remove item
removeBtn.addEventListener('click', ()=>{
    removeFilter();
    clearItems();
})


//Filter items
filterWord.addEventListener('input', filterItems)


listItems.forEach(item => {
    console.log("item " ,item);
    const xmark = item.querySelector('button');
    xmark.addEventListener('click', () => {
        removeItem(xmark.parentElement)
    })
})