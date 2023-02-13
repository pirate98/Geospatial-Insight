import * as turf from '@turf/turf';
import { GeoData } from '../types/GeoData';

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

export { scalePolyService, centerService }