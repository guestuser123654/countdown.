var database = firebase.firestore();

var userDoc = sessionStorage.getItem("document");

var userName = sessionStorage.getItem("name");

var inputMonths, inputDays, inputYears, inputHours, inputMinutes;

var eventName = document.querySelector("input[name='input-text']");

var enterBtn = document.querySelector("#enter-button");

var ul = document.querySelector("ul");

var displayID = document.querySelector("#id-display");


var userDocument = database.collection("users").doc(userDoc);

var timer = database.collection("users").doc(userDoc);
timer.get().then(function(doc){
    document.querySelector("#month").value = doc.data().countdownMonths; // GRABS THE VALUE OF MONTH AND SAVES IN THE DATABASE
    document.querySelector("#day").value = doc.data().countdownDays; // GRABS THE VALUE OF DAY AND SAVES IN THE DATABASE
    document.querySelector("#year").value = doc.data().countdownYears; // GRABS THE VALUE OF YEAR AND SAVES IN THE DATABASE
    document.querySelector("#hour").value = doc.data().countdownHours; // GRABS THE VALUE OF HOUR AND SAVES IN THE DATABASE
    document.querySelector("#min").value = doc.data().countdownMinutes; // GRABS THE VALUE OF MINUTES AND SAVES IN THE DATABASE
});



// adding event name
function addLi (){
    if (eventName.value != "") {
        var li = document.createElement("li");
        li.addEventListener("click", function(){
            li.remove();
        });
        li.innerHTML = eventName.value;
        ul.appendChild(li);
    } 
}

// using enter BUTTON to add the event name
enterBtn.addEventListener("click", addLi);
document.addEventListener("keypress", function(event){
    if (event.key == "Enter"){
        addLi();
    }
});

// using click to remove the event name
userDocument.get().then((doc) => {
    if (doc.data().eventName.length != 0){
        (doc.data().eventName).forEach(function(eventName){
            var li = document.createElement("li")
            li.addEventListener("click", function(){
                li.remove()
            })
            li.innerHTML = eventName;
            ul.appendChild(li);
        });
    } 
});

// SAVING EVENT NAME --------------------------------------
var saveButton = document.querySelector("#save");
saveButton.addEventListener("click", function(){
    inputMonths = document.querySelector("#month");
    inputDays = document.querySelector("#day");
    inputYears = document.querySelector("#year");
    inputHours = document.querySelector("#hour");
    inputMinutes = document.querySelector("#min");
    console.log(inputMonths.value + " " + inputDays.value + " " + inputYears.value + " " + inputHours.value + " " + inputMinutes.value);
   
   
   
   
    var listItems = document.querySelectorAll("li");
    var userEvent = [];
    listItems.forEach(function(li){
        userEvent.push(li.innerHTML);
    });
    
    // SAVES THE 
    var listDays = document.querySelectorAll("#timer_days");
    var userCountdownDays = [];
    listDays.forEach(function(month){
        userCountdownDays.push(month.innerHTML);
    });
    
    var listHours = document.querySelectorAll("#timer_hours");
    var userCountdownHours = [];
    listHours.forEach(function(timer_hours){
        userCountdownHours.push(timer_hours.innerHTML);
    });
    
    var listMinutes = document.querySelectorAll("#timer_minutes");
    var userCountdownMinutes = [];
    listMinutes.forEach(function(timer_minutes){
        userCountdownMinutes.push(timer_minutes.innerHTML);
    });
    
    var listSeconds = document.querySelectorAll("#timer_seconds");
    var userCountdownSeconds = [];
    listSeconds.forEach(function(timer_seconds){
        userCountdownSeconds.push(timer_seconds.innerHTML);
    });
    
    (userDocument).set({
        eventName: userEvent,
        countdownDays: inputDays.value,
        countdownMonths: inputMonths.value,
        countdownMinutes: inputMinutes.value,
        countdownHours: inputHours.value,
        countdownYears: inputYears.value,
    }, {merge: true});
});

