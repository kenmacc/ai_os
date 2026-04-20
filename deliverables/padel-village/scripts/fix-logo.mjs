import sharp from 'sharp'

const { data, info } = await sharp('./public/pv-logo.png')
  .ensureAlpha()
  .raw()
  .toBuffer({ resolveWithObject: true })

const { width, height, channels } = info
const pixels = new Uint8Array(data)

for (let i = 0; i < pixels.length; i += channels) {
  const r = pixels[i], g = pixels[i + 1], b = pixels[i + 2], a = pixels[i + 3]
  if (a === 0) continue // already transparent, skip

  const isGold = r > 140 && g > 100 && b < 120 && r > b && r > g * 0.8
  const isDark = r < 100 && g < 100 && b < 120

  if (isDark) {
    // Turn dark navy/black to white
    pixels[i] = 255
    pixels[i + 1] = 255
    pixels[i + 2] = 255
  } else if (!isGold) {
    // Any other non-gold, non-dark pixel — make transparent if near-white
    const brightness = (r + g + b) / 3
    if (brightness > 200) {
      pixels[i + 3] = 0
    }
  }
}

await sharp(Buffer.from(pixels), { raw: { width, height, channels } })
  .png()
  .toFile('./public/pv-logo.png')

console.log('Done')
