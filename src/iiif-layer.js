import View from 'ol/View'
import TileLayer from 'ol/layer/Tile'
import IIIF from 'ol/source/IIIF'
import IIIFInfo from 'ol/format/IIIFInfo'

export function fitIIIFExtent (map, iiifTileSource) {
  const extent = iiifTileSource.getTileGrid().getExtent()

  map.setView(new View({
    resolutions: iiifTileSource.getTileGrid().getResolutions(),
    extent,
    constrainOnlyCenter: true
  }))

  map.getView().fit(iiifTileSource.getTileGrid().getExtent())
}

export function createIIIFTileSource (image) {
  const options = new IIIFInfo(image).getTileSourceOptions()
  if (options === undefined || options.version === undefined) {
    throw new Error('Data seems to be no valid IIIF image information.')
  }

  options.zDirection = -1
  return new IIIF(options)
}

export function createIIIFLayer (iiifTileSource) {
  const iiifLayer = new TileLayer()
  iiifLayer.setSource(iiifTileSource)
  return iiifLayer
}