// DISPLAYS THE CURRENT TIME
var myVar = setInterval(myClock, 10);
  function myClock() {
      var date = new Date();
      var clock = date.toLocaleTimeString('en-US');
      var n = date.toDateString();
      document.getElementById("clock").innerHTML = 'Local time:  ' + n + ' - ' + clock;
}

// // get a new date (locale machine date time)
// var date = new Date(); // get the date as a string
// var n = date.toDateString(); // get the time as a string
// var clock = date.toLocaleTimeString();
// document.getElementById('clock').innerHTML = n + ' ' + clock; // set the innerHTML of that element to the date a space the time




// showing the user their documentID and name
displayID.innerHTML = userDocument.id; // DISPLAYS USER DOCUMENT

// WELCOMES THE USER
var myString = "Welcome " + userName;
var myArray = myString.split("");
var loopTimer;

function looper() {
  if(myArray.length > 0){
    document.getElementById("typingText").innerHTML += myArray.shift();
  } else {
    clearTimeout(loopTimer);
  }
  loopTimer = setTimeout('looper()', 100);
}
looper();

// --------whenever the page loads, the button of "create countdown is clicked"------------------------------------------------

var month = document.querySelector('#month').selectedOptions.value;
var temp = setInterval(() => {
    settimer()
    clearInterval(temp)
}, 500);

// ----------------------COPY BUTTON---------------------------------------------------
    var copyTextareaBtn = document.querySelector('.js-textareacopybtn');

         copyTextareaBtn.addEventListener('click', function(event) {
          var copyTextarea = document.querySelector('.js-copytextarea');
          copyTextarea.focus();
          copyTextarea.select();

          try {
            var successful = document.execCommand('copy');
            var msg = successful ? 'successful' : 'unsuccessful';
            console.log('Copying text command was ' + msg);
          } catch (err) {
            console.log('Oops, unable to copy');
          }
        });

// ----------------------COUNTDOWN SCRIPT---------------------------------------------------
  var timer;
function settimer() {
     
     clearInterval(timer);
     var timer_month=document.getElementById("month").value; // collects the user input of month
     var timer_day=document.getElementById("day").value; // collects the user input of day
     var timer_year=document.getElementById("year").value; // collects the user input of year
     var timer_hour=document.getElementById("hour").value; // collects the user input of hour
     var timer_min=document.getElementById("min").value; // collects the user input of minutes
     if(timer_hour=="") timer_hour=0; // sets the hour to 0
     if(timer_min=="") timer_min=0; // sets the minutes to 0
    
     var timer_date=timer_month+"/"+timer_day+"/"+timer_year+" "+timer_hour+":"+timer_min;
     var end = new Date(timer_date); // arrange values in Date Time Format
     var now = new Date(); // get Current date time
     var second = 1000; // total Millisecond In One Sec
     var minute = second * 60; // total Sec In One Min
     var hour = minute * 60; // total Min In One Hour
     var day = hour * 24; // total Hour In One Day
     function showtimer() {
      var now = new Date(); // get the current date
      var remain = end - now; // get The Difference Between Current and entered date time
      if(remain < 0) // when the timer reaches 0, a page pops up
      {
       clearInterval(timer);
       document.getElementById("timer_value").innerHTML = window.open('https://acegif.com/wp-content/gif/confetti-4.gif','name','width=10000,height=10000');
       return; 
      }
      var days = Math.floor(remain / day); // get Remaining Days
      var hours = Math.floor((remain % day) / hour); // get remaining Hours
      var minutes = Math.floor((remain % hour) / minute); // get Remaining Minutes
      var seconds = Math.floor((remain % minute) / second); // get Remaining Seconds
    
      document.getElementById("timer_days").innerHTML = days; // displays days
      document.getElementById("timer_hours").innerHTML = hours; // displays hours
      document.getElementById("timer_minutes").innerHTML = minutes; // displays minutes
      document.getElementById("timer_seconds").innerHTML = seconds; // displays seconds
     }
     timer = setInterval(showtimer, 1); // display timer In Every 1 Seconds
}