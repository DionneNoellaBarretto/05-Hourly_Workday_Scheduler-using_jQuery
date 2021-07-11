/*to do's 
✅a) need to add a redo schedule and a clear all text buttons
b) see if the hours can be fixed when day starts in the evening
✅  c) fix the color for present/future/past
d) add background image
✅ e) scale for table screen (intermediate)
f) add coffee  icon up top
g) hide the schedule your workday button once its clicked
✅ h) text area placeholder 
i) change the col size when using smaller screens  (https://www.geeksforgeeks.org/how-to-change-column-to-row-on-small-display-in-bootstrap-4/)
j)  disable input to time blocks that are past
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
reschedule.addEventListener("click", rescheduleDay);

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


    // creates time block in the div container portion of the html file for a standard work hour slot of 8 hours (+1 hour lunch break) depending on the start time of the user)
for (var i = startHour; i<= (Number(startHour)+9); i++) {
  //  console.log(i, Number(startHour));
    var row = $('<div class="row">');
    // bootstrap grid system concept for sizing the widths : ref --> https://www.w3schools.com/bootstrap/bootstrap_grid_system.asp
    var hour = $('<div class="col-md-1 hour">' + hourReading(i) + '</div>');
//console.log(hour);
    // learnt how to add a text area placeholder https://www.w3schools.com/tags/att_textarea_placeholder.asp
    var userText = $('<textarea placeholder= "Enter task here" class="todo col-md-8" id=' + i + '></textarea>');
    // flex box container concept https://getbootstrap.com/docs/4.4/utilities/flex/
    var saveBtn = $('<button class="col-md-1 btn save d-flex justify-content-center align-items-center"><i class="fas fa-save"></i></button>');
    var delBtn = $('<button class="col-md-1 btn erase d-flex justify-content-center align-items-center"><i class="fas fa-trash-alt"></i></button>');
   // joins up all the sections defined above to form a schedule for the user in this particular order
   row.append(delBtn, hour, userText, saveBtn);
   // places all these rows in the container class section of the html file
   $(".container").append(row);
           
         
    // appends the right o'clock am/pm reading by calling the hourReading function and passing it an argument of i
    hourReading(i);
    //also initializes the location of text to be saved in browser local storage
       saveTasks();

   // Compare current hour with each of the time block's hours
$(".col-md-8").each(function () {
    var time = $(this).attr("id");
    var number = parseInt(time);
//console.log(number,hourDisplayed);
    // assign color classes with a space before appending to existing class list based on time comparison to the displayed current hour
    if (number < hourDisplayed) {
        $(this).addClass(" past");
    } else if (hourDisplayed == number) {
        $(this).addClass(" present");
    } else {
        $(this).addClass(" future");
    }
});
}
}   

function rescheduleDay() {
    //confirms if user wants to reschedule their day
    alert(`Click OK to proceed with rescheduling your day`);
  //deletes all entries
    $(".reschedule").click(function (){
        $(".todo").val("");
        localStorage.clear();})
        //recalls schedule your day function  
          
scheduleDay();
}


// Get the hour reading based on the i iteration from above and appends an am or pm depending on if the hour is before noon or after noon
function hourReading(i) {
    var hours = "";
    if (i < 12) {
        hours = i + " am";
    } else if(i > 12){
        hours = (i-12) + " pm";
    } else if (i ===12){
        hours = i + " o'clock";
    }
    return hours;
} 

//Retrieves tasks inputted by the user thats stored in browser local storage
function saveTasks() {
    $(".todo").each(function () {
        var inputId = $(this).attr("id");
        $(this).val(localStorage.getItem(inputId));
    });
}

//Saving events into local storage
$(".saveBtn").click(function () {
    var userInputs = $(this).siblings(".todo").val();
    var inputAddress = $(this).siblings(".todo").attr("id");
    localStorage.setItem(inputAddress, userInputs);
});

// function to deletes user inputted text from the screen and from  browser local storage 
$(".delBtn").click(function () {
    // validating via a alert to ask user to confirm  if their input should be deleted if text area is not empty
    if ($(this).siblings(".todo").val() !== "") {
        var ask = confirm("Please click OK to confirm if you would like to delete this entire entry else click Cancel?");
        
        // If user confirms, clear text area and clear item from local storage
        if (ask) {
            $(this).siblings(".todo").val("");
            localStorage.removeItem($(this).siblings(".todo").attr("id"));
        } else {
            return;
        }
    } else {
        return;
    }
});
