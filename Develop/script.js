
 // JavaScript function that wraps everything and runs when DOM is ready

 $(document).ready(function() {

    // a Dom variable
    var _hourList = $("#hour-list");

    // change if your day is longer or shorter (24hr format)
    var startHr = 7;    // 7am 
    var endHr = 25;     // 10pm

    var currentDate = new Date();
    var currentHour24 = currentDate.getHours();

    var mySchedule = [];


    // initialize the scheduler data file
    
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

        // save initial schedule to storage to be modified

        localStorage.setItem("mySchedule", JSON.stringify(mySchedule));
    }

    function setupDay(startTime, endTime) {        
        var hrData = {};

        // get the current schedule and display

        mySchedule = JSON.parse(localStorage.getItem("mySchedule"));

        for (var i=startTime; i<endTime; i++) {

            // create time blocks and add

            var hr12 = ((i+11) %12 +1);
            var li = document.createElement("li");


            // assign the time to the list blocks

            if (i >11)
                li.textContent = hr12 + ":00 PM";
            else
                li.textContent = hr12 + ":00 AM";
    
            li.setAttribute("data-index", hr12);      


            // assign the background color by the hour of the day

            if (i < currentHour24)
                li.className = "past";
            else if (i > currentHour24)
                li.className = "future";
            else 
                li.className = "present";
                    

            // create input fields and buttons

            var inputEvent = document.createElement("input");
            inputEvent.type = "text";
            inputEvent.className = "eventInput " + li.className;
            inputEvent.id =  "eventhr" + i; 
            inputEvent.value = (mySchedule[i-7].event);
            inputEvent.style.color = "black";
            inputEvent.style.border = "none"
                    
            li.appendChild(inputEvent);

            var button = document.createElement("button");
            button.textContent = "Update";
            button.className = "saveBtn";
            button.id = "bhr" + i;
        
            li.appendChild(button);
            _hourList.append(li);
        }
    }

    // define an on click for all buttons in the list called _hourList

    _hourList.on("click", ".saveBtn", function(event) {

        // button clicked on
        var s = $(this).attr("id");

        // button hr assigned to this button in 24 hr format
        var hrstr = s.substring(3);

        // the array event location for this hour's data
        var event_loc = hrstr - startHr;
        var event_input = $("#eventhr" + hrstr);

        mySchedule[event_loc].event = event_input.val();

        // save schedule changes

        localStorage.clear();
        localStorage.setItem("mySchedule", JSON.stringify(mySchedule));
    })

    $("#currentDay").text(new Date())

    // initialize the schedule
    initSchedule(startHr, endHr);

    // load up todays schedule
    setupDay(startHr, endHr);
 })    
