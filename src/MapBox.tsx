import { memo } from 'react';
import DeckGL from '@deck.gl/react/typed';
import { PolygonLayer } from '@deck.gl/layers/typed';
import Map from 'react-map-gl';
import { GeoData } from './types/GeoData'
import { centerService, scalePolyService } from './service/TurfJSService';

interface Props {
  loaded: boolean;
  data: GeoData | null;
  coverage: number;
}

const MapBox = ({ loaded, data, coverage }: Props) => {
  let valid = loaded && data !== null

  const INITIAL_VIEW_STATE = {
    latitude: 51.4,
    longitude: 0.45,
    zoom: 17,
    bearing: 0,
    pitch: 30
  };

  const center = data !== null ? centerService(data) : null
  const scalePoly = data !== null ? scalePolyService(data, coverage) : undefined

  const VIEW_STATE = {
    latitude: center?.geometry.coordinates[1],
    longitude: center?.geometry.coordinates[0],
    zoom: 17,
    bearing: 0,
    pitch: 30
  };

  const layer = [
    new PolygonLayer({
      id: 'polygon-layer',
      data: scalePoly,
      filled: true,
      wireframe: true,
      extruded: true,
      lineWidthMinPixels: 1,
      getPolygon: d => d,
      getElevation: 10,
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

  return (
    <DeckGL
      initialViewState={INITIAL_VIEW_STATE}
      viewState={valid ? VIEW_STATE : undefined}
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
