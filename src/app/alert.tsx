'use client';
import React from 'react';
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from "@/components/ui/alert-dialog"

export default function Alert(props: {
	open: boolean,
	setOpen: React.Dispatch<React.SetStateAction<boolean>>
	winner: string
}) {
	const open = props.open;
	const setOpen = props.setOpen;
	const winner = props.winner;
	return (
		<AlertDialog open={open} >
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle> Congratulations</AlertDialogTitle>
					<AlertDialogDescription>
						The winner is {winner}
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogAction onClick={() => {
						setOpen(false)
					}}>Close</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>

	);
}
