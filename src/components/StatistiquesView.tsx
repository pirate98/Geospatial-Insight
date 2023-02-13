import { memo } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Toolbar from '@mui/material/Toolbar';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';

export default memo(function StatistiquesView() {
  return (
    <div>
      <Toolbar>
        Statistiques
      </Toolbar>
      <Divider />
      <List>
        <ListItem>
          <Typography>Land Area</Typography>
        </ListItem>
        <ListItem>
          <Typography>Land Area</Typography>
        </ListItem>
        <ListItem>
          <Typography>Building Area</Typography>
        </ListItem>
        <ListItem>
          <Typography>Building Floor Area</Typography>
        </ListItem>
        <ListItem>
          <Typography>Volumn</Typography>
        </ListItem>
        <ListItem>
          <Typography>Building Height</Typography>
        </ListItem>
      </List>
    </div>
  )
});
