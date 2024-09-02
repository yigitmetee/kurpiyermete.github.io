    balloon.style.height = balloonSize + 'px';
    balloon.style.top = Math.random() * (window.innerHeight - balloonSize) + 'px';
    balloon.style.left = Math.random() * (window.innerWidth - balloonSize) + 'px';
    balloon.addEventListener('click', () => {
        score++;
        balloonSize = Math.max(20, balloonSize - 5);
        document.getElementById('score').innerText = `Puan: ${score}`;
        balloon.remove();
        spawnBalloon();
    });
    document.getElementById('balloon-container').appendChild(balloon);
}

function endGame() {
    document.getElementById('start-btn').classList.remove('hidden');
    document.getElementById('end-screen').classList.remove('hidden');
    document.getElementById('final-score').innerText = `Puan: ${score}`;
    
    if (score > highscore) {
        highscore = score;
        document.getElementById('highscore').innerText = highscore;
    }
}

function restartGame() {
    document.getElementById('end-screen').classList.add('hidden');
    startGame();
}
