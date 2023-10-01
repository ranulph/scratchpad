'use client'

import { useState, useEffect } from 'react';
import { Textarea } from '@/components/ui/textarea';
import useSWR from "swr";
import { toast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { ModeToggle } from '@/components/ui/modetoggle';
import { UserToggle } from '@/components/ui/usertoggle';
import { UpdateIcon } from "@radix-ui/react-icons";

const API_URL = 'https://api.scratchpad.run';

const getText = async (sessionId: string) => {
    const response: { textarea: string } = await fetch(API_URL, {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + sessionId,
        }
}).then(resp => resp.json())
  return response
};

const saveText = async (textarea: string, sessionId: string) => {
    await fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + sessionId,
        },
        body: JSON.stringify({ textarea: textarea }),
    });
};

export default function ScratchPad({ username, sessionId, isLoggedIn }: { username: string; sessionId: string; isLoggedIn: boolean }) {

    const [textState, setTextState] = useState('');

    const { data, mutate, error } = useSWR(sessionId, getText);  

    if (error) {
      toast({
        variant: "destructive",
        description: "Error. Are you online?",
      })
    }
      
    useEffect(() => {
        if (data) {
            setTextState(data.textarea)
        }
    }, [data])
    
    const handleSave = (textarea: string) => {
      setTextState(textarea)
      saveText(textarea, sessionId)
    };

    return (
        <>
            <div className='flex justify-between items-baseline px-1'>
                <h1 onClick={() => mutate()} className="text-4xl font-extrabold tracking-tight pl-2 cursor-default">
                    ScratchPad
                </h1>
                <div className='flex'>
                    <Button onClick={() => mutate()} variant="ghost" size="icon" className="">
                        <UpdateIcon className="h-[1.2rem] w-[1.2rem] active:rotate-90 transition-all active:scale-125 dark:active:scale-125" />
                        <span className="sr-only">Save</span>
                    </Button>
                    <UserToggle username={username} isLoggedIn={isLoggedIn} />
                    <ModeToggle />
                </div>
            </div>
            <Textarea onClick={() => mutate()} autoFocus value={textState} onChange={(e) => handleSave(e.target.value)} disabled={!isLoggedIn} placeholder={isLoggedIn ? 'For moving text between devices.' : 'For moving text between devices. You must sign in.'} className={isLoggedIn ? 'mt-2 h-96' : 'mt-2 h-96 cursor-not-allowed'} />
        </>

    )
}