// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.

$(function () {
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
});


var currentHour = dayjs().format('HH');
var displayTime = dayjs().format("MMM d, YYYY [at] hh:mm:ss a");
var currentTimeP = $('#currentDay')
currentTimeP.text(displayTime)

function updateHour() {
  setInterval(function() {
    currentHour = dayjs().format('HH');
    displayTime = dayjs().format("MMM d, YYYY [at] hh:mm:ss a");
    currentTimeP.text(displayTime)
    compareTime()
  }, 1000);
}

function compareTime() {
  $('.row').each(function () {
    var hour = $(this).attr('id').slice(-2)
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

compareTime()
updateHour()

var saveBtn = $('.btn')
saveBtn.on('click', function (event) {
  var btnClicked = $(event.target);
  var parent = btnClicked.parent().parent()
  var task = parent.children().eq(1).val()
  console.log(task);
  console.log(parent);

  var taskObj = {
      task: task,
      parent: parent,
  };

  var storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    storedTasks.unshift((taskObj));
    localStorage.setItem("tasks", (JSON.stringify(storedTasks)));
    console.log(storedTasks);
});