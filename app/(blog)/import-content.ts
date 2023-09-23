import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import readingTime from 'reading-time'

export interface FrontMatter {
  dateModified: string;
  datePublished: string;
  description: string;
  title: string;
}

// Read the filesystem and return the content
// Handle the frontmatter with gray matter
export function getPost(slug: string) {
  const markdownFile = fs.readFileSync(path.join('blog', slug + '.mdx'), 'utf-8')
  // gray-matter returns the parsed YAML frontmatter as data, and the rest as content
  const { data, content } = matter(markdownFile)
  const frontMatter: FrontMatter = data as FrontMatter
  return {
    ...frontMatter,
    content,
    datePublishedText: new Date(data.datePublished).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' }),
    wordCount: readingTime(content).words.toLocaleString()
  }
}

// Helper function to recursively read all files in folder
export function getFilesInFolder(dir: string, files: string[] = []) {
  // Get an array of all files and directories in the passed directory using fs.readdirSync
  const fileList = fs.readdirSync(path.join(dir))
  // Create the full path of the file/directory by concatenating the passed directory and file/directory name
  for (const file of fileList) {
    const name = `${dir}/${file}`
    // Check if the current file/directory is a directory using fs.statSync
    if (fs.statSync(name).isDirectory()) {
      // If it is a directory, recursively call the getFiles function with the directory path and the files array
      getFilesInFolder(name, files)
    } else {
      // If it is a file, push the full path to the files array
      files.push(name)
    }
  }
  return files
}
