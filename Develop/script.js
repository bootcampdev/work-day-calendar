
// var todoInput = document.querySelector("#todo-text");
// var todoForm = document.querySelector("#todo-form");
var _hourList = $("#hour-list");

var currentDate = new Date();
var currentHour = ((currentDate.getHours()+11) %12 +1);
var buttonsView = $('#buttons-view');

function setupDay() {
    
    for (var i=8; i<25; i++) {

        var hr12 = ((i+11) %12 +1);

        var li = document.createElement("li");
         li.textContent = hr12 + ":00";
         li.setAttribute("data-index", hr12);
         li.className = "present";
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
        button.id = "bhr" + hr12;
        //_button.addClass(".saveBtn");
    
        li.appendChild(button);
        _hourList.append(li);
        //console.log(hr12);
        //$("#hour-list").append(li)
    }
}


_hourList.on("click", ".saveBtn", function(event) {
    console.log("here " + $(this).attr("id"));
})

setupDay();
