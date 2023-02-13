export interface GeoData {
  type: string;
  coordinates: [][][][]
}
export interface CtrlProps {
  setLoaded: (value: boolean) => void;
  setData: (value: GeoData) => void;
  coverage: number;
  setCoverage: (value: number) => void;
  height: number;
  setHeight: (value: number) => void;
  floorNum: number;
  setFloorNum: (value: number) => void;
}

export interface ViewProps {
  loaded: boolean;
  data: GeoData | null;
  height: number;
  coverage: number;
  floorNum: number;
}