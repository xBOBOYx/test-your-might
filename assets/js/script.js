	var countdown = document.querySelector("#clock");
	var timer = document.querySelector("#startClock");
	var kombatBox = document.querySelector("#kombatBox");
	
	var secondsLeft = 100;
	var holdInterval = 0;
	var penalty = 10;
	
	timer.addEventListener("click", function () {
	
	if (holdInterval === 0) {
	holdInterval = setInterval(function () {
	secondsLeft--;
	clock.textContent = "Time: " + secondsLeft;
	
	if (secondsLeft <= 0) {
	clearInterval(holdInterval);
	allDone();
	clock.textContent = "Time's up!";
	}
	}, 1000);
	}
	});
	
	