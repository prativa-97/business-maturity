var userListData = [];
var currentQuestion = 0;
var currentIndex= 0;
var score = [];
for(var i=0; i< totQuestions;i++)
 score[i]=-1;
var totQuestions;
var j=0;

var results= [];
var svendor=0;
var tvendor=0;
var spurchase=0;
var tpurchase=0;
var sfinances=0;
var tfinances=0;
var serp=0;
var terp=0;
var sp2p=0;

var container = document.getElementById('quizContainer');
var questiontext = document.getElementById('question');
var opt1 = document.getElementById('opt1');
var opt2 = document.getElementById('opt2');
var opt3 = document.getElementById('opt3');
var nextSection = document.getElementById('nextSection');
var nextButton = document.getElementById('nextButton');
var resultCont = document.getElementById('result');
var radio3= document.getElementById('radio3');
var c3 = document.getElementById('c3');

$(document).ready(function() {
    $.getJSON( 'category2/data', function( data ) {
        userListData=data;
        totQuestions=userListData.length;
        loadQuestion(userListData[0]._id);
    });
    $("#nextButton").click(function(event){
              loadNextQuestion();
            });
    $("#nextSection").click(function(event){
            submitAnswers();
            updateuserdata();
    });
});
function loadQuestion (ArticleID) {
    for (var i = 0; i < userListData.length; i++) {
        if(userListData[i]._id == ArticleID)
        {
            console.log(userListData[i])
            nextSection.style.display='none';
            questiontext.textContent = (i + 1) + '. ' + userListData[i].title;
            opt1.textContent = userListData[i].choice1.title;
            opt2.textContent = userListData[i].choice2.title;
            if(userListData[i].choice3.weight == -1)
            {
                c3.style.display='none';
                radio3.style.display='none';
                opt3.textContent='';
            }
            else
            {
                radio3.style.display='block';
                opt3.textContent = userListData[i].choice3.title;
            }
            currentIndex=i;
        }
    }
};
function loadNextQuestion(){
    var selectedOption = document.querySelector('input[type=radio]:checked');
    if(!selectedOption){
        alert('Please select your Answer!');
        return;
    }
    var answer = selectedOption.value;
    selectedOption.checked=false;
    if(answer == 1){
        score[currentIndex]=userListData[currentIndex].choice1.weight;
        if(userListData[currentIndex].choice1.next_id == "-1")
            currentIndex=totQuestions;
        else
            currentQuestion=userListData[currentIndex].choice1.next_id;
    }
    if(answer == 2){
        score[currentIndex]=userListData[currentIndex].choice2.weight;
        if(userListData[currentIndex].choice2.next_id == "-1")
            currentIndex=totQuestions;
        else
            currentQuestion=userListData[currentIndex].choice2.next_id;
    }
    if(answer == 3){
        score[currentIndex]=userListData[currentIndex].choice3.weight;
        if(userListData[currentIndex].choice3.next_id == "-1")
            currentIndex=totQuestions;
        else
            currentQuestion=userListData[currentIndex].choice3.next_id;
    }
    if(currentIndex == totQuestions){
        container.style.display = 'none';
        resultCont.style.display = 'block';
        nextSection.style.display = 'block';
        resultCont.textContent = 'Billing assessment completed | Click Submit to proceed to the Next Section.';
        return; 
    }
    loadQuestion(currentQuestion);
};
function submitAnswers(){
    var newData = {
    result: []
    };

    for(var i in score) {    

        var item = userListData[i];   

        newData.result.push({ 
            "category" : item.category,
            "section"  : item.section,
            "question_weight" : item.weight,
            "question_title" : item.title,
            "answer_weight" : score[i]
        });
    }
    $.ajax({
        type: "POST",
        url: "http://localhost:3000/assessment/ordertocash/billing",
            data: JSON.stringify(newData.result),
            contentType: 'application/json',
            success: function(data){
                console.log('success');
            }
    });
}
function updateuserdata(){
    $.getJSON('http://localhost:3000/assessment/results/data', function( data ) {
        console.log(data);
        for(var i in data) {
            if(data[i].section == "Credit Analysis")
            {
            svendor=svendor+(data[i].question.weight*data[i].answer);
            tvendor=tvendor+data[i].question.weight;
            }
            if(data[i].section == "Billing")
            {
            spurchase=spurchase+(data[i].question.weight*data[i].answer);
            tpurchase=tpurchase+data[i].question.weight;
            }
            if(data[i].section == "Cash Application & Collection")
            {
            sfinances=sfinances+(data[i].question.weight*data[i].answer);
            tfinances=tfinances+data[i].question.weight;
            }
            if(data[i].section == "GL Posting & Reporting")
            {
            serp=serp+(data[i].question.weight*data[i].answer);
            terp=terp+data[i].question.weight;
            }
        };
        if (tvendor!=0)
            svendor=(svendor/tvendor)*10;
        if (tpurchase!=0)
            spurchase=(spurchase/tpurchase)*10;
        if (tfinances!=0)
            sfinances=(sfinances/tfinances)*10;
        if (terp!=0)
            serp=(serp/terp)*10;
        sp2p=(svendor+spurchase+sfinances+serp)/4;
        submitAnswerstoUserData();
    });
}
function submitAnswerstoUserData(){
    var sendInfo = {
        billing: spurchase,
        creditanalysis: svendor,
        cashapplication: sfinances,
        glposting: serp,
        score: sp2p
    };
    console.log(sendInfo);
    $.ajax({
        type: "POST",
        url: "http://localhost:3000/assessment/results/o2c",
            data: JSON.stringify(sendInfo),
            contentType: 'application/json',
            success: function(data){
                console.log('success');
            }
    });
}