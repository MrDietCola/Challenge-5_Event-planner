// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.

// localStorage.clear();

  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?

  
  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
 

  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  

  // TODO: Add code to display the current date in the header of the page.

$( document ).ready(function() {
// variable to get current hour of the day in a number out of 24
var currentHour = dayjs().format('HH');
// variable to get current time to display to page in a standard way
var displayTime = dayjs().format("MMM D, YYYY [at] hh:mm:ss a");
// variable for the paragraph element on the html to put the time of day
var currentTimeP = $('#currentDay')
currentTimeP.text(displayTime)

// interval timer to update the clock on top of page every second and to run compare time so 
// so that the backgrounds of the tasks will change when the hour is updated
function updateHour() {
  setInterval(function() {
    currentHour = dayjs().format('HH');
    displayTime = dayjs().format("MMM D, YYYY [at] hh:mm:ss a");
    currentTimeP.text(displayTime)
    compareTime()
  }, 1000);
}

// compares the number in the id to the current hour to update the background color
function compareTime() {
// for each tag with class .row, create a variable of last two characters (should be numbers of time out of 24)
  $('.row').each(function () {
    var hour = $(this).attr('id').slice(-2)
// compares that variable to current hour and adjusts add or removes appropriate class compared to current hour of day
    if (hour > currentHour) {
      $(this).removeClass('past')
      $(this).removeClass('present')
      $(this).addClass('future')
    } else if (hour < currentHour) {
      $(this).removeClass('present')
      $(this).removeClass('future')
      $(this).addClass('past')
    } else {
      $(this).removeClass('future')
      $(this).removeClass('past')
      $(this).addClass('present')
    }
  });
}

// variables for listen event and getting local storage
var saveBtn = $('.saveBtn')
var storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];

saveBtn.on('click', function (event) {
  event.stopPropagation();
// when button clicked set the targeted button as a variable and navigate dom to get the 
// corrisponding input value and id of the parent
  var btnClicked = $(event.target);
  var parent = btnClicked.parent().parent()
  var parentId = btnClicked.parent().parent().attr('id')
  if (parentId === undefined) {
    parentId = btnClicked.parent().attr('id')
    parent = btnClicked.parent()
  }
  console.log(parentId);
  var task = parent.children().eq(1).val() || " ";
// creates variable to add to array of stored tasks
  var taskObj = {
    task: task,
    parent: parentId,
  };  

// compares stored tasks and new task if there are any hours with two tasks saved and deletes
// whichever task was added earlier in the array
  for (i=0; i < storedTasks.length; i++ ) {
    if (taskObj.parent === storedTasks[i].parent) {
      storedTasks.splice(i, 1)
    }
  }
// adds new task to array and sends to local storage
  storedTasks.push((taskObj));
  localStorage.setItem("tasks", (JSON.stringify(storedTasks)));
  restoreTasks()
});

// reloads all of the currently stored tasks
function restoreTasks() {
  storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
  for (i=0; i < storedTasks.length; i++ ) {
    var id = storedTasks[i].parent
    var text = storedTasks[i].task
    $('#' + id).children().eq(1).val(text)
  }
  console.log(storedTasks);
}

restoreTasks();
compareTime();
updateHour();
});