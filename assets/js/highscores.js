var highScore = document.querySelector("#highScore");
var clearbtn = document.querySelector("#clearData");
var Backbtn = document.querySelector("#Back");

// Clear scores 
clearbtn.addEventListener("click", function () {
    localStorage.clear();
    location.reload();
});
// Retreives local storage data
var allScores = localStorage.getItem("allScores");
allScores = JSON.parse(allScores);

if (allScores !== null) {

    for (var i = 0; i < allScores.length; i++) {

        var createLi = document.createElement("li");
        createLi.textContent = allScores[i].initials + " " + allScores[i].score;
        highScore.appendChild(createLi);
    }
}
// Back to home
Back.addEventListener("click", function () {
    window.location.replace("./index.html");
});