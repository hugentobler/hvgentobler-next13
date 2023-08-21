// Custom components for mdx files
// Inserted via mdx-remote

const customComponents = {
  h2: (props: any) => (
    <h2 {...props} className="bg-background mt-6 mb-3 text-3xl font-light tracking-tight leading-tight">
      {props.children}
    </h2>
  ),
  h3: (props: any) => (
    <h3 {...props} className="bg-background mt-6 mb-3 text-xl font-light tracking-tight leading-tight ">
      {props.children}
    </h3>
  ),
  p: (props: any) => (
    <p {...props} className="bg-background mb-3 text-sm leading-5">
      {props.children}
    </p>
  ),
  ol: (props: any) => (
    <ol {...props} className="bg-background list-decimal list-inside">
      {props.children}
    </ol>
  ),
  li: (props: any) => (
    <li {...props} className="bg-background mb-3 text-sm leading-5">
      {props.children}
    </li>
  )
}
export default customComponents
