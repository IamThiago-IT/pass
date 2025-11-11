import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { ThemeProvider } from "@/components/theme-provider";

import "./globals.css";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    template: "%s | Acme",
    default: "Acme",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <html lang="en" suppressHydrationWarning>
        <body>
          <SidebarProvider>
            <AppSidebar />
            <main className="w-full">
              <div className="px-6 pt-4">
                <SidebarTrigger />
              </div>
              <ThemeProvider
                attribute="class"
                defaultTheme="system"
                enableSystem
                disableTransitionOnChange
              >
                {children}
              </ThemeProvider>
            </main>
          </SidebarProvider>
        </body>
      </html>
    </>
  );
}
