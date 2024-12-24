const questions = [
    {
        question: "Quelle est la planète d'origine de Yoda ?",
        options: ["Dagobah", "17 rue de la futaie", "Kashyyyk", "Inconnue"],
        correct: 3
    },
    {
        question: "Quel Sith a créé l'Ordre des Deux ?",
        options: ["Darth Bane", "Darth Revan", "Darth Plagueis", "Darth Sidious"],
        correct: 0
    },
    {
        question: "Qui était l'apprenti de Count Dooku ?",
        options: ["Darth Vader", "Asajj Ventress", "Darth Maul", "Savage Opress"],
        correct: 1
    },
    {
        question: "Quel Jedi a commandé l'armée clone dans la bataille de Geonosis ?",
        options: ["Obi-Wan Kenobi", "Mace Windu", "Yoda", "le Claude"],
        correct: 2
    },
    {
        question: "Quel matériau est utilisé pour fabriquer un sabre laser ?",
        options: ["Cristal kyber", "Cristal Ilum", "Cristal de Corusca", "Duracier"],
        correct: 0
    },
    {
        question: "Qui est le père de Rey ?",
        options: ["Un clone de Palpatine", "Luke Skywalker", "Han Solo", "Poe Dameron"],
        correct: 0
    },
    {
        question: "Quel est le nom du Sith qui a été responsable de la Purge Jedi pendant l'ère de l'Empire Galactique, avant d'être tué par Darth Vador ?",
        options: ["Dark Vador", "Jack Jack", "C-3PO", "Anakin Skywalker"],
        correct: 0
    },
    {
        question: "Quel chasseur Sith est équipé d'un hyperdrive dans *The Phantom Menace* ?",
        options: ["TIE Interceptor", "Vaisseau de Darth Maul", "TIE Fighter", "Infiltrator Sith"],
        correct: 3
    },
    {
        question: "Combien de droïdes de combat défectueux R2-D2 a-t-il vaincu dans *La Revanche des Sith* ?",
        options: ["1", "2", "3", "4"],
        correct: 1
    },
    {
        question: "Quel Jedi a supprimé Kamino des archives du Temple Jedi ?",
        options: ["Mace Windu", "Count Dooku", "Margaux Babin", "Sifo-Dyas"],
        correct: 3
    },
    {
        question: "Le tournage de certaines scènes de L'Empire contre-attaque a eu lieu dans un lieu extrêmement froid. Où cela s'est-il passé ?",
        options: ["Norvège", "au Pôle Nord non loin de l'atelier du Père Noël", "Alaska", "Canada"],
        correct: 0
    },
    {
        question: "Le créateur du logo original de Star Wars, qui a influencé le style graphique de tous les films de la saga, a également créé l’un des logos les plus célèbres de l’histoire du cinéma. Qui est ce designer ?",
        options: ["Stuart Freeborn", "Ralph McQuarrie", "Doug Chiang", "ton très cher neveu"],
        correct: 1
    },
    {
        question: "Quel réalisateur a été envisagé pour réaliser Le Retour du Jedi avant que George Lucas ne décide finalement de réengager Richard Marquand ?",
        options: ["Steven Spielberg", "Fifou", "David Lynch", "John Carpenter"],
        correct: 2
    },
];


let currentQuestionIndex = 0;
let score = 0;
let timer;
const questionDuration = 15; // Temps par question en secondes

const questionBox = document.getElementById("question-box");
const questionText = document.getElementById("question-text");
const optionsContainer = document.getElementById("options-container");
const nextButton = document.getElementById("next-btn");
const resultsBox = document.getElementById("results-box");
const scoreText = document.getElementById("score-text");
const timerDisplay = document.createElement("div");
timerDisplay.id = "timer";
document.body.insertBefore(timerDisplay, questionBox);

const correctSound = new Audio("correct.mp3");
const wrongSound = new Audio("wrong.mp3");
const shipSound = new Audio("ship.mp3");

// Fonction pour charger une nouvelle question
function loadQuestion() {
    playShipAnimation();

    questionBox.classList.remove("active");
    setTimeout(() => {
        const question = questions[currentQuestionIndex];
        questionText.textContent = question.question;
        optionsContainer.innerHTML = "";

        question.options.forEach((option, index) => {
            const button = document.createElement("button");
            button.textContent = option;
            button.classList.add("option");
            button.addEventListener("click", () => checkAnswer(index));
            optionsContainer.appendChild(button);
        });

        startTimer();
        questionBox.classList.add("active");
    }, 500);
}

// Fonction pour vérifier la réponse
function checkAnswer(selectedIndex) {
    clearInterval(timer);

    const correctIndex = questions[currentQuestionIndex].correct;

    if (selectedIndex === correctIndex) {
        score++;
        correctSound.play();
    } else {
        wrongSound.play();
    }

    Array.from(optionsContainer.children).forEach((button, index) => {
        button.disabled = true;
        if (index === correctIndex) {
            button.style.backgroundColor = "green";
        } else if (index === selectedIndex) {
            button.style.backgroundColor = "red";
        }
    });

    nextButton.classList.remove("hidden");
}

// Fonction pour afficher les résultats
function showResults() {
    questionBox.classList.add("hidden");
    nextButton.classList.add("hidden");
    resultsBox.classList.remove("hidden");

    scoreText.textContent = `Tu as obtenu ${score} sur ${questions.length} points ! TU PEUX OUVRIR TON CADEAU`;
}

// Fonction pour animer les X-Wing
function playShipAnimation() {
    shipSound.play();

    const shipContainer = document.createElement("div");
    shipContainer.classList.add("ship-container");

    const shipImage = document.createElement("img");
    shipImage.src = "xwing.png";
    shipImage.alt = "X-Wing";
    shipImage.classList.add("ship");

    // Position aléatoire pour le départ
    const randomY = Math.random() * 100 + "vh";  // position verticale aléatoire
    shipContainer.style.setProperty("--start-y", randomY);

    shipContainer.appendChild(shipImage);
    document.body.appendChild(shipContainer);

    setTimeout(() => {
        shipContainer.remove();
    }, 4000);
}

// Timer
function startTimer() {
    let timeRemaining = questionDuration;
    timerDisplay.textContent = `Temps restant : ${timeRemaining}s`;

    timer = setInterval(() => {
        timeRemaining--;
        timerDisplay.textContent = `Temps restant : ${timeRemaining}s`;

        if (timeRemaining <= 0) {
            clearInterval(timer);
            nextButton.click();
        }
    }, 1000);
}

// Bouton "Question Suivante"
nextButton.addEventListener("click", () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        loadQuestion();
        nextButton.classList.add("hidden");
    } else {
        showResults();
    }
});

// Initialisation
loadQuestion();
