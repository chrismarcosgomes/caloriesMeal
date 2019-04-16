// storage

//item controller

// ify func that runs right away
const itemCtrl=(
    ()=>{
// item constructor
const Item = function(id, name, calories){
    this.id = id;
    this.name = name;
    this.calories = calories;
  }



// data structure/state
const data={
    items:[
    // {
    //     id:0,
    //     name:"Tacos",
    //     calories:1200
    // },{
    //     id:1,
    //     name:"Sopes",
    //     calories:800   
    // },{
    //     id:2,
    //     name:"Torta",
    //     calories:1400   
    // }

],
    // current item is meant for updating in the form 
    currentItem:null,
    totalCaloies:0

    // func that lets me access my data structure logData().. public method
}; return {
    getItems:()=>{
        return data.items
    },
addItem:(name,calories)=>{
console.log(name,calories)
let ID;
// create ID 
if(data.items.length>0){
    // a sense of auto increment
    ID= data.items[data.items.length-1].id+1;
}else{
ID=0;
}
// calories to number instead of string
calories= parseInt(calories)

// create new item
newItem=new Item(ID,name,calories);

// add new item to array
data.items.push(newItem);
return newItem;
},
getItemById:(id)=>{
let found = null;
data.items.forEach((current)=>{
if(current.id===id){
found=current;
}
})
return found;
},
updateItem:(name, calories)=>{
// calories to number
calories=parseInt(calories)

let found= null;
data.items.forEach((item)=>{
if(item.id===data.currentItem.id){
item.name=name;
item.calories=calories;
found=item;
}
})
return found;
},
deleteItem:(id)=>{
   const ids=data.items.map((item)=>{
return item.id
    })
    // get the index
    const index=ids.indexOf(id);
    data.items.splice(index,1)
},
clearAllItem:()=>{
    data.items=[]
}
,getCurrentItem:()=>{

    return data.currentItem;
},

setCurrentItem:(current)=>{
data.currentItem=current;
},

getTotalCalories:()=>{
let total=0;
// loop thew items and add cals
data.items.forEach((item)=>{
total+=item.calories;

})
// set total cal in data structure
data.totalCalories=total;

// return total
return data.totalCalories
},
logData:()=>{
    return data;
}
}

    }
)();

//ui control

// ify func that runs right away
const uiCtrl=(
()=>{

// we make a ui selector so we  us JS instead of html. for ID's and classes
const uiSelector={
    itemList:"#item-list",
    listItems:"#item-list li",
    addBtn:".add-btn",
    itemNameInput:"#item-name",
    itemCaloriesInput:"#item-calories",
    totalCalories:".total-calories",
    updateBtn:".update-btn",
    deleteBtn:".delete-btn",
    backBtn:".back-btn",
    clearBtn:".clear-btn",
    

}

return{
    populateItemList:(items)=>{
let html="";
// lopps threw Items
items.forEach((Item)=>{
    // we are appending here and creating the list to show
html+=`<li class="collection-item" id="item-${Item.id}">
<strong>${Item.name}: </strong><em>${Item.calories} Calories</em>
<a href="#" class="secondary-content">
    <i class="edit-item fa fa-pencil-alt"></i>
</a>
</li>`
});
 //insert li tag to ui 
 document.querySelector(uiSelector.itemList).innerHTML=html;
    },
// we are getting the value of them from the id's item-name,item-calories(querySelector)
getItemInput:()=>{
    return{
        name:document.querySelector(uiSelector.itemNameInput).value,
        calories:document.querySelector(uiSelector.itemCaloriesInput).value
    }
}
 ,addListItem:(item)=>{
// show list item 
document.querySelector(uiSelector.itemList).style.display="block"

// create li element
const li= document.createElement("li");
//  add class
li.className="collection-item";

// add the unique id 
li.id=`item-${item.id}`

// add to html
li.innerHTML=`<strong>${item.name}: </strong><em>${item.calories} Calories</em>
<a href="#" class="secondary-content">
    <i class="edit-item fa fa-pencil-alt"></i>
</a>`;

// insert item

document.querySelector(uiSelector.itemList).insertAdjacentElement("beforeend",li)
 } 
 ,updateListItem:(item)=>{
let listItems=document.querySelectorAll(uiSelector.listItems)

// turn node list into array
listItems=Array.from(listItems)

listItems.forEach((listItem)=>{
const itemId=listItem.getAttribute("id");
if(itemId===`item-${item.id}`){
document.querySelector(`#${itemId}`).innerHTML=`<strong>${item.name}: </strong><em>${item.calories} Calories</em>
<a href="#" class="secondary-content">
    <i class="edit-item fa fa-pencil-alt"></i>
</a>`;
}
})
 },
 deleteListItem:(id)=>{
     const itemID=`#item-${id}`
     const item=document.querySelector(itemID);
     item.remove()

 }
 ,
 hideList:()=>{
     document.querySelector(uiSelector.itemList).style.display="none"
 },
 addItemToForm:()=>{
    document.querySelector(uiSelector.itemNameInput).value=itemCtrl.getCurrentItem().name;
    document.querySelector(uiSelector.itemCaloriesInput).value=itemCtrl.getCurrentItem().calories;
    uiCtrl.showEditState();
 }
 ,clearInput:()=>{
     document.querySelector(uiSelector.itemNameInput).value="";
     document.querySelector(uiSelector.itemCaloriesInput).value="";

 },
 
 
 showTotalCalories:(calories)=>{
document.querySelector(uiSelector.totalCalories).textContent=calories;
 },
 clearEditState:()=>{
     uiCtrl.clearInput();
     document.querySelector(uiSelector.updateBtn).style.display="none";
     document.querySelector(uiSelector.deleteBtn).style.display="none"
     document.querySelector(uiSelector.backBtn).style.display="none"
     document.querySelector(uiSelector.addBtn).style.display="inline"


 }
 ,clearback:(e)=>{
   e.preventDefault()
   uiCtrl.clearInput();
     document.querySelector(uiSelector.updateBtn).style.display="none";
     document.querySelector(uiSelector.deleteBtn).style.display="none"
     document.querySelector(uiSelector.backBtn).style.display="none"
     document.querySelector(uiSelector.addBtn).style.display="inline"
    


}
 ,
 showEditState:()=>{
     document.querySelector(uiSelector.updateBtn).style.display="inline";
     document.querySelector(uiSelector.deleteBtn).style.display="inline"
     document.querySelector(uiSelector.backBtn).style.display="inline"
     document.querySelector(uiSelector.addBtn).style.display="none"


 },
 removeItems:()=>{
     let listItems=document.querySelectorAll(uiSelector.listItems);
    // turn node list into array

    listItems=Array.from(listItems)
    listItems.forEach((currrent)=>{
currrent.remove()
    })
 }
 
    // get a public method so we can get the querySelector vars
,getSelectors:()=>{
    return uiSelector;
}}
}
)();

