import { Avatar, Layout, Typography, Button } from "antd";
import { signOut, useSession } from "next-auth/react";

export default function Header() {
  const session = useSession();

  return (
    <Layout.Header className="flex justify-between items-center">
      <div className="flex gap-2">
        <Avatar size={48} src={session.data?.user?.image} />
        <div className="flex flex-col justify-center">
          <Typography.Text>{session.data?.user?.name}</Typography.Text>
          <Typography.Text>{session.data?.user?.email}</Typography.Text>
        </div>
      </div>
      <div className="flex gap-4 justify-center items-center">
        <Typography.Link href="/dashboard">Dashboard</Typography.Link>
        <Typography.Link href="/config">Configurações</Typography.Link>
        <Typography.Link href="/about">Sobre</Typography.Link>
        <Button danger onClick={() => signOut()}>Sair</Button>
      </div>
    </Layout.Header>
  );
}
