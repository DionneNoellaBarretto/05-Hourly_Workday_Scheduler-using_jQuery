/* pending to do's 
✅a) need to add the schedule for user input on start time and a back button
b) see if the hours can be fixed when day starts in the evening 
c) fix the color for present/future/past to work no matter say if user inputs 7am when actual time is 4pm
✅d) add background image(s)
✅ e) scale for table screen (intermediate)
✅f) add instructions for starting the app
✅ g) hide the schedule your workday button once its clicked
✅ h) text area placeholder 
✅ i) auto change the col size when using smaller screens  (https://www.geeksforgeeks.org/how-to-change-column-to-row-on-small-display-in-bootstrap-4/)
j) disable input to time blocks that are past
✅k) need to add to local storage and delete as well ( common save delete button implemented)
✅l) need to make the buttons work
m) browser refresh persist functionality
n) if delete is empty let user know there is no need to proceed with the deletion as there's nothing to delete

PENDING MUST HAVE: ✓ WHEN I click the save button for that time block THEN the text for that event is saved in local storage
✓ WHEN I refresh the page THEN the saved events persist
*/

// back button being selected by id not class!
var back = $('#back');
var add =$("#add");
// by class
var instructional_alert = $(".alert-info");
var footerHide = $(".footer");

// Immediately hide the back button
back.hide();

// returns the hour reading from the current moment in time - example: 18 for 18:XX hours, 2 for 2:xx hours
var hourDisplayed = moment().format('H');
//console.log(hourDisplayed);

// mapping the schedule your workday and add button with identifiers
var schedule = document.querySelector("#schedule");
// console.log(schedule);

// Add event listener to the schedule_your_day button
schedule.addEventListener("click", scheduleDay);

//Display the current date and time
var timeDisplayed = moment().format('dddd, MMMM Do YYYY, h:mm:ss a');
//console.log(timeDisplayed);
// call currentTime every second
setInterval(currentTime, 1000);

// current time format
function currentTime() {
    // set the current time format
    timeDisplayed = moment().format('dddd, MMMM Do YYYY, h:mm:ss a');
    // Empty the current day element
    $('#currentDay').empty();
    // Display the current time
    $('#currentDay').text(timeDisplayed);
}
// invoke the function to eliminate a 1s gap when the page loads
currentTime();

