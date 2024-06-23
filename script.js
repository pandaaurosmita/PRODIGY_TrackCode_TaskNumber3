
document.addEventListener('DOMContentLoaded', () => {
    const cells = document.querySelectorAll('.cell');
    const gameBoard = document.getElementById('gameBoard');
    const resetButton = document.getElementById('resetButton');
    let currentPlayer = 'X';
    let board = Array(9).fill(null);

    cells.forEach(cell => {
        cell.addEventListener('click', handleClick);
    });

    resetButton.addEventListener('click', resetGame);

    function handleClick(e) {
        const index = e.target.getAttribute('data-index');
        if (board[index] !== null || checkWin(board)) return;

        board[index] = currentPlayer;
        e.target.textContent = currentPlayer;

        if (checkWin(board)) {
            alert(`${currentPlayer} wins!`);
        } else if (board.every(cell => cell !== null)) {
            alert('It\'s a draw!');
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        }
    }

    function checkWin(board) {
        const winPatterns = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
            [0, 4, 8], [2, 4, 6]             // Diagonals
        ];

        return winPatterns.some(pattern => {
            const [a, b, c] = pattern;
            return board[a] && board[a] === board[b] && board[a] === board[c];
        });
    }

    function resetGame() {
        board.fill(null);
        cells.forEach(cell => {
            cell.textContent = '';
        });
        currentPlayer = 'X';
    }
});
