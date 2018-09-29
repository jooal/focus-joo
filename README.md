

Focus is a To-Do app inspired by my need to right down my schedule on a sticky-note everyday. 

Technologies Used For This App:

HTML5 

CSS

Bootstrap

Javascript

JQuery (https://jquery.com/)

Firebase API for database hosting (https://firebase.google.com/)

Quotes.rest API (https://quotes.rest/)


Structure of App:
./assets/javascript holds the javascript for the app

./assets/css holds the css for the app

index.html holds the html code for the app


About the App: This app allows a user to fill out a form to submit a task that will be displayed on the TO-DO list. The task is stored within Firebase so the user can refresh or exit the page without losing data. When the user clicks on the "x" the task is deleted from the page and the Firebase data and will not reappear on reload. 

Future Features:
-a notification API to alert user 10 minutes before a task should be started

-highlight the current task at it's designated time (ex: task at 9am-10am will be highlighted from 9am-10am)

-a function to prevent time overlaps (ex: if you have a task 9am-10am and try to add another task at the same time, it will prevent you)

