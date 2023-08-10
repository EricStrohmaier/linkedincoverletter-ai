import './globals.css'

export const metadata = {
  title: 'LinkedIn Cover Letter',
  description: 'Ai Generated cover letters for LinkedIn applications',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <main className="flex flex-col items-center min-h-screen bg-background">
          {children}
        </main>
      </body>
    </html>
  )
}
