/*to do's 
a) need to add a redo schedule and a clear all text buttons
b) see if the hours can be fixed when day starts in the evening
c) fix the color for present/future/past
d) add background image
e) scale for table screen (intermediate)
f) add coffee  icon up top
g) hide the schedule your workday button once its clicked
✅ h) text area placeholder 
*/

// returns the hour reading from the current moment in time - example: 18 for 18:XX hours, 2 for 2:xx hours
var hourDisplayed = moment().format('H');
console.log(hourDisplayed);
// Add current date to the top of the page as defined here https://momentjs.com/
// $("#currentDay").text(moment().format('MMMM Do YYYY, h:mm:ss a'));  // Example : July 10th 2021, 6:55:40 pm
$("#currentDay").text(moment().format('dddd, MMMM Do, YYYY' + " @ " + 'HH:mm:ss'));
 // mapping the schedule your workday button with and identifier
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

    // creates time block in the div container portion of the html file for a standard work hour slot of 8 hours (+1 hour lunch break) depending on the start time of the user)
for (var i = startHour; i<= (Number(startHour)+9); i++) {
  //  console.log(i, Number(startHour));
    var row = $('<div class="row">');
    // bootstrap grid system concept for sizing the widths : ref --> https://www.w3schools.com/bootstrap/bootstrap_grid_system.asp
    var hour = $('<div class="col-md-1 hour">' + hourReading(i) + '</div>');
// learnt how to add a text area placeholder https://www.w3schools.com/tags/att_textarea_placeholder.asp
    var userText = $('<textarea placeholder= "Enter task here" class="todo col-md-7" id=' + i + '></textarea>');
    var saveBtn = $('<button class="col-md-1 btn save d-flex justify-content-center align-items-center"><i class="fas fa-save"></i></button>');
    var delBtn = $('<button class="col-md-1 btn erase d-flex justify-content-center align-items-center"><i class="fas fa-trash-alt"></i></button>');
   // joins up all the sections defined above to form a schedule for the user in this particular order
   row.append(hour, userText, saveBtn,delBtn);
   $(".container").append(row);

   // appends the right o'clock am/pm reading by calling the hourReading function and passing it an argument of i
   hourReading(i);
//    also initializes the location of text tobe saved in browser local storage
   saveTasks();
}

}

// Get the hour reading based on the i iteration from above and appends an am or pm depending on if the hour is before noon or after noon
function hourReading(i) {
    var hours = "";
    if (i < 12) {
        hours = i + "am";
    } else if(i > 12){
        hours = (i-12) + "pm";
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


// Compare current hour with each of the time block's hours
$(".col-md-7").each(function () {
    var dataTime = $(this).attr("id");
    var dataNum = parseInt(dataTime);
console.log(dataNum, dataTime);
    // assign colors based on time
    if (hourDisplayed < hour) {
        $(this).addClass("future");
    } else if (hour == dataNum) {
        $(this).addClass("present");
    } else {
        $(this).addClass("past");
    }
});

  
        
        
    

