var currentQuestion = 0;
var score = 0;
var i=0;
var totQuestions = #{articles.length};

var container = document.getElementById('quizContainer');
var questiontext = document.getElementById('question');
var opt1 = document.getElementById('opt1');
var opt2 = document.getElementById('opt2');
var opt3 = document.getElementById('opt3');
var nextButton = document.getElementById('nextButton');
var previousButton = document.getElementById('previousButton');
var resultCont = document.getElementById('result');

function loadQuestion (i) {
	questiontext.textContent = (i + 1) + '. ' + #{ articles[i].title } ;
	opt1.textContent = #{articles[i].choice1};
	opt2.textContent = #{articles[i].choice2};
	opt3.textContent = #{articles[i].choice3};
};
function loadPreviousQuestion(){ 
	currentQuestion--; 
	loadQuestion(currentQuestion); 
	if(currentQuestion == totQuestions - 1){ 
		nextButton.textContent = 'Finish';
		} else{ 
		  nextButton.textContent = 'Next Question';
		  }; 
};﻿
function loadNextQuestion() {
	var selectedOption = document.querySelector('input[type=radio]:checked');
	if(!selectedOption){
		alert('Please select your Answer!');
		return;
	}
	var answer = selectedOption.value;
	if( #{articles[currentQuestion].answer} == answer){
		score+=10;
	}
	selectedOption.checked = false;
	currentQuestion++;
	if(currentQuestion == totQuestions - 1){
		nextButton.textContent = 'Submit';
	}
	if(currentQuestion == totQuestions){
		container.style.display = 'none';
		resultCont.style.display = '';
		resultCont.textContent = 'Your Score: ' + score;
		return; 
	}
	loadQuestion(currentQuestion);
}
loadQuestion(currentQuestion);
