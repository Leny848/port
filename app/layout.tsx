export const metadata = {
  title: 'Chukwuma Promise - Portfolio',
  description: 'Full Stack Developer Portfolio',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
