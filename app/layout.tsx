import "@/styles/globals.css"

import { fontSans } from "@/lib/fonts"
import { cn } from "@/lib/utils"
import { ThemeProvider } from "@/components/theme-provider"

import ToasterContext from "./context/ToasterContext"
import SessionContext from "./context/SessionContext"

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <>
      <html lang="en" suppressHydrationWarning>
        <body
          className={cn(
            "min-h-screen bg-background font-sans antialiased",
            fontSans.variable
          )}
        >
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
              <SessionContext>
                <ToasterContext />
                {children}
              </SessionContext>
          </ThemeProvider>
        </body>
      </html>
    </>
  )
}
