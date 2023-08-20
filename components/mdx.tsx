// Custom components for mdx files
// Inserted via mdx-remote

const customComponents = {
  h3: (props: any) => (
    <h3 {...props} className="font-thin">
      {props.children}
    </h3>
  ),
}
export default customComponents
