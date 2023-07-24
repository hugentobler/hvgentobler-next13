import './globals.css'

import localFont from 'next/font/local'
import { themeEffect } from '@/components/theme-effect'
import Header from '@/components/header'

export const metadata = {
  title: 'Hugentobler',
  description: '',
  themeColor: 'transparent'
}

const univers = localFont({
  src: [
    { path: './fonts/UniversLTStd-ThinUltraCn.woff', weight: '250' },
    { path: './fonts/UniversLTStd-Cn.woff', weight: '300' },
    { path: './fonts/UniversLTStd.woff', weight: '400' }
  ],
  variable: '--font-univers'
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${univers.variable} antialiased`}
      suppressHydrationWarning={true} // For changing theme classname
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(${themeEffect.toString()})();`
          }}
        />
      </head>
      <body className="
        bg-background text-primary">
        <div className="h-screen max-w-screen-2xl mx-auto px-2 md:px-8">
          <Header />
          {children}
        </div>
      </body>
    </html>
  )
}
