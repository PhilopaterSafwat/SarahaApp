
import type { Metadata } from "next";
import "./globals.css";
import { Montserrat } from "next/font/google"
import Navbar from "./_components/Navbar/page";
import { Toaster } from 'react-hot-toast';

import ClientProviders from "./_components/ClientProviders/page";
import UserTokenContextProvider from "./Context/userTokenContext";

const montserrat = Montserrat({ weight: ["300", "400", "800"], subsets: ["latin"] })

export const metadata: Metadata = {
  title: "whisper",
  description: "whisper app",
  icons:{
    icon:"https://whisperapi-production.up.railway.app/uploads/whisper.png",
  }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${montserrat.className} dark antialiased mian-background`}>
        <UserTokenContextProvider>
          <ClientProviders>
            <Navbar />
            <main className="py-30">
              {children}
            </main>
            <Toaster />
          </ClientProviders>
        </UserTokenContextProvider>
      </body>
    </html>
  );
}
