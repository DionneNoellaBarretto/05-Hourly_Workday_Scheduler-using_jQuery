// returns the hour reading from the current moment in time - example: 18 for 18:XX hours, 2 for 2:xx hours
var hourDisplayed = moment().format('H');
// console.log(hour);

// Add current date to the top of the page as defined here https://momentjs.com/
$("#currentDay").text(moment().format('MMMM Do YYYY, h:mm:ss a'));  // Example : July 10th 2021, 6:55:40 pm
 
// displays time block between 8am and 6pm (standard workday hours)
for (var i = 8; i < 22; i++) {
    var row = $('<div class="row">');
    var hour = $('<div class="col-md-1 hour">' + hourReading(i) + '</div>');
    var todoText = $('<textarea class="todo col-md-9" id=' + i + '></textarea>');
    var delBtn = $('<button class="col-md-1 btn delBtn d-flex justify-content-center align-items-center"><i class="fas fa-trash-alt"></i></button>');
    var saveBtn = $('<button class="col-md-1 btn saveBtn d-flex justify-content-center align-items-center"><i class="fas fa-save"></i></button>');
    row.append(hour, todoText, delBtn, saveBtn);
    $(".container").append(row);
    hourReading(i);
    saveTasks();
}
// Gets the hour and appends an am or pm depending on if the hour is before noon or after noon
function hourReading(i) {
    var hours = "";
    if (i < 12) {
        hours = i + "am";
    } else if(i > 12){
        hours = (i-12) + "pm"
    } else {
        hours = i + "pm";
    }
    return hours;
} 

