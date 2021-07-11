/*to do's 
a) need to add a redo schedule and a clear all text button
b) see if the hours can be fixed when day starts in the evening 
c) fix the color for present/future/past to work no matter say if user inputs 7am when actual time is 4pm
d) add background image
e) scale for table screen (intermediate)
f) add coffee  icon up top
g) hide the schedule your workday button once its clicked
✅ h) text area placeholder 
i) auto change the col size when using smaller screens  (https://www.geeksforgeeks.org/how-to-change-column-to-row-on-small-display-in-bootstrap-4/)
j) disable input to time blocks that are past
k) need to save to local storage and delete (need to make the buttons work)
*/

 
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

// returns the hour reading from the current moment in time - example: 18 for 18:XX hours, 2 for 2:xx hours
var hourDisplayed = moment().format('H');
//console.log(hourDisplayed);

// mapping the schedule your workday and reschedule button with an identifier
var schedule = document.querySelector("#schedule");
var reschedule = document.querySelector("#reschedule");
// console.log(schedule);

// Add event listener to the schedule_your_day button
schedule.addEventListener("click", scheduleDay);
// reschedule.addEventListener("click", rescheduleDay);

// request user for start and end time
function scheduleDay() { 
    var startHour = 0;
    startHour = prompt ("What hour do you start your day? \n\n Select a number between 1 and 24");
    if (startHour <1  || startHour > 24 || isNaN(startHour)) {
        alert(`Invalid Entry!! \n\n Please click OK and click on 'Schedule_Your_Workday' button again to enter a valid number between 1 and 24 for the Work Day Scheduler to create appropriate hourly slots!`);
        return;
    } else if (startHour >=1 && startHour < 12)
        {
    alert(`You entered your start time as ${startHour} am!`);
        } else if (startHour >= 13){
            alert(`You entered your start start time as ${startHour}:00 hours in the evening!`);
    
        } else {
            alert(`You entered your start time as ${startHour} o'clock'!`);
        }
        // console.log(startHour);
        var row = $('<div class="row">');
        row.addClass(" time-block");
    // creates time block in the div container portion of the html file for a standard work hour slot of 8 hours (+1 hour lunch break) depending on the start time of the user)
var timeBlocks = $('.container');
for (var i = startHour; i<= (Number(startHour)+9); i++) {
    //  console.log(i, Number(startHour));
// bootstrap grid system concept for sizing the widths : ref --> https://www.w3schools.com/bootstrap/bootstrap_grid_system.asp
    var hour = $('<div class="hour">');
    hour.addClass ("col-2");
//console.log(hour);
if (i < 12) {
    hour.text(i + " am");
} else if(i > 12){
    hour.text((i-12) + " pm");
} else if (i == 12){
    hour.text(i + " o'clock");
}
    // learnt how to add a text area placeholder https://www.w3schools.com/tags/att_textarea_placeholder.asp
    var userText = $('<textarea>').addClass(' todo col-8');
            // check to see if there is saved data to pull into the time blocks
if(localStorage.getItem("todoData")===null){
    userText.text('');
}else{
    var matchHour =i;
    var oldTodo =JSON.parse(window.localStorage.getItem('todoData'));
    matchHour -=startHour;
    userText.text(oldTodo[matchHour]);
}
    // assign color classes with a space before appending to existing class list based on time comparison to the displayed current hour
if (i < hourDisplayed) {
    userText.addClass(" past");
}else if (i == hourDisplayed) {
    userText.addClass(" present");
} else{
    userText.addClass(" future")
}
    // flex box container concept https://getbootstrap.com/docs/4.4/utilities/flex/
    var saveBtn = $('<button>').addClass(" col-md-1 btn save d-flex justify-content-center align-items-center fas fa-save");
    // var delBtn = $('<button>').addClass(" col-md-1 btn erase d-flex justify-content-center align-items-center fas fa-trash-alt");
   // joins up all the sections defined above to form a schedule for the user in this particular order
   row.append(hour, userText,saveBtn);
   // places all these rows in the container class section of the html file
   timeBlocks.append(row);
}
}
// variable to hold todo data that user enters 
var todo =[];

// put event data in local storage when clicking save button.
$('.save').on('click', function() {
    $('.event').each(function(){
        todo.push(this.value);
    });
    localStorage.setItem("plansData", JSON.stringify(todo));
})