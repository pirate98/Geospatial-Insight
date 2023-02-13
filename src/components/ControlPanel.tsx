import { ChangeEvent, memo } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Toolbar from '@mui/material/Toolbar';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import { Button, Slider, Stack } from '@mui/material';
import { GeoData } from '../types/GeoData'

interface Props {
  setLoaded: (value: boolean) => void;
  setData: (value: GeoData) => void;
  coverage: number;
  setCoverage: (value: number) => void;
  height: number;
  setHeight: (value: number) => void;
}

export default memo(function ControlPanel({ setLoaded, setData, coverage, setCoverage, height, setHeight } : Props) {
  const handleCoverage = (e : Event, value: number | number[]) => {
    e.preventDefault()
    const finalValue = Array.isArray(value) ? value[0] : value;
    setCoverage(finalValue);
  }

  const handleHeight = (e : Event, value : number | number[]) => {
    e.preventDefault()
    const finalValue = Array.isArray(value) ? value[0] : value;
    setHeight(finalValue)
  }

  const handleGeoJson = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const geoJson = e.target.files[0]
      const fileReader = new FileReader();
      fileReader.readAsText(geoJson, "utf-8")
      fileReader.onload = e => {
        const result = e.target?.result;
        if (typeof result == 'string' && JSON.parse(result)) {
          setLoaded(true)
          setData(JSON.parse(result))
        } else {
          alert('Invalid file format')
        }
      }
    } else {
      alert('Invalid behavior')
    }
  }

  return (
    <div>
      <Toolbar>
        <Button variant='contained' component='label'>
          Load GeoJson
          <input hidden accept='.geojson' type="file" onChange={handleGeoJson} />
        </Button>
      </Toolbar>
      <Divider />
      <List>
        <ListItem>lot coverage: %</ListItem>
        <ListItem>
          <Stack spacing={2} direction="row" alignItems="center" width="100%">
            <Typography>0</Typography>
            <Slider defaultValue={50} min={0.1} valueLabelDisplay="auto" value={coverage} onChange={handleCoverage} />
            <Typography>100</Typography>
          </Stack>
        </ListItem>
        <ListItem>floor height</ListItem>
        <ListItem>
          <Stack spacing={2} direction="row" alignItems="center" width="100%">
            <Typography>0</Typography>
            <Slider defaultValue={50} min={0.1} valueLabelDisplay="auto" value={height} onChange={handleHeight} />
            <Typography>100</Typography>
          </Stack>
        </ListItem>
      </List>
    </div>
  )
});
