export const MAX_TEXTURE_SIZE = 8192
export const MAX_TILES = (MAX_TEXTURE_SIZE / 512) ** 2

async function fetchImage (url) {
  const response = await fetch(url)

  if (!response.ok) {
    throw new Error(response.statusText)
  }
  return response
}

export function loadImage (url) {
  return new Promise((resolve, reject) => {
    const image = new Image()

    image.addEventListener('load', () => resolve(image))
    image.addEventListener('error', async () => {
      // image.src errors are not at all descriptive
      // load image again using fetch
      try {
        await fetchImage(url)
        // TODO: what happens if image.src results in error, but fetch doesn't?
      } catch (err) {
        reject(err.message)
      }
    })

    image.crossOrigin = 'anonymous'
    image.src = url
  })
}
