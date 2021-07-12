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

//  as per https://developer.mozilla.org/en-US/docs/Web/API/Document/cookie Note that we are setting `SameSite=None;` in this example because the example
// needs to work cross-origin.
// It is more common not to set the `SameSite` attribute, which results in the default,
// and more secure, value of `SameSite=Lax;`
document.cookie = "name=oeschger; SameSite=None; Secure";

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

// mapping the schedule your workday and save button with identifiers
var schedule = document.querySelector("#schedule");
// console.log(schedule);

// Add event listener to the schedule_your_day button
schedule.addEventListener("click", scheduleDay);

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
//time slot row variable
        var row = $('<div class="row">');
    // creates time block in the div container portion of the html file for a standard work hour slot of 8 hours (+1 hour lunch break) depending on the start time of the user)
var timeBlocks = $('.container');
for (var i = startHour; i<= (Number(startHour)+9); i++) {
    //  console.log(i, Number(startHour));

// bootstrap grid system concept for sizing the widths : ref --> https://www.w3schools.com/bootstrap/bootstrap_grid_system.asp
    var hour = $('<div class="hour col-1">');
//console.log(hour);
if (i < 12) {
    hour.text(i + " :00 AM");
} else if(i > 12){
    hour.text((i-12) + " :00 PM");
} else if ((i == 12 || i ==24)){
    hour.text(i + " o'Clock");
}
    // learnt how to add a text area placeholder https://www.w3schools.com/tags/att_textarea_placeholder.asp
    var userText = $('<textarea placeholder="Enter your todo task here.." class="text ">').addClass('todo col-8');
            // check to see if there is saved data to pull into the time blocks
if(localStorage.getItem("cache") === null){
    // console.log(todoData);
    userText.text('');
}else{
    var matchHour = i;
    // console.log(matchHour);
    var oldTodo = JSON.parse(window.localStorage.getItem("cache"));
    // console.log(oldTodo);
    matchHour -= startHour;
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

    // flex box container concept https://getbootstrap.com/docs/4.4/utilities/flex/, save icon from font awesome site https://fontawesome.com/v5.15/icons/save?style=regular , trash icon https://fontawesome.com/v5.15/icons/trash?style=solid
    var saveBtn = $('<button id="save">').addClass(" col-md-1 btn save d-flex justify-content-center align-items-center fas fa-save");
    // var delBtn = $('<button>').addClass(" col-md-1 btn erase d-flex justify-content-center align-items-center fas fa-trash fa-w-14 fa-spin fa-lg");
   // joins up all the sections defined above to form a schedule for the user in this particular order
   row.append(hour, userText,saveBtn);
   // places all these rows in the container class section of the html file
   timeBlocks.append(row);
}};


// put event data in local storage when clicking save button.
$('.save').on('click',function(){

    // variable to hold todo data that user enters 
var todo =[];
    $('.todo').each(function(){
        todo.push(this.value);
    });
    localStorage.setItem("cache", JSON.stringify(todo));
})