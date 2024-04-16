"use client";

import Header from "@/components/Header";
import { Layout } from "antd";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Layout>
      <Header />
      <Layout.Content>{children}</Layout.Content>
    </Layout>
  );
}
