
// var todoInput = document.querySelector("#todo-text");
// var todoForm = document.querySelector("#todo-form");
var _hourList = $("#hour-list");

var currentDate = new Date();
var currentHour = ((currentDate.getHours()+11) %12 +1);
var buttonsView = $('#buttons-view');

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
var mySchedule = [];



function setupDay() {
    
    var hrData = {};

    for (var i=7; i<25; i++) {

        var hr12 = ((i+11) %12 +1);

        var li = document.createElement("li");
         li.textContent = hr12 + ":00";
         li.setAttribute("data-index", hr12);      

         // assign the background color by the hour of the day

         if (i < currentHour) {
            li.className = "past";
         }
         else if (i > currentHour) {
             li.className = "future";
         }
         else {
            li.className = "present";
         }
         

         // var li = $("li");
        // li.text(hr12 + ":00");
        // li.addClass("present");
    
        var inputEvent = document.createElement("input");
        inputEvent.type = "text";
        inputEvent.className =  "eventInput";
        inputEvent.id =  "eventhr" + hr12;
        
        
        li.appendChild(inputEvent);

        //var button = $('<button>').text("Update Event") //.addClass('saveBtn')
        //console.log(button)
        var button = document.createElement("button");
        button.textContent = "Update Event";
        button.className = "saveBtn";
        //button.id = "bhr" + hr12;
        button.id = "bhr" + i;
        //button.addClass(".saveBtn");
    
        li.appendChild(button);
        _hourList.append(li);
        //_hourList.append(button);
        //console.log(hr12);
        //$("#hour-list").append(li)

        // setup json object to hold today's events

         hrData = {}
         hrData["hr"] = i;
         hrData["event"] = "vac";

         myHrs.hr = i;
         myHrs.event = "vac"
         
         mySchedule.push({"hr12": hrData.hr, "event": hrData.event});
        

         console.log("my schedule " + mySchedule[i]);
         console.log(hrData);
    }
}


_hourList.on("click", ".saveBtn", function(event) {
    console.log("here " + $(this).attr("id"));

    var s = $(this).attr("id");
    var hrstr = s.substring(3);

    // if (hrstr > 12) {
    //     hrstr = hrstr + 1;
    // }

    console.log(hrstr);
    console.log(mySchedule[hrstr]);
})

setupDay();
