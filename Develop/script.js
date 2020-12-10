
// var todoInput = document.querySelector("#todo-text");
// var todoForm = document.querySelector("#todo-form");
var _hourList = $("#hour-list");

var startHr = 7;  // 7 am 
var endHr = 25;  // 24 hour format (10pm)

var currentDate = new Date();
var currentHour24 = currentDate.getHours();
var currentHour = ((currentDate.getHours()+11) %12 +1);
var buttonsView = $('#buttons-view');

var mySchedule = [];
var haveSchedule = false;

var liId;

var myHrs = {};
var mySchedule2 = { 
        "hr12" : "7",
        "hrs" : [
        {   
            "hr24": "1",
            "event": "vacation"
        }
    ]
}


function initSchedule(startTime, EndTime) {

    var hrData = {};

    // if have a schedule don't delete it, just return
    if (localStorage.getItem("mySchedule") != null) {
        return;
    }

    // iniitalize local storage for scheduling 
    for (var i=startTime; i<EndTime; i++)
    {
        var hr12 = ((i+11) %12 +1);

        hrData = {}
        hrData["hr24"] = i;
        hrData["hr12"] = hr12;
        hrData["event"] = "";

        mySchedule.push({"hr24": hrData.hr24, "hr12": hrData.hr12, "event": hrData.event});
    }

    localStorage.setItem("mySchedule", JSON.stringify(mySchedule));
}

function setupDay(startTime, endTime) {
    
    var hrData = {};

    // if (localStorage.getItem("dailySchedule") != null) {
    //     mySchedule = JSON.parse(localStorage.getItem("mySchedule"));
    //     haveSchedule = true;
    // }

    mySchedule = JSON.parse(localStorage.getItem("mySchedule"));

    for (var i=startTime; i<endTime; i++) {

        var hr12 = ((i+11) %12 +1);

        var li = document.createElement("li");

        if (i >11) {
            li.textContent = hr12 + ":00 PM";
        }
        else {
            li.textContent = hr12 + ":00 AM";
        }
 
        li.setAttribute("data-index", hr12);      

        // assign the background color by the hour of the day

        if (i < currentHour24) {
            li.className = "past";
        }
        else if (i > currentHour24) {
            li.className = "future";
        }
         else {
            li.className = "present";
        }
         
        // setup json object to hold today's events

        // hrData = {}
        // hrData["hr24"] = i;
        // hrData["hr12"] = hr12;
        // if (haveSchedule)
        //     hrData["event"] = mySchedule[i-7].event;
        // else     
        //     hrData["event"] = "";       

        // not working li
        //----------------
        // var li = $("li");
        // li.text(hr12 + ":00");
        // li.addClass("present");
    
        // try another way to add li text

        var inputEvent = document.createElement("input");
        inputEvent.type = "text";
        inputEvent.className =  "eventInput";
        inputEvent.id =  "eventhr" + i; // hr12;   
        //inputEvent.value = (hrData["event"]);
        inputEvent.value = (mySchedule[i-7].event);
                  
        li.appendChild(inputEvent);

        // not working
        //------------
        // liId = "eventhr" + hr12;  
        // li.append($("<li class='no-bullet'><input type='text' id='kim'/></li>"));

        //var button = $('<button>').text("Update Event") //.addClass('saveBtn')
        //console.log(button)
        var button = document.createElement("button");
        button.textContent = "Update";
        button.className = "saveBtn";
        //button.id = "bhr" + hr12;
        button.id = "bhr" + i;
        //button.addClass(".saveBtn");
    
        li.appendChild(button);
        _hourList.append(li);

        //_hourList.append(button);
        //console.log(hr12);
        //$("#hour-list").append(li)

       

        //  myHrs.hr = i;
        //  myHrs.event = "vac"
         
        //  mySchedule.push({"hr24": hrData.hr24, "hr12": hrData.hr12, "event": hrData.event});
        

         console.log("my schedule " + mySchedule[i]);
         console.log(hrData);
    }
}


_hourList.on("click", ".saveBtn", function(event) {
    console.log("here " + $(this).attr("id"));

    // button clicked on
    var s = $(this).attr("id");

    // button hr assigned to this button in 24 hr format
    var hrstr = s.substring(3);

    // the array event location for this hour
    var event_loc = hrstr - 7;
    console.log(hrstr);
    console.log(event_loc);

    hr = mySchedule[event_loc].hr12;
    var event_input = $("#eventhr" + hrstr);

    mySchedule[event_loc].event = event_input.val();

    // $("#eventhr" + hr).val("test2");
    // event_input.val("test");

    //console.log(event_loc);
    console.log(mySchedule[event_loc]);

    // save schedule changes
    localStorage.clear();
    localStorage.setItem("mySchedule", JSON.stringify(mySchedule));
})

// initialize the schedule
initSchedule(startHr, endHr);

// load up todays schedule
setupDay(startHr, endHr);
