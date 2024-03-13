"use client";

import { Button } from "antd";
import { signIn } from "next-auth/react";
import { useState } from "react";

export default function Home() {
  const [loading, setLoading] = useState(false);

  return (
    <main className="flex justify-center items-center h-screen">
      <div>
        <Button
          type="primary"
          loading={loading}
          onClick={() => {
            setLoading(true);
            signIn("github", { callbackUrl: "/dashboard" });
          }}
        >
          Login
        </Button>
      </div>
    </main>
  );
}
