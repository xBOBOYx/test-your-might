var questions = [{
        title: "Commonly used data types DO NOT include:",
        choices: ["strings", "booleans", "alerts", "numbers"],
        answer: "alerts"
    },
    {
        title: "The condition in an if / else statement is enclosed within ____.",
        choices: ["quotes", "curly brackets", "parentheses", "square brackets"],
        answer: "parentheses"
    },
    {
        title: "Arrays in Javascript can be used to store ____.",
        choices: ["numbers and strings", "other arrays", "booleans", "all of the above"],
        answer: "all of the above"
    },
    {
        title: "String values must be within ____ when being assigned to variables.",
        choices: ["commas", "curly brackets", "quotes", "parenthesis"],
        answer: "quotes"
    },
    {
        title: "A very useful tool used during development and debugging for printing content to the debugger is:",
        choices: ["Javascript", "terminal / bash", "for loops", "console log"],
        answer: "console log"
    },

];
// Variables
var score = 0;
var questionIndex = 0;

// Start quiz
var clock = document.querySelector("#clock");
var timer = document.querySelector("#startClock");
var jsQuestions = document.querySelector("#jsQuestions");
var kombatBox = document.querySelector("#kombatBox");

// Seconds on the clock
var secondsLeft = 60;
var holdInterval = 0;
var penalty = 10;

// Create list
var ulCreate = document.createElement("ul");

// Timer on click
timer.addEventListener("click", function () {
    if (holdInterval === 0) {
        holdInterval = setInterval(function () {
            secondsLeft--;
            clock.textContent = "Time: " + secondsLeft;
            if (secondsLeft <= 0) {
                clearInterval(holdInterval);
                Kompleted();
                clock.textContent = "MORTAL KOMBAT!";
            }
        }, 1000);
    }
    render(questionIndex);
});

// Writes questions and choices to page: 
function render(questionIndex) {
    jsQuestions.innerHTML = "";
    ulCreate.innerHTML = "";
    for (var i = 0; i < questions.length; i++) {
        // Appends question
        var userQuestion = questions[questionIndex].title;
        var userChoices = questions[questionIndex].choices;
        jsQuestions.textContent = userQuestion;
    }
    // New items for each question choice
    userChoices.forEach(function (newItem) {
        var listItem = document.createElement("li");
        listItem.textContent = newItem;
        jsQuestions.appendChild(ulCreate);
        ulCreate.appendChild(listItem);
        listItem.addEventListener("click", (compare));
    })
}
// Event to compare choices with answers
function compare(event) {
    var element = event.target;
    if (element.matches("li")) {
        var createDiv = document.createElement("div");
        createDiv.setAttribute("id", "createDiv");
        // Shows correct answer
        if (element.textContent == questions[questionIndex].answer) {
            score++;
            createDiv.textContent = "Correct! The answer is:  " + questions[questionIndex].answer;
        } else {
            // Reduces time for wrong answers
            secondsLeft = secondsLeft - penalty;
            createDiv.textContent = "Wrong! The correct answer is:  " + questions[questionIndex].answer;
        }

    }
    // Determines which question user is on
    questionIndex++;

    if (questionIndex >= questions.length) {
        // This will append last page with user stats
        Kompleted();
        createDiv.textContent = "End of quiz!" + " " + "You got  " + score + "/" + questions.length + " Correct!";
    } else {
        render(questionIndex);
    }
    jsQuestions.appendChild(createDiv);

}
// This will append the last page
function Kompleted() {
    jsQuestions.innerHTML = "";
    clock.innerHTML = "";

    // Create h1
    var createH1 = document.createElement("h1");
    createH1.setAttribute("id", "createH1");
    createH1.textContent = "Quiz Komplete!"

    jsQuestions.appendChild(createH1);

    // Create a Paragraph
    var createP = document.createElement("p");
    createP.setAttribute("id", "createP");

    jsQuestions.appendChild(createP);

    // Calculates time left and replaces with score
    if (secondsLeft >= 0) {
        var timeRemaining = secondsLeft;
        var createP2 = document.createElement("p");
        clearInterval(holdInterval);
        createP.textContent = "Your final score is: " + timeRemaining;

        jsQuestions.appendChild(createP2);
    }else{

    createP.textContent ="YOU ARE BANISHED TO THE NETHERREALM!"
  
   

    }

    // Create a lable
    var createLabel = document.createElement("label");
    createLabel.setAttribute("id", "createLabel");
    createLabel.textContent = "Enter your initials: ";

    jsQuestions.appendChild(createLabel);

    // Creates user input
    var createInput = document.createElement("input");
    createInput.setAttribute("type", "text");
    createInput.setAttribute("id", "initials");
    createInput.textContent = "";

    jsQuestions.appendChild(createInput);

    // Create Submit button
    var createSubmit = document.createElement("button");
    createSubmit.setAttribute("type", "submit");
    createSubmit.setAttribute("id", "Submit");
    createSubmit.textContent = "Submit";

    jsQuestions.appendChild(createSubmit);

    // Saves data locally
    createSubmit.addEventListener("click", function () {
        var initials = createInput.value;

        if (initials === null) {

            console.log("No value entered!");

        } else {
            var finalScore = {
                initials: initials,
                score: timeRemaining
            }
            console.log(finalScore);
            var allScores = localStorage.getItem("allScores");
            if (allScores === null) {
                allScores = [];
            } else {
                allScores = JSON.parse(allScores);
            }
            allScores.push(finalScore);
            var newScore = JSON.stringify(allScores);
            localStorage.setItem("allScores", newScore);
            // Travels to high scores page
            window.location.replace("highscores.html");
        }
    });

}