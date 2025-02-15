type QuizItem = {
  url: string;
  question: string;
  choices: Choices;
  answer: string | boolean | number;
};

type Choices = string[] | boolean[] | number[];

const mediumQuestions: QuizItem[] = [
  {
    url: "https://cdn.playbuzz.com/cdn//f063e8fe-ad57-485e-8211-ed2ee0d9a205/4a864049-816a-479e-8736-51740e8b724b.jpg",
    question: "Which ocean lies on the east coast of the United States?",
    choices: ["Eastern", "Pacific", "Indian", "Atlantic"],
    answer: "Atlantic",
  },
  {
    url: "https://cdn.playbuzz.com/cdn//f063e8fe-ad57-485e-8211-ed2ee0d9a205/4d101ba1-9275-4fb5-ba2c-5606e6c0274e.jpg",
    question: "Which is the world's highest mountain?",
    choices: ["K2", "Makalu", "Mount Everest", "Kilimanjaro"],
    answer: "Mount Everest",
  },
  {
    url: "https://cdn.playbuzz.com/cdn//f063e8fe-ad57-485e-8211-ed2ee0d9a205/07121a24-b34b-4711-9bfa-5287163e65ce.jpg",
    question: "Which of these cities is not in Europe?",
    choices: ["Prague", "Moscow", "Barcelona", "Reykjavik"],
    answer: "Moscow",
  },
  {
    url: "https://cdn.playbuzz.com/cdn//f063e8fe-ad57-485e-8211-ed2ee0d9a205/467a486b-be3a-4183-90ed-dd6867d5852d.jpg",
    question: "True or False: Iceland is covered in ice.",
    choices: [true, false],
    answer: false,
  },
  {
    url: "https://cdn.playbuzz.com/cdn//f063e8fe-ad57-485e-8211-ed2ee0d9a205/ecf8af7b-8541-4572-b63b-ee7d7f9fc4cc.jpg",
    question: "The United Kingdom is comprised of how many countries?",
    choices: [1, 2, 3, 4],
    answer: 4,
  },
  {
    url: "https://cdn.playbuzz.com/cdn//f063e8fe-ad57-485e-8211-ed2ee0d9a205/ecf8af7b-8541-4572-b63b-ee7d7f9fc4cc.jpg",
    question: "Which of the following countries do not border France?",
    choices: ["Germany", "Netherlands", "Spain", "Italy"],
    answer: "Netherlands",
  },
  {
    url: "https://cdn.playbuzz.com/cdn//f063e8fe-ad57-485e-8211-ed2ee0d9a205/6e99b817-7be7-4f8a-9146-3f602ac81fad.jpg",
    question: "Which U.S. state is the Grand Canyon located in?",
    choices: ["Wyoming", "Arizona", "New Mexico", "Nevada"],
    answer: "Arizona",
  },
  {
    url: "https://cdn.playbuzz.com/cdn//f063e8fe-ad57-485e-8211-ed2ee0d9a205/866f119d-e5e2-45ca-846c-b6d10a59d1e4.jpg",
    question: "Which is the smallest country, measured by total land area?",
    choices: ["Maldives", "Monaco", "Vatican"],
    answer: "Vatican",
  },
  {
    url: "https://cdn.playbuzz.com/cdn//f063e8fe-ad57-485e-8211-ed2ee0d9a205/13efaf72-d695-4f65-b043-2b805b6a88eb.jpg",
    question: "Which is the longest river in the world?",
    choices: ["Amazon River", "Congo River", "Yellow River", "Nile River"],
    answer: "Nile River",
  },
  {
    url: "https://cdn.playbuzz.com/cdn//f063e8fe-ad57-485e-8211-ed2ee0d9a205/1226f177-dc1a-4142-8875-bdaa177717d7.jpg",
    question: "Which is the largest body of water?",
    choices: ["indian Ocean", "Pacific Ocean", "Atlantic Ocean", "Nile River"],
    answer: "Pacific Ocean",
  },
];
console.log(mediumQuestions.length);

// div aus html ziehen
const contentElement = document.querySelector("#content");
const evaluationElement = document.querySelector("#evaluation");

//Var for all right Answers and allClickedAnswers
let allCorrectAnswers: string[] = [];
let allClickedAnswers: string[] = [];

function createDomQuizElements() {
  mediumQuestions.forEach((question) => {
    if (contentElement) {
      //Var for all Buttons per Question
      const allButtonsPerQuestion: HTMLButtonElement[] = [];
      //create Element
      const containerDiv = document.createElement("div");
      const imgElement = document.createElement("img");
      const questionElement = document.createElement("p");
      const buttonDivElement = document.createElement("div");
      //put them in place
      contentElement.appendChild(containerDiv);
      containerDiv.appendChild(imgElement);
      containerDiv.appendChild(questionElement);
      containerDiv.appendChild(buttonDivElement);

      //create buttons for each Choice + placement + content + style
      question.choices.forEach((choice) => {
        const buttonChoiceElement = document.createElement("button");
        buttonDivElement.appendChild(buttonChoiceElement);
        buttonChoiceElement.textContent = choice.toString();
        buttonChoiceElement.className = "flex-1 p-2 bg-red-300";

        //push buttons into Array
        allButtonsPerQuestion.push(buttonChoiceElement);

        //Eventlistener Buttons
        buttonChoiceElement.addEventListener("click", () => {
          checkAnswer(choice, question, buttonChoiceElement);
          console.log(allClickedAnswers.length);
          //disable buttons once one is clicked
          allButtonsPerQuestion.forEach((button) => {
            button.disabled = true;
          });
        });
      });

      //fill elements with content
      imgElement.setAttribute("src", question.url);
      questionElement.textContent = question.question;
      //style elements
      contentElement.className =
        "flex flex-col gap-20 my-10 items-center w-140 mx-auto";
      questionElement.className = "text-center my-3 p-5 bg-red-100";
      buttonDivElement.className = "flex gap-5";
    }
  });
}
createDomQuizElements();

