'use client';
import React from 'react';
import Cross from '../cross';
import {
	HoverCard,
	HoverCardContent,
	HoverCardTrigger,
} from "@/components/ui/hover-card"

import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card"
import Board from '../boardpvp';
import { Button } from '@/components/ui/button';

const Page = () => {
	const [turn, setTurn] = React.useState("Start Please");
	const [isAllowedToReset, setIsAllowedToReset] = React.useState(false);
	const [onResetClicked, setOnResetClicked] = React.useState<boolean>(false);
	return (
		<div className="flex justify-center items-center h-screen">
			<Card className="h-[35rem] w-[27rem]">
				<CardHeader>
					<CardTitle>Tic Tac Toe</CardTitle>
					<CardDescription>
						<HoverCard>
							<HoverCardTrigger>Auther</HoverCardTrigger>
							<HoverCardContent>
								Akash Naskar<br />
								Alok Pandey<br />
								Souvik Maity
							</HoverCardContent>
						</HoverCard>

					</CardDescription>
				</CardHeader>
				<CardContent>
					<Board setTurn={setTurn} turn={turn} setIsAllowedToReset={setIsAllowedToReset} setOnResetClicked={setOnResetClicked} onResetClicked={onResetClicked} />
				</CardContent>
				<CardFooter>
					<Button className='w-full' disabled={!isAllowedToReset} onClick={() => {
						setIsAllowedToReset(false);
						setOnResetClicked(true);
					}} >{(isAllowedToReset) ? ("Reset") : (<>{turn}&apos;s Turn</>)}</Button>
				</CardFooter>
			</Card>
		</div>
	);
};

export default Page;
