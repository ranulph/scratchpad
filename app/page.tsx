import React from 'react';
import { getPageSession } from '@/components/getPageSession';
import ScratchPad from '@/app/ScratchPad';

export default async function Home() {

  const session = await getPageSession();

  let isLoggedIn;

  if (!session) {
    isLoggedIn = false
  } else {
    isLoggedIn = true
  }

  const username = session?.user.githubUsername ?? ""
  const sessionId = session?.sessionId ?? ""

  return (
    <main className="flex flex-col max-w-lg mx-auto px-2 mt-24">
        <ScratchPad username={username} sessionId={sessionId} isLoggedIn={isLoggedIn} />
    </main>
  )
}
