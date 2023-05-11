import "@/styles/globals.css"
import { fontSans } from "@/lib/fonts"
import { cn } from "@/lib/utils"
import ActiveStatus from "@/components/active-status"
import { ThemeProvider } from "@/components/theme-provider"

import SessionContext from "./context/SessionContext"
import ToasterContext from "./context/ToasterContext"

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
              <ActiveStatus />
              {children}
            </SessionContext>
          </ThemeProvider>
        </body>
      </html>
    </>
  )
}
