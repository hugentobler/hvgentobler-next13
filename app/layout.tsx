import './globals.css'
import localFont from 'next/font/local'
import Header from './Header'

export const metadata = {
  title: 'Hugentobler',
  description: 'Generated by create next app',
}

const univers = localFont({
  src: [
    { path: './fonts/UniversLTStd-ThinUltraCn.woff', weight: '250' },
    { path: './fonts/UniversLTStd-Cn.woff', weight: '300' },
    { path: './fonts/UniversLTStd.woff', weight: '400' }
  ]
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={univers.className}>
      <body className="
        bg-zinc-50 text-zinc-700">
        <div className="h-screen max-w-7xl mx-auto px-3">
          <Header />
          {children}
        </div>
      </body>
    </html>
  )
}