// request user for start and end time
function scheduleDay() { 
    // console.log("schedule clicked");
    var startHour = 0;
    startHour = prompt ("What hour do you start your day? \n\n Select a number between 1 and 24");
    if (startHour <1  || startHour > 24 || isNaN(startHour)) {
        alert(`Invalid Entry!! \n\n Please click OK and proceed to enter a valid number between 1 and 24 for the Work Day Scheduler to create appropriate hourly slots!`);
        return (scheduleDay()); // looping to ensure user enters a valid number and proceeds
    } else if (startHour >=1 && startHour < 12)
        {
    alert(`You entered your start time as ${startHour} am!`);
        } else if (startHour >= 13){
            alert(`You entered your start start time as ${startHour}:00 hours in the evening!`);
    
        } else {
            alert(`You entered your start time as ${startHour} o'clock'!`);
        }
        // console.log(startHour);
//time slot row variable that uses row class to create row in the container // Change the alignment of flex item to center with justify-content-center      
var row = $('<div class="w-100 row justify-content-center">');
    // creates time block in the div container portion of the html file for a standard work hour slot of 8 hours (+1 hour lunch break) depending on the start time of the user)
var timeBlocks = $('.container');
for (var i = startHour; i<= (Number(startHour)+9); i++) {
    //  console.log(i, Number(startHour));

// bootstrap grid system concept for sizing the widths : ref --> https://www.w3schools.com/bootstrap/bootstrap_grid_system.asp
var hour = $('<div class="hour col-md-1">');
//console.log(hour);
if (i < 12) {
    // Add text to the hour element defined above
    hour.text(i + ":00 AM");
} else if(i > 12){
    hour.text((i-12) + ":00 PM");
} else if ((i == 12 || i ==24)){
    hour.text(i + " o'Clock");
}

// Adds the class `todo and col-md-9` to the user text element // learnt how to add a text area placeholder https://www.w3schools.com/tags/att_textarea_placeholder.asp + // Uses col-*-* class for viewing to adjust on different screens..after trying several permutations and combinations settling for the col-md-* class i've chosen these values to appear full-size on small devices and half-size on medium or larger devices -->
    var userText = $('<textarea placeholder="Enter your todo task here.. \n Use the enter key to add                                                             \n                                              multiple lines of text with scroll functionality.." class="text ">').addClass('todo col-md-9');
            // check to see if there is saved data to pull into the time blocks
if(localStorage.getItem("cache") === null){
    userText.text('');
}else{
    let matchHour = i;
    // console.log(matchHour);
    var oldTodo = JSON.parse(localStorage.getItem("cache")); //window.localStorage is the same as localstorage
    // console.log(oldTodo);
    matchHour -= startHour;
    // console.log(matchHour);
    userText.text(oldTodo[matchHour]);
    // console.log(oldTodo[matchHour]);
}
  // flex box container concept https://getbootstrap.com/docs/4.4/utilities/flex/
  var saveBtn = $('<button class="col-md-1 btn save d-flex justify-content-center align-items-center" title="individual save button logic for this rows text input"><i class="fas fa-save"></i></button>');

// assign color classes with a space before appending to existing class list based on time comparison to the displayed current hour
if (i < hourDisplayed) {
    userText.addClass(" past");
}else if (i == hourDisplayed) {
    userText.addClass(" present");
} else{
    userText.addClass(" future")
}
   // joins up all the (sections) defined above to form a hourly schedule grid for the user in this particular order for a given row 
   row.append(hour, userText,saveBtn);
   // places all these rows in the container class section of the html file by appending to the page
   timeBlocks.append(row);
}
// common saved
    var addBtn = $('<button id="add" title="Save all text entries to local browser storage">').addClass(" col-md-1 disabled btn-block btn add d-flex justify-content-center align-items-center fa fa-plus-circle");

//1 common trash icon button to refresh existing workday schedule to pristine state  https://fontawesome.com/v5.15/icons/trash-alt?style=regular
var delBtn = $('<button title="Refresh existing schedule by deleing all text entries">').addClass(" disabled col-md-1 erase btn btn-block justify-content-center far fa-trash-alt");
timeBlocks.append(delBtn, addBtn);

   //displays the back button once the schedule is created
   back.show();
   //hides the instructional alert up  and footer at the bottom
instructional_alert.hide();
footerHide.hide();
};
// as per this i cannot just say $('.add').on('click', function(){} ... since the add button was dynamically generated and there is no place holder in the index file to be referenced for click action
$(document).on('click', '.add', function() {
    // console.log("add");
// this alert isnt required but helps if someone finds the button active visual cue a little too subtle
    // alert("Your todo entry has been saved. Click Ok to add more todo items for the day or review your workday schedule!")
    add.addClass(" active");
    // array initialized variable to hold todo data that user enters 
    var todo =[];
    // console.log(todo);
    $('.todo').each(function(){
        //https://stackoverflow.com/questions/4088467/get-the-value-in-an-input-text-box
            todo.push($(this).val());
           // console.log(this.value); 
    });
    // var text = $('.todo').text();
    // localStorage.setItem('test', "A");
    //console.log(todo);
   // console.log(JSON.stringify(todo));
    var todoJSON = JSON.stringify(todo)
        // stores the todo item in string format
    localStorage.setItem("todo", todoJSON);

});

// function to deletes user all text from the screen and from  browser local storage 
$(document).on('click', '.erase', function() {
    // validating via an alert to ask user to confirm if their input should be deleted if text area is not empty
    if ($(document).siblings(".todo").val() !== "") {
        var ask = confirm("Please click OK to confirm if you would like to delete all text entries on this page else click Cancel to proceed with updating your workday schedule?");
        // If user confirms (i.e. truthy check), clear text area and clear local storage
        $('.todo').each(function(){
            if (ask) {
                $(this).siblings(".todo").val("");
                localStorage.setItem("", "");
            } else {
                return;
            }
        } );
}else {
    return;
}
});