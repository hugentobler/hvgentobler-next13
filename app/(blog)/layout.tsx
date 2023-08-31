import './blog.css'
import BlogHeader from '@/components/blog/header'
import ScrollHandler from '@/components/blog/scroll-handler'

export default function BlogLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <BlogHeader />
      <div className="flex items-center py-4 md:py-0
        md:h-[calc(100vh-2rem-1.5rem)] md:min-h-[560px]
        ">
        {children}
      </div>
      <ScrollHandler />
    </>
  )
}
