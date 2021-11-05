const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName('choice-text'));
const questionCounterText = document.getElementById('questionCounter');
const scoreText = document.getElementById('score');
let userAnswersArray = JSON.parse(localStorage.getItem("userAnswersArray")) || [];

let submit = document.getElementById("submit-button");
let nextBtn = document.getElementById("next-button");
let currentAnswerArray = [];


let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0; 
let availableQuestions = []; 


let questions = [];


//  Category picker
const loader = document.getElementById('loader');
const game = document.getElementById('game');
const categories = document.getElementById('categories');
const levels = document.getElementById('levels')
const categoryCont = document.getElementById('category-cont');
console.log(categories.value);

var categoryListObject;
let categoryPicked;


let url = "http://192.168.26.134:8001/categories";

async function fetchCategories() {
    try {
        let response = await fetch(url);
        return await response.json();
    } catch (error) {
        console.log(error);
    }
}



async function renderCategories() {
    let response = await fetchCategories();
    let html = '';
    response.categories.forEach(category => {
        let htmlSegment = `<option value="${category}">${category}</option>`;
        html += htmlSegment;
    });
    categories.innerHTML = html;
}

renderCategories();

test = (e) => {
    ;
}

// Dark Mode switch
const toggleSwitch = document.querySelector('.theme-switch input[type="checkbox"]');

function switchTheme(e) {
    if (e.target.checked) {
        document.documentElement.setAttribute('data-theme', 'dark');
    }
    else {
        document.documentElement.setAttribute('data-theme', 'light');
    }    
}

toggleSwitch.addEventListener('change', switchTheme, false);

/////////////////////////






// categories.innerHTML = 
// categoryList.map(category => {
//     return `<option value="${category}">${category}</option>`
// })

let qCount;
let MAX_QUESTIONS;




// category picking

pickCategory = () => {
    categoryCont.classList.add('hidden')
    loader.classList.remove('hidden')

    categoryPicked = categories.value;
    
    fetch(`http://192.168.26.134:8001/${categoryPicked}`)
        .then( res => {
            return res.json();
        })
        .then( loadedQuestions => {
            qCount = loadedQuestions.questions.Count;
            questions = loadedQuestions.questions.Items.map( loadedQuestion => {
                const formattedQuestion = {
                    question: loadedQuestion.text
                };
                
                const answerChoices = [... loadedQuestion.all_answers];
                answerChoices.forEach((choice, index) => {
                    formattedQuestion["choice" + (index + 1)] = choice;
                })
                formattedQuestion['answer'] = loadedQuestion.correct_answers;
                return formattedQuestion;
            });
            startGame(qCount);
        })
        .catch( err => {
            console.log(err);
        });
}

//Constants

const CORRECT_BONUS = 1;


startGame = (q) => {
    MAX_QUESTIONS = q;
    userAnswersArray = [];
    localStorage.setItem('userAnswersArray', JSON.stringify(userAnswersArray));
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions];
    getNewQuestion();
    loader.classList.add('hidden')
    game.classList.remove('hidden')
}


getNewQuestion = () => {
    if (questionCounter >= MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score);
        
        //go to the end page
        return window.location.assign("/end.html");
    }
    currentAnswerArray.length = 0;
    questionCounterText.innerText = `${questionCounter+1}/${MAX_QUESTIONS}`;
    currentQuestion = availableQuestions[questionCounter];
    question.innerText = currentQuestion.question;

    choices.forEach(choice => {
        const number = choice.dataset['number'];
        choice.innerText = currentQuestion['choice' + number];
    });

    acceptingAnswers = true;
    submit.innerHTML = "Submit";
};


choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!acceptingAnswers) return;
        e.target.classList.toggle("correct")
        
        const selectedChoice = e.target;
    });
    choice.onclick = e => {
        const selectedChoice = e.target;
        const selectedAnswerNumber = parseInt(selectedChoice.dataset['number']);

        if(currentAnswerArray.includes(selectedChoice)){
            indexOfSelectedAnswer = currentAnswerArray.indexOf(selectedChoice);
            currentAnswerArray.splice(indexOfSelectedAnswer, 1);
        } else {
            currentAnswerArray.push(selectedChoice);
        }
    }
});



// function to sort and check if elements of two arrays (int) are the same
const isEqual = (a, b) => JSON.stringify(a.sort()) === JSON.stringify(b.sort());




submit.onclick = e => {
    let correctAnswers = currentQuestion.answer;
    
    let answerNumbers = currentAnswerArray.map(elem => parseInt(elem.dataset['number']));
    
    let isQuestionCorrect;

    if (isEqual(answerNumbers, correctAnswers)) {
        incrementScore(CORRECT_BONUS);
        isQuestionCorrect = true;
    } else {
        choices.forEach(choice => {
            if (choice.classList.contains("correct") && !correctAnswers.includes(parseInt(choice.dataset['number']))){
                choice.classList.add("incorrect");
                choice.classList.remove("correct");
            } else if (!choice.classList.contains("correct") && correctAnswers.includes(parseInt(choice.dataset['number']))){
                choice.classList.add("correct");
            }
        });
        isQuestionCorrect = false;
    }

    userAnswersArray.push({[questionCounter]: [answerNumbers], "correct": isQuestionCorrect});

    submit.style.visibility = "hidden";
    nextBtn.style.visibility = "visible";
    acceptingAnswers = false;
    questionCounter++;
    if (questionCounter >= MAX_QUESTIONS) {
        nextBtn.innerHTML = 'Finish Quiz';
    }

    localStorage.setItem('userAnswersArray', JSON.stringify(userAnswersArray));
    
    // debugging
    console.log("typeof answerNumbers --> ", typeof(answerNumbers));
    console.log("answerNumbers", answerNumbers); 
    console.log("typeof userAnswersArray --> ", typeof(userAnswersArray));
    console.log("userAnswersArray --> ", userAnswersArray);
    console.log("userAnswersArray stringified --> ", JSON.stringify(userAnswersArray));
}


nextBtn.onclick = e => {
    submit.style.visibility = "visible";
    nextBtn.style.visibility = "hidden";
    choices.forEach(choice => {
        choice.className = "choice-text";
    })
    getNewQuestion();
    
}

incrementScore = num => {
    score += num;
    scoreText.innerText = score;
}







