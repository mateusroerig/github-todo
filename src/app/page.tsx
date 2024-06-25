"use client";

import { useLoading } from "@/components/Loading/LoadingContexts";
import { Button, Layout, theme } from "antd";
import { signIn } from "next-auth/react";
import { useState } from "react";
import Image from "next/image";
import logoLight from "../../public/static/logo-light.png";
import logoDark from "../../public/static/logo-dark.png";

export default function Home() {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const [loading, setLoading] = useState(false);
  const { startLoading, stopLoading } = useLoading();

  return (
    <Layout className="h-screen">
      <Layout.Content className="flex flex-col gap-16 justify-center items-center">
        <div
          className="rounded-md"
          style={{
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <Image
            src={colorBgContainer == "#141414" ? logoLight : logoDark}
            width={300}
            alt="GitHub TODO Logo"
          />
        </div>

        <div className="flex flex-col gap-4 justify-center items-center">
          <Button
            type="primary"
            loading={loading}
            onClick={() => {
              setLoading(true);
              startLoading();
              signIn("github", { callbackUrl: "/dashboard" });
            }}
          >
            Login com Github
          </Button>

          <div className="text-center">
            <p>Ainda não possui uma conta?</p>
            <a
              href="https://github.com/signup"
              target="_blank"
              rel="noopener noreferrer"
            >
              Cadastre-se no Github
            </a>
          </div>
        </div>
      </Layout.Content>
    </Layout>
  );
}
