document.getElementById('lottery-form').addEventListener('submit', function (event) {
    event.preventDefault();

    const num1 = parseInt(document.getElementById('num1').value);
    const num2 = parseInt(document.getElementById('num2').value);
    const num3 = parseInt(document.getElementById('num3').value);
    const userNumbers = [num1, num2, num3];

    if (new Set(userNumbers).size !== 3 || userNumbers.some(num => num < 0 || num > 9)) {
        document.getElementById('result').textContent = 'Invalid input. Please enter 3 unique numbers between 0 and 9.';
        return;
    }

    const winningNumbers = generateWinningNumbers();
    const isWinner = checkWinning(userNumbers, winningNumbers);

    if (isWinner) {
        document.getElementById('result').textContent = 'Congratulations! You\'ve won!';
    } else {
        document.getElementById('result').textContent = `Sorry, you didn't win. The winning numbers were: ${winningNumbers.join(', ')}`;
    }
});

function generateWinningNumbers() {
    const numbers = Array.from({ length: 10 }, (_, i) => i);
    for (let i = numbers.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [numbers[i], numbers[j]] = [numbers[j], numbers[i]];
    }
    return numbers.slice(0, 3);
}

function checkWinning(userNumbers, winningNumbers) {
    return userNumbers.every(num => winningNumbers.includes(num));
}
