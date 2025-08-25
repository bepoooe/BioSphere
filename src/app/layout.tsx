import "./globals.css";
import { GeistSans } from "geist/font/sans";
import { cn } from "@/lib/utils";
import { TooltipProvider } from "@/components/ui/tooltip";
import GridPattern from "@/components/magicui/grid-pattern";
import { Analytics } from "@vercel/analytics/react";
import { ClerkProvider } from '@clerk/nextjs'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={cn(GeistSans.variable, "font-sans")}>
          <GridPattern width={60} height={60} className="-z-10 opacity-70" />
          <TooltipProvider>{children}</TooltipProvider>
          <Analytics />
        </body>
      </html>
    </ClerkProvider>
  );
}
