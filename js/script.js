// declaração de variaveis
const question = document.querySelector("#question")
const answersBox = document.querySelector("#answers-box")
const quizzContainer = document.querySelector("#quizz-container")
const scoreContainer = document.querySelector("#score-container")
const letters = ["a", "b", "c", "d"]
let points = 0
let actualQuestion = 0

//perguntas
const questions = [
    {
        "question": "Qual é a forma correta de declarar uma variável em JavaScript?",
        "answers": [
            {
                "answer": "var myVar",
                "correct": false
            },
            {
                "answer": "variable myVar",
                "correct": false
            },
            {
                "answer": "let myVar",
                "correct": true
            },
            {
                "answer": "const myVar",
                "correct": false
            }
        ]
    },
    {
        "question": "Qual método é usado para adicionar um elemento ao final de um array em JavaScript?",
        "answers": [
            {
                "answer": "push()",
                "correct": true
            },
            {
                "answer": "pop()",
                "correct": false
            },
            {
                "answer": "concat()",
                "correct": false
            },
            {
                "answer": "shift()",
                "correct": false
            }
        ]
    },
    {
        "question": "Qual é a sintaxe correta para escrever um comentário de linha única em JavaScript?",
        "answers": [
            {
                "answer": "/* Este é um comentário */",
                "correct": false
            },
            {
                "answer": "// Este é um comentário",
                "correct": true
            },
            {
                "answer": "<!-- Este é um comentário -->",
                "correct": false
            },
            {
                "answer": "** Este é um comentário **",
                "correct": false
            }
        ]
    }
]

//Substituição do quizz para a primeira pergunta

function init() {
    //criar a primeira pergunta
    console.log("iniciou")
    createQuestion(0)
}

//cria uma pergunta
function createQuestion(i) {

    //limpar a questão anterior
    const oldButtons = answersBox.querySelectorAll("button")
    
    oldButtons.forEach(function(btn) {
        btn.remove()
    })

    //alterar o texto da pergunta

    const questionText = question.querySelector("#question-text")
    const questionNumber = question.querySelector("#question-number")

    questionText.textContent = questions[i].question;
    questionNumber.textContent = i + 1

    //insere as alternativas

    questions[i].answers.forEach(function(answer, i) {
        
        //Cria o tamplate do botão quizz
        const answerTemplate = document.querySelector(".answer-template").cloneNode(true)

        const letterBtn = answerTemplate.querySelector(".btn-letter")
        const answerText = answerTemplate.querySelector(".question-answer")

        letterBtn.textContent = letters[i]
        answerText.textContent = answer['answer'] /*o que o curso ensinou*/
        //answerText.textContent = answer.answer /*Solução do GPT*/

        answerTemplate.setAttribute("correct-answer", answer["correct"]) /*o que o curso ensinou*/
        //answerTemplate.setAttribute("correct-answer", answer.correct) /*Solução do GPT*/

        //remover hide e template class

        answerTemplate.classList.remove("hide")
        answerTemplate.classList.remove("answer-template")

        //inserir a alternativa na tela
        answersBox.appendChild(answerTemplate)

        //inserir um evento de clique no botão
        answerTemplate.addEventListener("click", function() {
            checkAnswer(this)
            console.log(this)
        })
    })

    //incrementar o numero da questão
    actualQuestion++

}

// Verificando a resposta do usuário



function checkAnswer(btn) {

    const buttons = answersBox.querySelectorAll("button")

    // Verifica se a resposta está correta e adiciona classes nos botões
    buttons.forEach(function(button) {

        if(button.getAttribute("correct-answer") === "true") {

            button.classList.add("correct-answer")

            //checar se o usuario acertou a pergunta
            if(btn === button) {

                points++
            }

        } else {

            button.classList.add("wrong-answer")

        }
    })

    //exibir próxima pergunta
    nextQuestion()

}

function nextQuestion() {
    setTimeout(function(){
        if(actualQuestion < questions.length) {
            createQuestion(actualQuestion)
                     
        } else {
            showSuccessMessage()
            return
        }

        

    }, 1000)
}
//exibe a tela final

function showSuccessMessage() {
    hideOrShowQuizz()    
    
    const score = ((points / questions.length) *100).toFixed(2)

    const displayScore = document.querySelector("#display-score span")

    displayScore.textContent = score.toString()

    const correctAnswers = document.querySelector("#correct-answers")
    correctAnswers.textContent = points

    const totalQuestions = document.querySelector("#question-qty")
    totalQuestions.textContent = questions.length
}

function hideOrShowQuizz() {
    
    quizzContainer.classList.toggle("hide")
    scoreContainer.classList.toggle("hide")

}

const restartBtn = document.querySelector("#restart")

restartBtn.addEventListener("click", function() {
    actualQuestion = 0
    points = 0
    hideOrShowQuizz()
    init()
})
//inicialização do quizz
init()
