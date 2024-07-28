'use client'
import React, { useEffect } from 'react';
import c from './cross';
import co from './circle';
import Alert from './alert';
import { useRouter } from 'next/navigation';
enum CellValue {
	None,
	X,
	O
}

const Cross = c;
const Circle = co;

function getComponent(value: CellValue, shouldAnimate: boolean = false) {
	switch (value) {
		case CellValue.X:
			return <div className={shouldAnimate?"animate-spin":""}><Cross /></div>;
		case CellValue.O:
			return <div className={shouldAnimate?"animate-bounce":""}><Circle /></div>;
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
			return combination;
		}
	}
	return null;
}
function cheackDraw(positions: CellValue[]) {
	return positions.every((value) => value !== CellValue.None);
}

function bootMove(positions: CellValue[]) {
	const emptyCells = positions.map((value, index) => value === CellValue.None ? index : -1).filter((value) => value !== -1);
	const randomIndex = Math.floor(Math.random() * emptyCells.length);
	return emptyCells[randomIndex];
}



const Board = (props: {
	setTurn: React.Dispatch<React.SetStateAction<string>>,
	turn: string,
	setIsAllowedToReset: React.Dispatch<React.SetStateAction<boolean>>,
	onResetClicked: boolean,
	setOnResetClicked: React.Dispatch<React.SetStateAction<boolean>>
	// setIsAllowedToReset: React.Dispatch<React.SetStateAction<boolean>>
}) => {
	const { setTurn, setIsAllowedToReset, onResetClicked, setOnResetClicked, turn } = props;
	const [positions, setPositions] = React.useState(Array<CellValue>(9).fill(CellValue.None));
	const [currentPlayer, setCurrentPlayer] = React.useState(CellValue.X);
	const [hasWon, setHasWon] = React.useState(false);
	const [winingPositions, setWiningPositions] = React.useState<Array<number>>([]);
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
			setTurn("Bot");
		} else {
			setCurrentPlayer(CellValue.X);
			setTurn("Player");
		}
	};



	useEffect(() => {

		const c = ( checkWinner(positions, CellValue.X) != null)? CellValue.X : (checkWinner(positions, CellValue.O) != null)? CellValue.O : CellValue.None;
		
		if (c !== CellValue.None) {
			const temp = checkWinner(positions, c)!;
			console.log(temp);
			setWiningPositions(temp);
			setCurrentPlayer(CellValue.X);
			setHasWon(true);
			setIsAllowedToReset(true);

		} else if (cheackDraw(positions)) {
			setCurrentPlayer(CellValue.X);
			alert('Draw!');
			setIsAllowedToReset(true);
		}
		if (onResetClicked) {
			setIsAllowedToReset(false);
			setPositions(Array<CellValue>(9).fill(CellValue.None));
			setCurrentPlayer(CellValue.X);
			setTurn("Player");
			setOnResetClicked(false);
			setWiningPositions([]);
		}
		if (currentPlayer === CellValue.O) {
			const index = bootMove(positions);
			setTimeout(() => {
				handleClick(index, 0);
				setCurrentPlayer(CellValue.X);
			}, 500);
		}
	}, [onResetClicked, positions, setIsAllowedToReset, setOnResetClicked, setTurn]);
	return (
		<div className='grid grid-rows-3 items-center'>
			<Alert open={hasWon} setOpen={setHasWon} winner={turn} />
			<div className='grid grid-cols-3 '>
				{positions.slice(0, 3).map((value, index) => (
					<div key={index} className='flex items-center justify-center h-32 w-32 border border-gray-300' onClick={() => handleClick(index, 0)}>
						{getComponent(value, winingPositions.includes(index + 0))}
					</div>
				))}
			</div>
			<div className='grid grid-cols-3 '>
				{positions.slice(3, 6).map((value, index) => (
					<div key={index} className='flex items-center justify-center h-32 w-32 border border-gray-300' onClick={() => handleClick(index, 3)}>
						{getComponent(value, winingPositions.includes(index + 3))}
					</div>
				))}
			</div>
			<div className='grid grid-cols-3'>
				{positions.slice(6, 9).map((value, index) => (
					<div key={index} className='flex items-center justify-center h-32 w-32 border border-gray-300' onClick={() => handleClick(index, 6)}>
						{getComponent(value, winingPositions.includes(index + 6))}
					</div>
				))}
			</div>
		</div>
	);
};

export default Board;
