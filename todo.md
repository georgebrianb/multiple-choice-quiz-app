### Done
- added toggle to green/to normal for each choice
- added array to add each choice when clicked/the choice is removed if clicked again
- added function to change innerText from submit to 'next question'
- check answerArray with answer for that question
- toggle red on answers that were wrong
- toggle green on answers that were right
- when "next question" is clicked:
  - reset color of each choice to default (untoggle green if toggled)
  - give new question + new choices
  - add points to total if that's the case (this happens with the submit button)

- when submit is being clicked:
  - check if there are any other questions left in the list

- add button at the end page - "Your Questions"
	  - if no more questions left:
		  no more "next question" button
      add "finish quiz" button/redirect user to end page 
- Store user's answers in an array (localstorage):
  HERE!!!!
  - Added the questionindex + answers as an object to an array, but I cannot use JSON stringfy on it
  Store right answers for the index of each question?

#### "Your Questions"
- styled the Questions
- added accordion style
- added 3 buttons for home, quiz results and start a new quiz


### Todo







#### Your questions/answers page

HOWTO:
- Everytime an answer has been submitted:
  save the answersArray alongside an index of the question, as an object/array
- When rendering use the following snippet and modify it to return an object that looks exactly
  like the question + answers during the game:

```
const highScoresList = document.getElementById('highScoresList');
const highScores = JSON.parse(localStorage.getItem('highScores')) || [];

highScoresList.innerHTML = 
highScores.map(score => {
    return `<li class="high-score">${score.name} - ${score.score}</li>`;
}).join("");
```
- also take notice of the classes of each answers (to properly display them)
- have the questions served by an api like: http://url/questions/<int:number_of_question>
- have the index of the number in the response as well
- when displaying the results, take the stored user answers and grab the questions via the API by their index



- render stored answers dynamically on the page in accordion style (css and html for accordion is written)
- find a better style for buttons
- When aligning questions text as "justify" add space between "+" sign and the question text (can't figure this one out)










## Resources
- original tut:
https://github.com/jamesqquick/Build-A-Quiz-App-With-HTML-CSS-and-JavaScript

- accordion style: 
https://wpbeaches.com/create-expandcollapse-faq-accordion-collapse-click/?__cf_chl_managed_tk__=pmd_q_MNP.8Km7.1oeRdGR8IRO3NGwn7.RFCyoLJsp91KXo-1632645444-0-gqNtZGzNAuWjcnBszRKR

