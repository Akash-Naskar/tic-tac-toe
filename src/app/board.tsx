'use client';
import React, { useEffect } from 'react';
import c from './cross';
import co from './circle';
import Alert from './alert';
enum CellValue {
    None,
    X,
    O
}

const Cross =  c;
const Circle =  co;

function getComponent(value: CellValue) {
    switch (value) {
        case CellValue.X:
            return <Cross />;
        case CellValue.O:
            return <Circle />;
        default:
            return null;
    }
}

function checkWinner(positions: CellValue[], player: CellValue) {
    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6] // Diagonals
    ];

    for (let combination of winningCombinations) {
        const [a, b, c] = combination;
        if (positions[a] === player && positions[b] === player && positions[c] === player) {
            return true;
        }
    }
    return false;
}
function cheackDraw(positions: CellValue[]) {
    return positions.every((value) => value !== CellValue.None);
}
const Board = () => {
    const [positions, setPositions] = React.useState(Array<CellValue>(9).fill(CellValue.None));
    const [currentPlayer, setCurrentPlayer] = React.useState(CellValue.X);
    const [hasWon, setHasWon] = React.useState(false);
    const handleClick = (index: number, offset: number) => {
        if (positions[index + offset] !== CellValue.None) {
            return;
        }
        setPositions(prevPositions => {
            const newPositions = [...prevPositions];
            newPositions[index + offset] = currentPlayer;
            return newPositions;
        });
        if (currentPlayer === CellValue.X) {
            setCurrentPlayer(CellValue.O);
        } else {
            setCurrentPlayer(CellValue.X);
        }
    };

    

    useEffect(() => {
        const c = checkWinner(positions, CellValue.X) ? CellValue.X : checkWinner(positions, CellValue.O) ? CellValue.O : CellValue.None;
        if (c !== CellValue.None) {
            setPositions(Array<CellValue>(9).fill(CellValue.None));
            setCurrentPlayer(CellValue.X);
            alert(`Player ${c === CellValue.X ? 'X' : 'O'} wins!`)
            // console.log(`Player ${c === CellValue.X ? 'X' : 'O'} wins!`);
            // setHasWon(true);
        }
        if (cheackDraw(positions)) {
            setPositions(Array<CellValue>(9).fill(CellValue.None));
            setCurrentPlayer(CellValue.X);
            alert('Draw!');
            // console.log('Draw!');`
        }

    }, [positions]);

    <Alert open={hasWon} setOpen={setHasWon} />
    return (
        <div className='grid grid-rows-3 items-center'>
            <div className='grid grid-cols-3 '>
                {positions.slice(0, 3).map((value, index) => (
                    <div key={index} className='flex items-center justify-center h-32 w-32 border border-gray-300' onClick={() => handleClick(index, 0)}>
                        {getComponent(value)}
                    </div>
                ))}
            </div>
            <div className='grid grid-cols-3 '>
                {positions.slice(3, 6).map((value, index) => (
                    <div key={index} className='flex items-center justify-center h-32 w-32 border border-gray-300' onClick={() => handleClick(index, 3)}>
                        {getComponent(value)}
                    </div>
                ))}
            </div>
            <div className='grid grid-cols-3'>
                {positions.slice(6, 9).map((value, index) => (
                    <div key={index} className='flex items-center justify-center h-32 w-32 border border-gray-300' onClick={() => handleClick(index, 6)}>
                        {getComponent(value)}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Board;