"use client";

import { LogoutOutlined } from "@ant-design/icons";
import { Avatar, Button, Layout, Typography } from "antd";
import { useSession, signOut } from "next-auth/react";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = useSession();

  return (
    <Layout>
      <Layout.Header className="flex justify-between items-center">
        <div>
          <Avatar src={session.data?.user?.image} />
          <Typography.Text className="pl-4">
            {session.data?.user?.name}
          </Typography.Text>
        </div>
        <Button
          type="primary"
          icon={<LogoutOutlined />}
          danger
          onClick={() => signOut({ callbackUrl: "/" })}
        >
          Sair
        </Button>
      </Layout.Header>
      <Layout.Content>{children}</Layout.Content>
    </Layout>
  );
}
