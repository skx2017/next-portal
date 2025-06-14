import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AntdRegistry } from '@ant-design/nextjs-registry';
import AntdLayout from '../components/AntdLayout';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next 开开",
  description: "Generated by create next app",
  viewport: {
    width: 'device-width',
    initialScale: 1,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AntdRegistry>
          <AntdLayout>{children}</AntdLayout>
        </AntdRegistry>
      </body>
    </html>
  );
}
