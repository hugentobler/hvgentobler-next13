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
      <div className="flex items-center z-20 relative -translate-y-2
        h-[calc(100svh-3rem)]
        md:min-h-[560px]
        ">
        {children}
      </div>
      <ScrollHandler />
    </>
  )
}
