"use client";

import { signIn, signOut, useSession } from "next-auth/react";

export default function Home() {
  const session = useSession();

  return (
    <main className="flex justify-center items-center h-screen">
      <div>
        {session?.data ? (
          <div className="flex flex-col justify-center">
            <p>{session.data?.user?.name}</p>
            <button onClick={() => signOut()}>Logout</button>
          </div>
          ) : (
          <button onClick={() => signIn("github")}>Login</button>
        )}
      </div>
    </main>
  );
}
