import type { Metadata } from "next";

import "./globals.css";
import { SessionProvider } from "next-auth/react";
import Provider from "./provider";
import StoreProvider from "./redux/StoreProvider";

export const metadata: Metadata = {
  title: "Snap Cart | 10 minutes grocery delivery app",
  description: " 10 minutes grocery delivery app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="w-full min-h-[200vh] bg-linear-to-b from-green-100 to-white">
        <Provider>
          <StoreProvider>{children}</StoreProvider>
        </Provider>
      </body>
    </html>
  );
}
