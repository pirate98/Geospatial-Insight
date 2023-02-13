import { memo } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Toolbar from '@mui/material/Toolbar';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import { ViewProps } from '../types/GeoProps';
import { areaService } from '../service/TurfJSService';

export default memo(function StatistiquesView({loaded, data, height, coverage, floorNum} : ViewProps) {
  let landArea = loaded && data ? areaService(data, 100) : 0;
  let buildingArea = loaded && data ? areaService(data, coverage) : 0;
  let floorArea = floorNum * buildingArea;
  let volumn = buildingArea * height * floorNum;
  return (
    <div>
      <Toolbar>
        Statistiques
      </Toolbar>
      <Divider />
      <List>
        <ListItem>
          <Typography>Land Area: {landArea.toFixed(2)} m<sup>2</sup></Typography>
        </ListItem>
        <ListItem>
          <Typography>Building Area: {buildingArea.toFixed(2)} m<sup>2</sup></Typography>
        </ListItem>
        <ListItem>
          <Typography>Building Floor Area: {floorArea.toFixed(2)} m<sup>2</sup></Typography>
        </ListItem>
        <ListItem>
          <Typography>Volumn: {volumn.toFixed(2)}m<sup>2</sup></Typography>
        </ListItem>
        <ListItem>
          <Typography>Building Height: {height}m</Typography>
        </ListItem>
      </List>
    </div>
  )
});
