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
k) need to save to local storage and delete as well (need to make the buttons work)
*/

// back button being selected by id not class!
var back = $('#back');
var instructional_alert = $(".alert-info");
var footerHide = $(".footer");




// Immediately hide the back button
back.hide();

// returns the hour reading from the current moment in time - example: 18 for 18:XX hours, 2 for 2:xx hours
var hourDisplayed = moment().format('H');
//console.log(hourDisplayed);

// mapping the schedule your workday and save button with identifiers
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
//time slot row variable that uses row class to create row in the container 
// Change the alignment of flex item to center with justify-content-center      
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
// Adds the class `todo and col-md-8` to the user text element
    // learnt how to add a text area placeholder https://www.w3schools.com/tags/att_textarea_placeholder.asp + // Uses col-*-* class for viewing to adjust on different screens..after trying several permutations and combinations settling for the col-md-* class i've chosen these values to appear full-size on small devices and half-size on medium or larger devices -->
    var userText = $('<textarea placeholder="Enter your todo task here.." class="text ">').addClass('todo col-md-8');
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

// https://getbootstrap.com/docs/4.0/components/buttons/ 
    // flex box container concept https://getbootstrap.com/docs/4.4/utilities/flex/, save icon from font awesome site  , trash icon https://fontawesome.com/v5.15/icons/trash-alt?style=regular
    var saveBtn = $('<button id="save">').addClass(" disabled col-md-1 btn-block btn save d-flex justify-content-center align-items-center fa fa-plus-circle");
    var delBtn = $('<button>').addClass(" disabled col-md-1 erase btn btn-block d-flex justify-content-center align-items-center far fa-trash-alt");
   // joins up all the (sections) defined above to form a hourly schedule grid for the user in this particular order for a given row 
   row.append(hour, userText,saveBtn,delBtn);
   // places all these rows in the container class section of the html file by appending to the page
   timeBlocks.append(row);
}
   //displays the back button once the schedule is created
   back.show();
   //hides the instructional alert up  and footer at the bottom
instructional_alert.hide();
footerHide.hide();
};


// put event data in local storage when clicking save button.
$('.save').on('click',function(){
    saveBtn.addClass(" active");

    // variable to hold todo data that user enters 
var todo =[];
var todoJSON = JSON.stringify(todo);
    $('.todo').each(function(){
        todo.push($(this).val());
    });
    localStorage.setItem("cache", cache.value);
    localStorage.setItem(("todo"), todoJSON);
})






