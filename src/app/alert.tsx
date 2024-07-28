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

export default function Alert(props: { open: boolean, setOpen: React.Dispatch<React.SetStateAction<boolean>> }) {
    const open = props.open;
    const setOpen = props.setOpen;
    console.log(open)
    return (
        <AlertDialog open={open} >
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Confirm Your Email</AlertDialogTitle>
                    <AlertDialogDescription>
                        We have sent you an email with a link to confirm your email address. Please click on the link to confirm your email address.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogAction onClick={() => {
                        setOpen(false)

                    }}>Login</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>

    );
}