import React from 'react';
import Cross from './cross';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Board from './board';

const Page: React.FC = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <Card className="h-[32rem] w-[27rem]">
        <CardHeader>
          <CardTitle>Tic Tac Toe</CardTitle>
          <CardDescription>......</CardDescription>
        </CardHeader>
        <CardContent>
          <Board />
        </CardContent>
      </Card>
    </div>
  );
};

export default Page;