//Eventlistener, zum Checken ob Antworten richtig sind
function checkAnswer(
  choice: string | number | boolean,
  question: QuizItem,
  button: HTMLButtonElement
) {
  const correctAnswer = question.choices.find((choice) => {
    return choice === question.answer;
  });
  if (correctAnswer?.toString() === choice.toString()) {
    button.className = "flex-1 p-2 bg-green-300";
    allCorrectAnswers.push(choice.toString());
    allClickedAnswers.push(choice.toString());
  } else {
    button.className = "flex-1 p-2 bg-red-500";
    allClickedAnswers.push(choice.toString());
  }
}

//Evaluation
function renderEvaluationElements() {
  if (evaluationElement) {
    const scoreButton = document.createElement("button");

    evaluationElement.appendChild(scoreButton);

    scoreButton.textContent = "Check your score!";

    evaluationElement.className =
      "flex my-10 justify-center gap-5 w-140 mx-auto";
    scoreButton.className = "p-2 bg-yellow-100 flex-1";

    //Eventlistener
    //! Diese Version geht nicht--> wird die Länge der Arrays miteinander verglichen-->Why?
    // if (allClickedAnswers.length === mediumQuestions.length) {
    //   scoreButton.addEventListener("click", () => {
    //     scoreButton.remove();
    //     showScore();
    //     const againButton = document.createElement("button");
    //     evaluationElement.appendChild(againButton);
    //     againButton.className = "p-2 bg-yellow-100 flex-1";
    //     againButton.textContent = "Play Again!"
  
    //     //Play Again Eventlistener
    //     againButton.addEventListener("click", ()=> {
    //       if (contentElement && evaluationElement) {
    //         contentElement.innerHTML = "";
    //         evaluationElement.innerHTML = "";
    //       }
    //       scoreButton.disabled = false;
    //       allCorrectAnswers = []
    //       createDomQuizElements();
    //       renderEvaluationElements();
    //     })
    //   });
    // } else {
    //   scoreButton.disabled = true; 
    //   //!auf Button anzeigen lassen, dasss noch Antowrten fehlen
    // }

    //! Weitere version aber klappt auch nicht
    // if (allClickedAnswers.length !== mediumQuestions.length) {
    //   scoreButton.disabled = true;
    // } else {
    //   scoreButton.disabled !== true;
    // }
    scoreButton.addEventListener("click", () => {
      console.log(allClickedAnswers);
      console.log(mediumQuestions);
      scoreButton.remove();
      showScore();
      const againButton = document.createElement("button");
      evaluationElement.appendChild(againButton);
      againButton.className = "p-2 bg-yellow-100 flex-1";
      againButton.textContent = "Play Again!"

      //Play Again Eventlistener
      againButton.addEventListener("click", ()=> {
        if (contentElement && evaluationElement) {
          contentElement.innerHTML = "";
          evaluationElement.innerHTML = "";
          allClickedAnswers = [];
        }
        allCorrectAnswers = []
        createDomQuizElements();
        renderEvaluationElements();
      })
    });
  }
}
renderEvaluationElements();

//show Score (used in 161)
function showScore() {
  if (evaluationElement) {
    const scoreResultElement = document.createElement("p");
    evaluationElement.appendChild(scoreResultElement);

    //Styling depending on scoring
    if (allCorrectAnswers.length === mediumQuestions.length) {
      scoreResultElement.textContent = `${allCorrectAnswers.length}/10.You're the best`;
      scoreResultElement.className = "flex-1 bg-green-400 text-center p-2";
    } else if (
      allCorrectAnswers.length >= Math.floor(0.75 * mediumQuestions.length) &&
      allCorrectAnswers.length < mediumQuestions.length
    ) {
      scoreResultElement.textContent = `${allCorrectAnswers.length}/10. Pretty good!`;
      scoreResultElement.className = "flex-1 bg-green-300 text-center p-2";
    } else if (
      allCorrectAnswers.length >= Math.floor(0.5 * mediumQuestions.length) &&
      allCorrectAnswers.length < Math.floor(0.75 * mediumQuestions.length)
    ) {
      scoreResultElement.textContent = `${allCorrectAnswers.length}/10. It could be better!`;
      scoreResultElement.className = "flex-1 bg-green-200 text-center p-2";
    } else if (
      allCorrectAnswers.length >= Math.floor(0.25 * mediumQuestions.length) &&
      allCorrectAnswers.length < Math.floor(0.5 * mediumQuestions.length)
    ) {
      scoreResultElement.textContent = `${allCorrectAnswers.length}/10. Try Again!`;
      scoreResultElement.className = "flex-1 bg-red-200 text-center p-2";
    } else if (
      allCorrectAnswers.length >= Math.floor(0.1 * mediumQuestions.length) &&
      allCorrectAnswers.length < Math.floor(0.25 * mediumQuestions.length)
    ) {
      scoreResultElement.textContent = "Oh no! Study more!";
      scoreResultElement.className = "flex-1 bg-red-300 text-center p-2";
    } else if (allCorrectAnswers.length === 0) {
      scoreResultElement.textContent = `${allCorrectAnswers.length}/10. This is hopeless!`;
      scoreResultElement.className = "flex-1 bg-red-400 text-center p-2";
    }
  }
}
