//Everything in here written by me
//Help from treehouse.com to-do app


//Problem: user interaction does not provide any results.
//Solution: Add interacitivty so the user can manage daily tasks.
//use Javascript to add interactivity and DOM APIs to do this (also where to find information to interact with DOM).

//finds the element on the HTML based on id/tagName
var taskInput = document.getElementById("new-task");//new-task
var addButton = document.getElementsByTagName("button")[0]; //first button
var incompleteTasksHolder = document.getElementById("incomplete-tasks");//incomplete-tasks
var completedTasksHolder = document.getElementById("completed-tasks");  //completed-tasks


//New task List Item
var createNewTaskElement = function(taskString) {
  //create listItem
  var listItem = document.createElement("li");

  //input (checkbox)
  var checkBox = document.createElement("input"); //checkbox
  //label
  var label = document.createElement("label");
  //input (text)
  var editInput = document.createElement("input"); //text
  //button.edit
  var editButton = document.createElement("button");
  //button.delete
  var deleteButton = document.createElement("button");
  
  //Each element needs modifying 
  checkBox.type = "checkbox";
  editInput.type = "text";

  //use innerText instead of innerHTML so can encode special characters
  editButton.innerText = "Edit";
  editButton.className = "edit"; //the actual edit button displayed button
  deleteButton.innerText = "Delete";
  deleteButton.className = "delete";

  label.innerText = taskString; //the input into this function

  //Each element needs appending
  listItem.appendChild(checkBox);
  listItem.appendChild(label);
  listItem.appendChild(editInput);
  listItem.appendChild(editButton);
  listItem.appendChild(deleteButton);

  return listItem;
}

//added console.log() to each function to test if they work
//used var name = function() but can also used function name()

//Add a new task
var addTask = function() {
  console.log("Add task is working");

  //this if statement so if no value is added to box returns blank
  //does not execute the addTask function
  if(!taskInput.value) {
    return; 
  }

  //When button is pressed (done below)
  //create a new list item with the text from the #new-task
  var listItem = createNewTaskElement(taskInput.value);

  //Append listItem to incompleteTasksHolder
  incompleteTasksHolder.appendChild(listItem);
  //checkBox, edit and delete button were not working
  //added bindTaskEvents function
  bindTaskEvents(listItem, taskIncomplete);

  //setting to blank box after being added
  taskInput.value = "";
}


//edit an existing task
var editTask = function() {
  console.log("edit task is working");

  var editButton = listItem.querySelector("button.edit");
  var listItem = this.parentNode;
  var editInput = listItem.querySelector("input[type=text]");
  var label = listItem.querySelector("label");

  var containsClass = listItem.classList.contains("editMode");
    //if the class of the parent is .editMode
    //used classList method to be able to add different classes
    //just checking for classes

  if(containsClass) {
    editButton.innerText = "Edit";
    //switch from .editMode
    //label text become the input value
    label.innerText = editInput.value;
  } else {
    //if edit it pressed text will then show save
    editButton.innerText = "Save";
    //switch to .editMode
    //input value becomes the labels text
    editInput.value = label.innerText;
  }

  //toggle .editMode on the list item
  listItem.classList.toggle("editMode");
}


//delete an existing task
var deleteTask = function() {
  console.log("delete task is working");

  var listItem = this.parentNode;
  var ul = listItem.parentNode; //grandparents of the button

  //remove the parent list item from the unordered list
  ul.removeChild(listItem);
}


//mark a task as complete
var taskCompleted = function() {
  console.log("task completed is working");

  //append the task list item to the #completed-tasks
  //used var listItem instead of .appendChild(this.parentNode) for clarity
  var listItem = this.parentNode;  

  completedTasksHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskIncomplete);
}


//mark a task as incomplete
var taskIncomplete = function() {
  console.log("task incomplete...");

  //append to #incomplete_tasks
  var listItem = this.parentNode;  

  incompleteTasksHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);
}


var bindTaskEvents = function(taskListItem, checkBoxEventHandler) {
  console.log("Bind list item events");

  //select list items children
  //use query selector to save time between switching between methods
  var checkBox = taskListItem.querySelector("input[type=checkbox]");
  var editButton = taskListItem.querySelector("button.edit");
  var deleteButton = taskListItem.querySelector("button.delete");
      
  //bind editTask to edit button
  editButton.onclick = editTask;

  //bind deleteTask to the delete button
  deleteButton.onclick = deleteTask;

  //bind checkBoxEventHandler to checkBox
  //change with keyboard or mouse to stil use the function
  //so used onChange instead of onClick (found from DOM)
  checkBox.onchange = checkBoxEventHandler;
}

//just to check if the .addEventListener works when clicking add
var aRequest = function() {
  console.log("aRequest is working");
}

//set the click handler to the addTask function

//dont need this line because of addEventListener, a better way to add events to objects
//addButton.onclick = addTask;

//when clicked will run the function
addButton.addEventListener("click", addTask); 
addButton.addEventListener("click", aRequest); 


//cycle over incompleteTaskHolder ul list items
for (var i = 0; i < incompleteTasksHolder.children.length; i++) {
    //bind events to list item's children (taskCompleted)
    bindTaskEvents(incompleteTasksHolder.children[i], taskCompleted);
}


//cycle over completedTaskHolder ul list items
for (var i = 0; i < completedTasksHolder.children.length; i++) {
    //bind events to list item's children (taskIncompleted)
    bindTaskEvents(completedTasksHolder.children[i], taskIncomplete);
}
