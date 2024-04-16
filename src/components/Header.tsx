import { Avatar, Button, Layout, Typography } from "antd";
import { signIn, signOut, useSession } from "next-auth/react";
import { useState } from "react";

export default function Header() {
  const [loading, setLoading] = useState(false);
  const session = useSession();

  return (
    <Layout.Header className="flex justify-between items-center">
      <h1>GitHub Todo</h1>

      <div className="flex gap-4 justify-center items-center">
        <a href="/about">Sobre</a>
        {session.data && <a href="/config">Configurações</a>}
        {session.data && <a href="/dashboard">Dashboard</a>}

        {session.data ? (
          <div className="flex gap-2">
            <Avatar
              size={48}
              src={session.data?.user?.image} 
            />

            <div className="flex flex-col items-left">
              <Typography.Text>
                {session.data?.user?.name}
              </Typography.Text>

              <Typography.Link 
                type="secondary"
                onClick={() => signOut()}
              >
                Sair
              </Typography.Link>
            </div>
          </div>
        ) : (
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
        )}
      </div>
    </Layout.Header>
  );
}