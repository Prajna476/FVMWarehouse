import {IBM_Plex_Mono} from "next/font/google";
import "./globals.css";
import {Web3ModalProvider} from "@/context/Web3Modal";


export const metadata = {
  title: {
    default: 'Galadriel On-Chain Dall-E',
    template: `%s - Dall-E`
  },
  description: 'On-Chain image generation powered by Dall-E on Galadriel devnet',
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png'
  }
}

const plexmono = IBM_Plex_Mono(
  {weight: "400", subsets: ["latin"]},
);


export default function RootLayout(
  {
    children,
  }: Readonly<{ children: React.ReactNode; }>) {
  return (
    <html lang="en">
    <body className={plexmono.className}>
    <div className="h-screen bg-rat bg-no-repeat bg-contain bg-center bg-opacity-50">
      <Web3ModalProvider>
        {children}
      </Web3ModalProvider>
    </div>
    </body>
    </html>
  );
}
