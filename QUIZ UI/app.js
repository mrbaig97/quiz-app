// quiz constructor

function Quiz(questions) {
    this.score = 0;
    this.questions = questions;
    this.currentQuestionIndex = 0;
}

Quiz.prototype.guess = function(answer) {
    if(this.getCurrentQuestion().isCorrectAnswer(answer)) {
        this.score++;
    }
    this.currentQuestionIndex++;
};


Quiz.prototype.getCurrentQuestion = function() {
    return this.questions[this.currentQuestionIndex];
};

Quiz.prototype.hasEnded = function() {
    return this.currentQuestionIndex >= this.questions.length;
    
};

// Create Timer
var min =2;
var sec = 60;
min -= 1;

var minheading = document.getElementById('min')
var secheading = document.getElementById('sec')

minheading.innerHTML = min;

var interval;

function timer() {
    // msec--
    // msecheading.innerHTML = msec;
    // if (msec <= 0) {
    //     sec--;
    //     secheading.innerHTML = sec;
    //     msec = 100;
         sec--
        secheading.innerHTML  = sec;
      
        if(sec<=0){
            min--;
            minheading.innerHTML = min
            sec = 60; 
        }
     else if (min < 0) {
        reset();
        

    }
    
}

function start() {
    interval = setInterval(timer,900);
    // var start = document.getElementById('start') = true;
    
}


function pause() {
    clearInterval(interval)
    // var start = document.getElementById('start') = false;
}

function reset() {
    min = 00;
    sec = 00;
    minheading.innerHTML = min;
    secheading.innerHTML = sec;
    // var start = document.getElementById('start') = false;
    pause();
}


// question

function Question(text, choices, answer) {
    this.text = text;
    this.choices = choices;
    this.answer = answer;
    
    
}

Question.prototype.isCorrectAnswer = function (choice) {
    return this.answer === choice;
};

// quiz ui
start()
var QuizUI = {
    displayNext: function () {
        if (quiz.hasEnded(), min < 0) {
            
            this.displayScore()
            reset();
        }  
    {
            this.displayQuestion();
            this.displayChoices();
            this.displayProgress();
        }
    },
   displayQuestion: function() {
       
        this.populateIdWithHTML("question", quiz.getCurrentQuestion().text);
         
    },
   displayChoices: function() {
        var choices = quiz.getCurrentQuestion().choices;

        for(var i = 0; i < choices.length; i++) {
            this.populateIdWithHTML("choice" + i, choices[i]);
            this.guessHandler("guess" + i, choices[i]);
        }
    },
  
    displayScore: function() {
        var gameOverHTML = "<h1>Time Over</h1>";
        gameOverHTML += "<h2> Your score is: " + quiz.score + "</h2>";
        this.populateIdWithHTML("quiz", gameOverHTML);
    },
  
    populateIdWithHTML: function(id, text) {
        var element = document.getElementById(id);
        element.innerHTML = text;
    },
    
    guessHandler: function(id, guess) {
        var button = document.getElementById(id);
        button.onclick = function() {
            quiz.guess(guess);
            QuizUI.displayNext();
        }
    },
    
  displayProgress: function() {
        var currentQuestionNumber = quiz.currentQuestionIndex + 1;
        this.populateIdWithHTML("progress", "Question " + currentQuestionNumber + " of " + quiz.questions.length);
    }
};
    



//Create Questions
var questions = [
    new Question("Who was the first President of the United States?", [ "George Washington", "Thomas Jefferson",'Obama' ], "George Washington"),
    new Question('In which year of First World War Germany declared war on Russia and France?', ["1914","1915","1916",'1917'],'1914'),
    new Question("In a normal human body, the total number of red blood cells is?", [ "15 trillion", "20 trillion",'30 trillion'], "30 trillion"),
    new Question("How many times has Brazil won the World Cup Football Championship?", [ "Four times", "Twice",'Five times' ], "Five times"),
    new Question("If speed of rotation of the earth increases, weight of the body?", [ "Increase", "Remain unchanged",'Decreases' ], "Decreases"),
];

//Create Quiz
var quiz = new Quiz(questions);

//Display Quiz
QuizUI.displayNext();