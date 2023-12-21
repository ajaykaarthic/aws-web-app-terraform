document.addEventListener('DOMContentLoaded', function() {

    var questions = [
        "Are you a student?",
        "Are you a low income person?",
        "Do you have a special code?"
    ];
    
    var offers = [
        "Because you're a student, you qualify for $100 off your purchase! ",
        "Because you're a low-income person, you qualify for $100 off your purchase! ",
        "Because you have a special code, you qualify for a free gift with your purchase! "
    ];
    
    var currentQuestion = 0;
    var startTime;
    var qualification = [];
    
    document.getElementById("question").innerText = questions[currentQuestion];
    
    document.getElementById("next").addEventListener("click", function() {
        var answer = document.querySelector('input[name="answer"]:checked');
        if (answer) {
            qualification.push(answer.value);
            currentQuestion++;
            if (currentQuestion < questions.length) {
                document.getElementById("question").innerText = questions[currentQuestion];
                document.getElementById("answers").reset();
            } else {
                showResult();
            }
        } else {
            alert("Please select an answer.");
        }
    });
    
    document.getElementById("skip").addEventListener("click", function() {
        qualification.push("No");
        currentQuestion++;
        if (currentQuestion < questions.length) {
            document.getElementById("question").innerText = questions[currentQuestion];
            document.getElementById("answers").reset();
        } else {
            showResult();
        }
    });
    
    function showResult() {
        var endTime = new Date();
        var timeSpent = (endTime - startTime) / 1000;
        document.getElementById("timeSpent").innerText = timeSpent + " seconds";
    
        var qualificationText = "You answered as follows:\n\n";
        for (var i = 0; i < questions.length; i++) {
            qualificationText += questions[i] + ": " + qualification[i] + "\n";
        }
        document.getElementById("qualification").innerText = qualificationText;
    
        var offer = offers.find(function(offer, index) {
            return qualification.every(function(answer, i) {
                return answer === "Yes" || index !== i;
            });
        });
        document.getElementById("offer").innerText = offer + '\nContact (469) 234-2323 to claim your promo';
    
        document.getElementById("questionContainer").style.display = "none";
        document.getElementById("resultContainer").style.display = "block";
    }
    
    startTime = new Date();    
});