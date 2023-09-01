// Generate blur placeholder for mdx images
// Generate height and width for next <Image>

import path from 'path'
import { promises as fs } from 'fs'
import { getPlaiceholder } from 'plaiceholder'
import sizeOf from 'image-size'

export default async function ImageProperties(src: string) {
  const dir = path.join(process.cwd(), 'public');
  const file = await fs.readFile(dir + src)
  // Get placeholder
  const { base64 } = await getPlaiceholder(file)
  // Get image height and width
  const { height, width } = sizeOf(file)
  return {
    base64,
    height,
    width
  }
}
