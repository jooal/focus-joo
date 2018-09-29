var config = {
    apiKey: "AIzaSyAlUnK57pmSv5MxlaZNXKYfRWg7rbgExn0",
    authDomain: "focus-project-636cf.firebaseapp.com",
    databaseURL: "https://focus-project-636cf.firebaseio.com",
    projectId: "focus-project-636cf",
    storageBucket: "",
    messagingSenderId: "665041759126"
};

firebase.initializeApp(config);

var database = firebase.database();

var toDoCount = 0;

setInterval(function showTime() {
    var d = new Date();
    document.getElementById("current-time").textContent = ("Current Time: " + moment().format('MMMM Do YYYY, hh:mm A'));
    // console.log(d);
}, 1000);

var makeTask = function (snap) {
    // toDoCount++

    var rowDiv = $("<div>")
    var checkCol = $("<div>")
    var formDiv = $("<div>")
    var taskCol = $("<div>")
    var timeCol = $("<div>")
    var taskPara = $("<p>")
    var commentsPara = $("<p>")
    var startTimePara = $("<p>")
    // var endTimePara = $("<p>")
    var datePara = $("<p>")
    // var checkbox = $("<input>")
    var toDoTask = snap.val().formToDoTask;
    var addSetDate = snap.val().formAddSetDate;
    var addComments = snap.val().formAddComments;
    var addStartTime = snap.val().formAddStartTIme;
    var addEndTime = snap.val().formAddEndTime;
    var num = snap.val().formtoDoCount

    //var editDateForm = moment(addSetDate).format("MMMM Do YYYY")
    var editStartTime = moment(addStartTime, 'HH:mm').format('hh:mm a')
    var editEndTime = moment(addEndTime, 'HH:mm').format('hh:mm a')
    taskPara.text(toDoTask)
    commentsPara.text(addComments)
    startTimePara.text(editStartTime + " - " + editEndTime)
    // endTimePara.text(addEndTime)
    //datePara.text(editDateForm)

    rowDiv.addClass("row border taskBack")
    rowDiv.attr("id", "item-" + num)
    checkCol.addClass("col-2")
    formDiv.addClass("form-check")
    taskCol.addClass("col-8")
    timeCol.addClass("col-2")
    taskPara.addClass("task")
    commentsPara.addClass("comments")
    startTimePara.addClass("timeDue")
    // endTimePara.addClass("timeDue")
    datePara.addClass("dateDue")
    // checkbox.addClass("form-check-input")
    // checkbox.attr("type", "checkbox")
    // checkbox.attr("id", "checkboxID")

    var toDoComplete = $("<button class='btn-primary' id='check'>");
    toDoComplete.attr("data-to-do", num);
    toDoComplete.addClass("checkbox");
    toDoComplete.append("✓");

    var deleteTask = $("<button id='x'>");
    deleteTask.attr("data-to-delete", num);
    deleteTask.addClass("delete");
    deleteTask.append("x");
    timeCol.append(deleteTask);

    formDiv.append(toDoComplete)

    // formDiv.append(checkbox)
    checkCol.append(formDiv)
    taskCol.append(taskPara)
    taskCol.append(commentsPara)
    timeCol.append(startTimePara)
    // timeCol.append(endTimePara)
    timeCol.append(datePara)

    rowDiv.append(checkCol)
    rowDiv.append(taskCol)
    rowDiv.append(timeCol)

    $("#taskDiv").append(rowDiv)

}


//submit button clicked then do this function
$(document).on("click", "#submitBtn", function (event) {
    toDoCount++

    var task = $("#taskInput").val().trim()
    var comments = $("#commentsInput").val().trim()
    var startTime = $("#startTimeInput").val().trim()
    var endTime = $("#endTimeInput").val().trim()
    //var dateValue = $("#dateInput").val()

    var taskData = {

        formtoDoCount: toDoCount,
        formToDoTask: task,
        //formAddSetDate: dateValue,
        formAddComments: comments,
        formAddStartTIme: startTime,
        formAddEndTime: endTime,

    }

    console.log(taskData);
    var itemNum = "item" + toDoCount
    console.log(itemNum)
    database.ref("items/" + itemNum).set(taskData);
    database.ref("theFinalCountDown").set({
        toDoCount: toDoCount
    })

    $("#taskInput").val(" ");
    $("#startTimeInput").val(" ");
    $("#endTimeInput").val(" ");
    $("#dateInput").val(" ");
    $("#commentsInput").val(" ");

});

database.ref("theFinalCountDown").on("value", function (snapChild) {
    toDoCount = snapChild.val().toDoCount
    console.log(toDoCount)
    console.log("help")
})


database.ref("items").orderByChild('formAddSetDate').on("child_added", function (childSnapshot) {
    makeTask(childSnapshot)
})

database.ref("items").startAt('00:00').on("child_added", function (childSnapshot) {
    makeTask(childSnapshot)
})


var checked = false
//remove item
$(document.body).on("click", ".checkbox", function () {
    var thisNumber = $(this).attr("data-to-do");
    var thisDiv = $("#item-" + thisNumber)

    if (!checked) {
        thisDiv.removeClass("taskBack")
        thisDiv.addClass("checkTaskBack")
        checked = true
    }
    else if (checked) {
        thisDiv.removeClass("checkTaskBack")
        thisDiv.addClass("taskBack")
        checked = false
    }

});
$(document).on("click", ".delete", function () {
    var thisNumber = $(this).attr("data-to-delete");
    console.log(thisNumber)
    $("#item-" + thisNumber).remove();
    database.ref("items/item" + thisNumber).remove()
    console.log("click")
});

$(document).ready(function () {

    var queryURL = "http://quotes.rest/qod.json";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).done(function (response) {
        console.log(queryURL);
        console.log(response.contents.quotes[0].quote);
        console.log(response.contents.quotes[0].author);
        var theQuote = (response.contents.quotes[0].quote);
        var theAuthor = (response.contents.quotes[0].author);
        document.getElementById("quote").innerHTML = theQuote;
        document.getElementById("author").innerHTML = theAuthor;
    })
})



// createNotification("The Title")
// function createNotification(title) {

//     // Let's check if the browser supports notifications
//     if (!"Notification" in window) {
//       console.log("This browser does not support notifications.");
//     }

//     // Let's check if the user is okay to get some notification
//     else if (Notification.permission === "granted") {
//       // If it's okay let's create a notification

//       var img = '/to-do-notifications/img/icon-128.png';
//       var text = 'HEY! Your task "' + title + '" is now overdue.';
//       var notification = new Notification('To do list', { body: text, icon: img });

//     //   window.navigator.vibrate(500);
//     }

//     // Otherwise, we need to ask the user for permission
//     // Note, Chrome does not implement the permission static property
//     // So we have to check for NOT 'denied' instead of 'default'
//     else if (Notification.permission !== 'denied') {
//       Notification.requestPermission(function (permission) {

//         // Whatever the user answers, we make sure Chrome stores the information
//         if(!('permission' in Notification)) {
//           Notification.permission = permission;
//         }

//         // If the user is okay, let's create a notification
//         if (permission === "granted") {
//           var img = '/to-do-notifications/img/icon-128.png';
//           var text = 'HEY! Your task "' + title + '" is now overdue.';
//           var notification = new Notification('To do list', { body: text, icon: img });

//         //   window.navigator.vibrate(500);
//         }
//       });
//     }
// }