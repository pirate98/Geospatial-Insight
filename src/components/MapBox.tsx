import { memo, useState, useEffect } from 'react';
import DeckGL from '@deck.gl/react/typed';
import { PolygonLayer } from '@deck.gl/layers/typed';
import Map from 'react-map-gl';
import { centerService, scalePolyService } from '../service/TurfJSService';
import {ViewProps} from '../types/GeoProps'

interface ViewState {
  latitude: number | undefined;
  longitude: number | undefined;
  zoom: number;
  bearing: number;
  pitch: number;
  transitionDuration?: number;
}

const MapBox = ({ loaded, data, coverage, height, floorNum }: ViewProps) => {
  const [initialViewState, setInitialViewState] = useState<ViewState>({
    latitude: 51.4,
    longitude: 0.45,
    zoom: 17,
    bearing: 0,
    pitch: 30
  })

  const scalePoly = data !== null ? scalePolyService(data, coverage) : undefined

  const layer = [
    new PolygonLayer({
      id: 'polygon-layer',
      data: scalePoly,
      filled: true,
      wireframe: true,
      extruded: true,
      lineWidthMinPixels: 1,
      getPolygon: d => d,
      getElevation: 30 * height / 100,
      elevationScale: 0.5,
      getFillColor: [200, 200, 0],
      getLineColor: [80, 80, 80],
      getLineWidth: d => 1
    }),
    new PolygonLayer({
      id: 'area-layer',
      data: data?.coordinates[0],
      getPolygon: d => d,
      getFillColor: [0, 250, 180, 50],
      getLineWidth: 0
    })
  ];

  useEffect(() => {
    const center = data !== null ? centerService(data) : null
    loaded && setInitialViewState({
      latitude: center?.geometry.coordinates[1],
      longitude: center?.geometry.coordinates[0],
      zoom: 17,
      bearing: 0,
      pitch: 30
    })
  }, [data, loaded])

  return (
    <DeckGL
      initialViewState={initialViewState}
      controller={true}
      layers={layer}
    >
      <Map
        mapStyle={process.env.REACT_APP_MAP_STYLE}
        mapboxAccessToken={process.env.REACT_APP_ACCESS_TOKEN}
      />
    </DeckGL>
  );
}

export default memo(MapBox);
