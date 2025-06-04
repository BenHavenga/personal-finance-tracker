import "./globals.css";

export const metadata = {
  title: "Personal Finance Tracker",
  description:
    "Track your income, expenses, and budget with a sleek, client-side finance dashboard. Built with Next.js, TailwindCSS, and Chart.js.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className="bg-white text-neutral-900 dark:bg-neutral-950 dark:text-white transition-colors duration-300">
        {children}
      </body>
    </html>
  );
}
