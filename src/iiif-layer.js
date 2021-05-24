import ol from 'ol'

function createIIIFTileSource (image) {
  const options = new ol.format.IIIFInfo(image).getTileSourceOptions()
  if (options === undefined || options.version === undefined) {
    throw new Error('Data seems to be no valid IIIF image information.')
  }

  options.zDirection = -1
  return new ol.source.IIIF(options)
}

export class IIIFLayer extends ol.layer.Tile {
  constructor (image) {
    super()

    const iiifTileSource = createIIIFTileSource(image)
    this.setSource(iiifTileSource)
  }

  getExtent () {
    return this.getSource().getTileGrid().getExtent()
  }

  getView () {
    return new ol.View({
      resolutions: this.getSource().getTileGrid().getResolutions(),
      extent: this.getExtent(),
      constrainOnlyCenter: true,
      enableRotation: false
    })
  }
}
