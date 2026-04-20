import sharp from 'sharp'

const input = './public/pv-logo.png'
const output = './public/pv-logo.png'

const { data, info } = await sharp(input)
  .ensureAlpha()
  .raw()
  .toBuffer({ resolveWithObject: true })

const { width, height, channels } = info
const pixels = new Uint8Array(data)

for (let i = 0; i < pixels.length; i += channels) {
  const r = pixels[i], g = pixels[i + 1], b = pixels[i + 2]
  // If pixel is close to white, make it transparent
  if (r > 230 && g > 230 && b > 230) {
    pixels[i + 3] = 0
  }
}

await sharp(Buffer.from(pixels), { raw: { width, height, channels } })
  .png()
  .toFile(output)

console.log('Done — white background removed from', output)
