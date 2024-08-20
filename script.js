const flashcards = [];
let currentFlashcardIndex = 0;
let score = 0;
let usedFlashcards = [];

function showTab(tabId) {
    document.querySelectorAll('.tab').forEach(tab => {
        tab.classList.remove('active');
    });
    document.getElementById(tabId).classList.add('active');
    
    if (tabId === 'quiz') {
        if (flashcards.length > 0) {
            usedFlashcards = [];
            score = 0;
            document.getElementById('score').textContent = `Score: ${score}`;
            showFlashcard();
        } else {
            document.getElementById('flashcard-question').textContent = 'No flashcards available.';
            document.getElementById('flashcard-answer').value = '';
            document.getElementById('result').textContent = '';
            document.getElementById('score').textContent = `Score: ${score}`;
        }
    }
}

function addFlashcard() {
    const question = document.getElementById('question').value.trim();
    const answer = document.getElementById('answer').value.trim();
    
    if (question && answer) {
        flashcards.push({ question, answer });
        document.getElementById('question').value = '';
        document.getElementById('answer').value = '';
        alert('Flashcard added!');
    } else {
        alert('Please fill in both fields.');
    }
}

function showFlashcard() {
    if (usedFlashcards.length === flashcards.length) {
        document.getElementById('flashcard-question').textContent = 'Quiz completed!';
        document.getElementById('flashcard-answer').style.display = 'none';
        document.getElementById('result').textContent = '';
        return;
    }

    let flashcard;
    do {
        flashcard = flashcards[Math.floor(Math.random() * flashcards.length)];
    } while (usedFlashcards.includes(flashcard));

    usedFlashcards.push(flashcard);
    document.getElementById('flashcard-question').textContent = flashcard.question;
    document.getElementById('flashcard-answer').value = '';
    document.getElementById('result').textContent = '';
}

function checkAnswer() {
    const userAnswer = document.getElementById('flashcard-answer').value.trim().toLowerCase();
    const correctAnswer = flashcards.find(fc => fc.question === document.getElementById('flashcard-question').textContent).answer.toLowerCase();
    
    if (userAnswer === correctAnswer) {
        score++;
        document.getElementById('result').textContent = 'Correct!';
    } else {
        document.getElementById('result').textContent = `Wrong! The correct answer was: ${correctAnswer}`;
    }
    
    document.getElementById('score').textContent = `Score: ${score}`;
    showFlashcard();
}
