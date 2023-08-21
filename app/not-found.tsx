import Link from 'next/link'
import BlogHeader from '@/components/blog/header'

export default function NotFound() {
  return (
    <>
      <BlogHeader />
      <div>
        <h2>Not Found</h2>
        <p>Could not find requested resource</p>
        <Link href="/" prefetch={true}>Return Home</Link>
      </div>
    </>
  )
}
