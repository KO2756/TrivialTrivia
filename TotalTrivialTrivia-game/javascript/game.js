var triviaQuestions = [{
	question: "How many holes are there in a full round of golf?",
	answerList: ["9", "12", "18", "16"],
	answer: 2
},{
	question: "What is the regulation height for a basketball hoop?",
	answerList: ["8 feet", "11 feet", "9 feet", "10 feet"],
	answer: 3
},{
	question: "Where did the sport of curling originate?",
	answerList: ["USA", "Scotland", "Britain", "Germany"],
	answer: 1
},{
	question: "Tiger Woods became a professional golfer in what year?",
	answerList: ["1996", "2000", "1998", "1994"],
	answer: 0
},{
	question: "What year was the first Super Bowl played?",
	answerList: ["1961", "1970", "1965", "1967"],
	answer: 3
},{
	question: "How many soccer players should be on the field at the same time?",
	answerList: ["18", "12", "22", "16"],
	answer: 2
},{
	question: "In what year was the first modern Olympic Games held?",
	answerList: ["1870", "1896", "1800", "1776"],
	answer: 1
},{
	question: "What is the highest score possible in 10 pin bowling?",
	answerList: ["200", "275", "300", "250"],
	answer: 2
},{
	question: "What NFL Quarterback has been in the most Super Bowls?",
	answerList: ["Brett Favre", "Tom Brady", "Joe Montana", "Terry Bradshaw"],
	answer: 1
},{
	question: "What Football position shares its name with a way to score 2 points?",
	answerList: ["Kickoff", "Field goal", "First down", "Safety"],
	answer: 3
},{
	question: "Brazil was eliminated in the 2014 world cup by what team?",
	answerList: ["Germany", "Italy", "Mexico", "Britain"],
	answer: 0
},{
	question: "What is the nickname for Purdue's sports teams?",
	answerList: ["Trains", "Boilermakers", "Steam engines", "Cabooses"],
	answer: 1
},{
	question: "The Heisman Trophy is presented in which sport?",
	answerList: ["Basketball", "Baseball", "Soccer", "Football"],
	answer: 3
},{
	question: "In which sport are the terms ‘stale fish’ and ‘mulekick’ used?",
	answerList: ["Snowboarding", "Swimming", "Skiing", "Bobsledding"],
	answer: 0
},{
	question: "What basketball move was banned from 1967 to 1976?",
	answerList: ["Three pointer", "Layup", "Slam dunk", "Fade away"],
	answer: 2
}];

var gifArray = ['question1', 'question2', 'question3', 'question4', 'question5', 'question6', 'question7', 'question8', 'question9', 'question10', 'question11', 'question12', 'question13','question14','question15'];
var currentQuestion; var correctAnswer; var incorrectAnswer; var unanswered; var seconds; var time; var answered; var userSelect;
var messages = {
	correct: "Yes, that's right!",
	incorrect: "No, that's not it.",
	endTime: "Out of time!",
	finished: "Alright! Let's see how well you did."
}

$('#startBtn').on('click', function(){
	$(this).hide();
	newGame();
});

$('#startOverBtn').on('click', function(){
	$(this).hide();
	newGame();
});

function newGame(){
	$('#finalMessage').empty();
	$('#correctAnswers').empty();
	$('#incorrectAnswers').empty();
	$('#unanswered').empty();
	currentQuestion = 0;
	correctAnswer = 0;
	incorrectAnswer = 0;
	unanswered = 0;
	newQuestion();
}

function newQuestion(){
	$('#message').empty();
	$('#correctedAnswer').empty();
	$('#gif').empty();
	answered = true;
	
	//sets up new questions & answerList
	$('#currentQuestion').html('Question #'+(currentQuestion+1)+'/'+triviaQuestions.length);
	$('.question').html('<h2>' + triviaQuestions[currentQuestion].question + '</h2>');
	for(var i = 0; i < 4; i++){
		var choices = $('<div>');
		choices.text(triviaQuestions[currentQuestion].answerList[i]);
		choices.attr({'data-index': i });
		choices.addClass('thisChoice');
		$('.answerList').append(choices);
	}
	countdown();
	//clicking an answer will pause the time and setup answerPage
	$('.thisChoice').on('click',function(){
		userSelect = $(this).data('index');
		clearInterval(time);
		answerPage();
	});
}

function countdown(){
	seconds = 15;
	$('#timeLeft').html('<h3>Time Remaining: ' + seconds + '</h3>');
	answered = true;
	//sets timer to go down
	time = setInterval(showCountdown, 1000);
}

function showCountdown(){
	seconds--;
	$('#timeLeft').html('<h3>Time Remaining: ' + seconds + '</h3>');
	if(seconds < 1){
		clearInterval(time);
		answered = false;
		answerPage();
	}
}

function answerPage(){
	$('#currentQuestion').empty();
	$('.thisChoice').empty(); //Clears question page
	$('.question').empty();

	var rightAnswerText = triviaQuestions[currentQuestion].answerList[triviaQuestions[currentQuestion].answer];
	var rightAnswerIndex = triviaQuestions[currentQuestion].answer;
	$('#gif').html('<img src = "assets/images/'+ gifArray[currentQuestion] +'.gif" width = "400px">');
	//checks to see correct, incorrect, or unanswered
	if((userSelect == rightAnswerIndex) && (answered == true)){
		correctAnswer++;
		$('#message').html(messages.correct);
	} else if((userSelect != rightAnswerIndex) && (answered == true)){
		incorrectAnswer++;
		$('#message').html(messages.incorrect);
		$('#correctedAnswer').html('The correct answer was: ' + rightAnswerText);
	} else{
		unanswered++;
		$('#message').html(messages.endTime);
		$('#correctedAnswer').html('The correct answer was: ' + rightAnswerText);
		answered = true;
	}
	
	if(currentQuestion == (triviaQuestions.length-1)){
		setTimeout(scoreboard, 5000)
	} else{
		currentQuestion++;
		setTimeout(newQuestion, 5000);
	}	
}

function scoreboard(){
	$('#timeLeft').empty();
	$('#message').empty();
	$('#correctedAnswer').empty();
	$('#gif').empty();

	$('#finalMessage').html(messages.finished);
	$('#correctAnswers').html("Correct Answers: " + correctAnswer);
	$('#incorrectAnswers').html("Incorrect Answers: " + incorrectAnswer);
	$('#unanswered').html("Unanswered: " + unanswered);
	$('#startOverBtn').addClass('reset');
	$('#startOverBtn').show();
	$('#startOverBtn').html('Start Over?');
}