'use client';
import React from 'react';
import Cross from './cross';
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
import Board from './board';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

const Page = () => {
	const [turn, setTurn] = React.useState("Start Please");
	const [isAllowedToReset, setIsAllowedToReset] = React.useState(false);
	const [onResetClicked, setOnResetClicked] = React.useState<boolean>(false);
	const [isLegend, setIsLegend] = React.useState(false);
	const router = useRouter();
	return (
		<div className={(isLegend)?("flex justify-center items-center h-screen animate-spin"):("flex justify-center items-center h-screen")}>
			<Card className="h-[38rem] w-[27rem]">
				<CardHeader>
					<CardTitle className='font-bold'>Tic Tac Toe</CardTitle>
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
					<div className='pb-[1rem]'>
						<Button className='w-full' disabled={!isAllowedToReset} onClick={() => {
							setIsAllowedToReset(false);
							setOnResetClicked(true);
						}} >{(isAllowedToReset) ? ("Reset") : (<>{turn}&apos;s Turn</>)}</Button>
						<div className='p-3 grid grid-cols-2'>
							<Button className='mr-[5px] w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 ' onClick={() =>
								setIsLegend(true)
								
							}> Enter Legends Mode</Button>
							<Button className='w-full bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90%' onClick={()=>{router.push('/pvp')}}> PVP </Button>
						</div>
					</div>
				</CardFooter>
			</Card>
		</div>
	);
};

export default Page;
