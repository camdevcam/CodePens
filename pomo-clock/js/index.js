(function() {
    var buzzer = document.getElementById("buzzer")
    countH2 = document.getElementById("num"),
        count = parseInt(countH2.textContent, 10),
        breakTimeH2 = document.getElementById("breakNum"),
        breakTime = parseInt(breakTimeH2.textContent, 10),
        reset = document.getElementById("reset"),
        start = document.getElementById("start"),
        add5Clock = document.getElementById("add5Clock"),
        minus5Clock = document.getElementById("minus5Clock"),
        add5Break = document.getElementById("add5Break"),
        minus5Break = document.getElementById("minus5Break"),
        timeDiv = document.getElementById("timeDiv"),
        breakDiv = document.getElementById("breakDiv"),
        timeType = document.getElementById("timeType"),
        title1 = document.getElementById("title1"),
        title2 = document.getElementById("title2"),
        num = document.getElementById("num"),
        interval = 30,
        counter = null,
        startBreak = null;

    reset.style.display = 'none';

    add5Clock.addEventListener("click", (e) => {
        count += 5;
        countH2.textContent = count;
    });

    minus5Clock.addEventListener("click", (e) => {
        if (count > 5) {
            count -= 5;
            countH2.textContent = count;
        }
    });
    add5Break.addEventListener("click", (e) => {
        breakTime += 5;
        breakTimeH2.textContent = breakTime;
    });
    minus5Break.addEventListener("click", (e) => {
        if (breakTime > 5) {
            breakTime -= 5;
            breakTimeH2.textContent = breakTime;
        }
    });
    start.addEventListener("click", (e) => {
        counter = setInterval(timer, interval);
        count *= 60;
        breakTime *= 60;
    });

    function timer() {
        start.style.display = "none";
        minus5Clock.style.display = "none";
        add5Clock.style.display = "none";
        minus5Break.style.display = "none";
        add5Break.style.display = "none";
        breakNum.style.display = "none";
        title1.style.display = "none";
        title2.style.display = "none";
        timeType.textContent = "Session Time:";
        count--;
        if (count === 0) {
            buzzer.play();
            clearInterval(counter);
            timeType.textContent = "Break Time:";
            breakNum.style.display = "";
            num.style.display = "none";
            num.textContent = "";
            breakNum.style.display = "";
            startBreak = setInterval(breakTimer, interval);
        }
        if ((count % 60) >= 10) {
            num.textContent = Math.floor(count / 60) + ":" + count % 60;
        } else {
            num.textContent = Math.floor(count / 60) + ":" + "0" + count % 60;
        }
    }

    function breakTimer() {
        breakTime--;
        if (breakTime === 0) {
            clearInterval(startBreak);
            buzzer.play();
            reset.style.display = '';
            timeType.style.display = "none";
            breakNum.style.display = "none";
        }
        if ((breakTime % 60) >= 10) {
            breakNum.textContent = Math.floor(breakTime / 60) + ":" + breakTime % 60;
        } else {
            breakNum.textContent = Math.floor(breakTime / 60) + ":" + "0" + breakTime % 60;
        }
    }
})();