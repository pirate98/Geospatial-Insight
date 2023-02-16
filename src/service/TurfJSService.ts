import * as turf from '@turf/turf';
import { GeoData } from '../types/GeoProps';

const scalePolyService = (data: GeoData, coverage: number) => {
  const poly = turf.polygon(data.coordinates[0])
  const scaledPoly = turf.transformScale(poly, coverage / 100).geometry.coordinates
  return scaledPoly
}

const centerService = (data: GeoData) => {
  const features = turf.points(data.coordinates[0][0])
  const center = turf.center(features)
  return center
}

const areaService = (data : GeoData, coverage: number) => {
  const polygon = turf.polygon(data.coordinates[0])
  const scaledPoly = turf.transformScale(polygon, coverage / 100)
  let area = turf.area(scaledPoly)
  return area
}

export { scalePolyService, centerService, areaService }