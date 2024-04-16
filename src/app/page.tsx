"use client";

import { Button, Layout } from "antd";
import { signIn } from "next-auth/react";
import { useState } from "react";

export default function Home() {
  const [loading, setLoading] = useState(false);

  return (
    <Layout className="h-screen">
      <Layout.Header className="flex justify-between items-center">
        <h1>GitHub Todo</h1>

        <div className="flex gap-4 justify-center items-center">
          <a href="/about">About</a>

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
      </Layout.Header>

      <Layout.Content className="flex grow flex-col gap-16 justify-center items-center">
        <div className="w-1/2 h-1/2 bg-gray-200"></div>

        <div className="flex flex-col gap-4 justify-center items-center">
          <Button
            type="primary"
            loading={loading}
            onClick={() => {
              setLoading(true);
              signIn("github", { callbackUrl: "/dashboard" });
            }}
          >
            Login com Github
          </Button>

          <p>
            Não possui uma conta?{" "}
            <a href="https://github.com/signup" target="_blank" rel="noopener noreferrer">
              Cadastre-se no Github.
            </a>
          </p>
        </div>
      </Layout.Content>
    </Layout>
  );
}
