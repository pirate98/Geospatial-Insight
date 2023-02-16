import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Toolbar from '@mui/material/Toolbar';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import { ViewProps } from '../types/GeoProps';
import { areaService } from '../service/TurfJSService';

export default function StatistiquesView({loaded, data, height, coverage, floorNum} : ViewProps) {
  let landArea = loaded && data ? areaService(data, 100) : 0;
  let buildingArea = loaded && data ? areaService(data, coverage) : 0;
  let floorArea = floorNum * buildingArea;
  let volumn = buildingArea * height * floorNum;
  let buidlingElevation = 5 * height * floorNum / 100;
  return (
    <div>
      <Toolbar>
        Statistiques
      </Toolbar>
      <Divider />
      <List>
        <ListItem>
          <Typography><strong>Land Area:</strong>{landArea.toFixed(2)} m<sup>2</sup></Typography>
        </ListItem>
        <ListItem>
          <Typography><strong>Building Area: </strong>{buildingArea.toFixed(2)} m<sup>2</sup></Typography>
        </ListItem>
        <ListItem>
          <Typography><strong>Building Floor Area: </strong>{floorArea.toFixed(2)} m<sup>2</sup></Typography>
        </ListItem>
        <ListItem>
          <Typography><strong>Volumn: </strong>{volumn.toFixed(2)}m<sup>2</sup></Typography>
        </ListItem>
        <ListItem>
          <Typography><strong>Building Height: </strong>{buidlingElevation}m</Typography>
        </ListItem>
      </List>
    </div>
  )
};
