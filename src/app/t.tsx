import React, { useState } from 'react';

const TicTacToe = () => {
    const [board, setBoard] = useState(Array(9).fill(''));
    const [currentPlayer, setCurrentPlayer] = useState('X');
    const [winner, setWinner] = useState('');

    const handleCellClick = (index: number) => {
        if (board[index] === '' && !winner) {
            const newBoard = [...board];
            newBoard[index] = currentPlayer;
            setBoard(newBoard);
            checkWinner(newBoard, currentPlayer);
            setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
        }
    };

    const checkWinner = (board: string[], player: string) => {
        const winningCombinations = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
            [0, 4, 8], [2, 4, 6] // Diagonals
        ];

        for (let combination of winningCombinations) {
            const [a, b, c] = combination;
            if (board[a] === player && board[b] === player && board[c] === player) {
                setWinner(player);
                break;
            }
        }
    };

    const resetGame = () => {
        setBoard(Array(9).fill(''));
        setCurrentPlayer('X');
        setWinner('');
    };

    return (
        <div>
            <div className="board">
                {board.map((cell, index) => (
                    <div key={index} className="cell" onClick={() => handleCellClick(index)}>
                        {cell}
                    </div>
                ))}
            </div>
            {winner && (
                <div className="winner-message">
                    <p>{`Player ${winner} wins!`}</p>
                    <button onClick={resetGame}>Play Again</button>
                </div>
            )}
        </div>
    );
};

export default TicTacToe;