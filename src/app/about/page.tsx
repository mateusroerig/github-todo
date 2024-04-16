"use client";

import Header from "@/components/Header";
import { Layout } from "antd";

export default function About() {
  return (
    <Layout className="h-screen">
      <Header />

      <Layout.Content className="flex grow flex-col gap-16 justify-center items-center">
        Teste de Sobre
      </Layout.Content>
    </Layout>
  );
}