// app control

// ify func that runs right away
const App=(
    (itemCtrl,uiCtrl)=>{
// load event listeners
const loadEventListeners=()=>{
// this lets us use our selectors
const UISelector=uiCtrl.getSelectors();

// add item event
document.querySelector(UISelector.addBtn).addEventListener(
    "click",itemAddSubmit)
  // disbale submit on enter
  document.addEventListener("keypress",(e)=>{
if(e.keyCode===13|| e.witch===13){
e.preventDefault()
return false;
}
  })
  
    // edit icon click event
document.querySelector(UISelector.itemList).addEventListener("click",
itemEditClick)

// back click event
document.querySelector(UISelector.backBtn).addEventListener("click",
uiCtrl.clearback)

// UPDATE
document.querySelector(UISelector.updateBtn).addEventListener("click",
itemUpdateSubmit)
// edit delete click event
document.querySelector(UISelector.deleteBtn).addEventListener("click",
itemDeleteSubmit)


//clear items event
document.querySelector(UISelector.clearBtn).addEventListener("click",
clearAllItemsClick)
}
// add item submit 
const itemAddSubmit=(e)=>{
    // get form input from UI Cntrl
    const input=uiCtrl.getItemInput()
    //console.log(input)

    // check for name and calories
if(input.name !=="" && input.calories !==""){
// add item
const newItem=itemCtrl.addItem(input.name,input.calories)

// add item to ui list
uiCtrl.addListItem(newItem)

//get the total calories
const totalCalories=itemCtrl.getTotalCalories()

// add total calories to UI
uiCtrl.showTotalCalories(totalCalories)

// clear fileds for meal and calories
uiCtrl.clearInput();
}
    e.preventDefault();
};

// click edit item
const itemEditClick=(e)=>{
//console.log("update item")
if(e.target.classList.contains("edit-item")){
//console.log("edit working")
const listID=e.target.parentNode.parentNode.id;
// console.log(listID)
const listidArray= listID.split("-")

const id= parseInt(listidArray[1])

const itemtoEdit=itemCtrl.getItemById(id);

// set to current item
itemCtrl.setCurrentItem(itemtoEdit)

// add item to form
uiCtrl.addItemToForm();
}
    e.preventDefault();
}

// update item submit
const itemUpdateSubmit=(e)=>{
    // get item input
    const input=uiCtrl.getItemInput();
    // update item
    const updatedItem=itemCtrl.updateItem(input.name, input.calories)

    // update UI
    uiCtrl.updateListItem(updatedItem);

    const totalCaloies=itemCtrl.getTotalCalories();
    uiCtrl.showTotalCalories(totalCaloies)
    uiCtrl.clearEditState()
e.preventDefault();
}
// CLEAR ITEM EVENT
const clearAllItemsClick=()=>{
// DELTE ALL ITEM  FROM DATA
itemCtrl.clearAllItem();
const totalCalories = itemCtrl.getTotalCalories();
// Add total calories to UI
uiCtrl.showTotalCalories(totalCalories);

uiCtrl.removeItems()
uiCtrl.hideList()
}

// delete button
const itemDeleteSubmit=(e)=>{
// get current item
const currentItem=itemCtrl.getCurrentItem();
//delete from data structure 
itemCtrl.deleteItem(currentItem.id)

// delete from ui
uiCtrl.deleteListItem(currentItem.id);
// Get total calories
const totalCalories = itemCtrl.getTotalCalories();
// Add total calories to UI
uiCtrl.showTotalCalories(totalCalories);

uiCtrl.clearEditState();
    e.preventDefault()
}


// return func init, initializer for the app... public methods
return{
    init:()=>{
// clear edit state
uiCtrl.clearEditState();

       // console.log("I WORK")

       // put data stucture into a var
       const items=itemCtrl.getItems();
       //console.log(items)

// check if any items
if(items.length===0){
uiCtrl.hideList()
}else{
// populate list with items

uiCtrl.populateItemList(items);
}
 
//get the total calories
const totalCalories=itemCtrl.getTotalCalories()

// add total calories to UI
uiCtrl.showTotalCalories(totalCalories)
// load event listeners
       loadEventListeners()
    }
    
}
    }
)(itemCtrl,uiCtrl);

// init app

App.init()