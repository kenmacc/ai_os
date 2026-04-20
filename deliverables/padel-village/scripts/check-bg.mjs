import sharp from 'sharp'

const meta = await sharp('./public/pv-logo.png').metadata()
console.log('Format:', meta.format)
console.log('Channels:', meta.channels)
console.log('Has alpha:', meta.hasAlpha)
console.log('Width:', meta.width, 'Height:', meta.height)

// Sample a corner pixel (should be transparent now)
const { data } = await sharp('./public/pv-logo.png').ensureAlpha().raw().toBuffer({ resolveWithObject: true })
const pixels = new Uint8Array(data)
console.log('Top-left pixel RGBA:', pixels[0], pixels[1], pixels[2], pixels[3])
