import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import { Gradient } from "@/components/ui/gradient";

export const runtime = 'edge';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'ScratchPad',
  description: 'For moving text between devices.',
  applicationName: 'ScratchPad',
  authors: [{ name: 'Ranulph', url: 'https://ranulph.run' }],
  keywords: "scratchpad, scratch pad, pastebin",
  themeColor: [{ media: "(prefers-color-scheme: dark)", color: "#1A1A1A" }, { media: "(prefers-color-scheme: light)", color: "#FAFAFA" }],
  colorScheme: 'dark light',
  viewport: {
    width: 'device-width',
    height: 'device-height',
    interactiveWidget: 'resizes-visual',
    initialScale: 1.0,
    minimumScale: 1.0,
    maximumScale: 1.0,
    userScalable: false,
    viewportFit: 'cover'
  },
  manifest: "https://scratchpad.run/site.webmanifest",
  icons: [{ rel: "icon", url: "https://scratchpad.run/sp192.png" }, { rel: "apple-touch-icon", url: "https://scratchpad.run/sp192.png" }],
  openGraph: {
    type: "website",
    url: "https://scratchpad.run",
    title: "ScratchPad",
    description: "For moving text between devices.",
    siteName: "ScratchPad",
  },
  appleWebApp: { capable: true, title: "ScratchPad", statusBarStyle: "black-translucent" }
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {

  return (
    <>
      <html lang="en" suppressHydrationWarning>
        <body className={`${inter.className} scrollbar-hide`}>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
              {children}
              <Toaster />
          </ThemeProvider>
          <Gradient className="top-[-500px] opacity-[0.15] w-[1000px] h-[800px] pointer-events-none" />
        </body> 
      </html>
    </>
  )
}