var todosList= {
  todos:  [],
  /*
  displayTodos: function(){
    if(this.todos.length === 0){
      console.log('Your todos list is empty!');
    }else {
         console.log('My Todos:');
    for( var i = 0; i < this.todos.length; i++){
      // to check if the todos is completed
      if(this.todos[i].completed === true){
        console.log('(X)', this.todos[i].todoText);   
      }else{
        console.log('( )',this.todos[i].todoText);  
      }
    }
  }
  },*/
  addTodo: function(todoText){
    this.todos.push({
      todoText: todoText,
      completed: false
    });
   // this.displayTodos();
  },
  changeTodos: function(position, todoText){
   //this.todos[position] = newValue;
   this.todos[position].todoText = todoText;
   //this.displayTodos();
  },
  deleteTodo: function(position){
    this.todos.splice(position, 1);
    //this.displayTodos();
  },
  toggleCompleted: function(position){
    var todo = this.todos[position];
    todo.completed= !todo.completed;
   // this.displayTodos();
  },
  toggleAll: function(){
    var totalTodos = this.todos.length;
    var completedTodos = 0;
    //get numbers of completed todos.
    for(var i = 0; i < totalTodos; i++){
      if(this.todos[i].completed === true){
        completedTodos++;
      }
    }
    if(completedTodos === totalTodos){
      //case1: Make everything false
      for(var n = 0; n < totalTodos; n++){
        this.todos[n].completed = false;
      }
      //case2: otherwise, make everything true
    }else {
      for(var x = 0; x < totalTodos; x++){
        this.todos[x].completed = true;
      }
    }
   // this.displayTodos();
  }
};
//debugger; 
/*var displayTodosButton = document.getElementById('displayTodosButton');
var toggleAllButton = document.getElementById('toggleAllButton');

displayTodosButton.addEventListener('click', function() {
  todosList.displayTodos();
});

toggleAllButton.addEventListener('click', function() {
todosList.toggleAll();  
});*/

var handlers = {
  //displayTodos: function() {
     //todosList.displayTodos();
   //},
  toggleAll: function() {
     todosList.toggleAll();  
   },
   addTodo: function() {
     var addTodoTextInput = document.getElementById('addTodoTextInput');
     todosList.addTodo(addTodoTextInput.value);
     addTodoTextInput.value = '';
     view.displayTodos();
   },
      changeTodo: function() {
     var changeTodoPositionInput = document.getElementById('changeTodoPositionInput');
     var changeTodoTextInput = document.getElementById('changeTodoTextInput');
     todosList.changeTodos(changeTodoPositionInput.valueAsNumber, changeTodoTextInput.value);
      changeTodoPositionInput.value = '';
      changeTodoTextInput.value = '';
      view.displayTodos();
   },
   deleteTodo: function(position) {
     todosList.deleteTodo(position);
     deleteTodoPositionInput.value = '';
     view.displayTodos();
   },
      toggleCompleted: function() {
     var toggleCompletedPositionInput = document.getElementById('toggleCompletedPositionInput');
     todosList.toggleCompleted(toggleCompletedPositionInput.valueAsNumber);
     toggleCompletedPositionInput.value = '';
     view.displayTodos();
    },
    toggleAll: function() {
      todosList.toggleAll();
      view.displayTodos();  
    }
};
var view = {
  displayTodos: function() {
    var todosUl = document.querySelector('ul');
    todosUl.innerHTML = '';
    for(var i =0; i<todosList.todos.length; i++){
      var todoLi = document.createElement('li');
      //work for completion
      var todo = todosList.todos[i];
      var todoTextWithCompletion = '';
      
      if(todo.completed === true){
        todoTextWithCompletion = '(X)' + todo.todoText;
      }else
      {
        todoTextWithCompletion = '( )' + todo.todoText;
      }
      //******** this id will the key to delete each todo coz each todo will have it so it the way to acccess it*****
      
      todoLi.textContent = todoTextWithCompletion;
      // *********this line to show the Delete Button on the screen***************
      todoLi.appendChild(this.createDeleteButton());
	  
	     // *********this line to show the Delete Button on the screen***************
     // todoLi.appendChild(this.createAlarmButton());
      //todoLi.textContent= todosList.todos[i].todoText;
      todosUl.appendChild(todoLi);
    }
  },
  // ************adding this function to create the Delete button**************
createDeleteButton: function(){
  var deleteButton = document.createElement('button');
deleteButton.textContent = 'Delete';  
  deleteButton.className = 'deleteButton';
  return deleteButton;
}

  // ************adding this function to create the alarm button**************
/*createAlarmButton: function(){
  var alarmButton = document.createElement('button');
alarmButton.textContent = 'Set Alarm';  
  alarmButton.className = 'alarmButton';
  return alarmButton;
}*/

};

// getting the id info from the parent node to be coneccted with the Delete Button
var todosUl = document.querySelector('ul');
todosUl.addEventListener('click', function(event){
  // get the Element that was clicked on
  var elementClicked = event.target;
  // chick if the element is clicked on is delete button
  if(elementClicked.className === 'deleteButton'){
    handlers.deleteTodo(parseInt(elementClicked.parentNode.id));
  }/*else if(elementClicked.className === 'alarmButton'){
	document.getElementById("setalarm").style.display = "block";
  }*/
});

function openAlarmForm(){
  document.getElementById("setalarm").style.display = "block";
}

function activateAlarm(){
	var hour = document.getElementById("sethour");
	var minute = document.getElementById("setminute");
	
	// set wakeup timer
window.wakeuptimer.wakeup(  
   
   // a list of alarms to set
   {
        alarms : [{
            type : 'onetime',
            time : { hour : parseInt(hour.value), minute : parseInt(minute.value) },
            extra : { message : 'json containing app-specific information to be posted when alarm triggers' }, 
            message : 'Alarm has expired!'
       }] 
   }, successCallback
);

var successCallback = function(result) {
    if (result.type==='wakeup') {
        alert('wakeup alarm detected--' + result.extra);
    } else if(result.type==='set'){
        alert('wakeup alarm set--' + result);
    } else {
        alert('wakeup unhandled type (' + result.type + ')');
    }
};

var errorCallback = function() {
    alert("alarm set failed");
};
	hour.value = "0";
	minute.value = "0";
	document.getElementById("setalarm").style.display = "none";
}







 