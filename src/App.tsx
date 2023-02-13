import { useState } from 'react'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import HelpCenterIcon from '@mui/icons-material/HelpCenter'
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import MapBox from "./components/MapBox";
import ControlPanel from './components/ControlPanel';
import StatistiquesView from './components/StatistiquesView';
import { GeoData } from './types/GeoProps';
import './App.css';

const drawerWidth = 240;

interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window?: () => Window;
}

export default function App(props: Props) {
  const { window } = props;
  const [controlOpen, setControlOpen] = useState<boolean>(false);
  const [statisOpen, setStatisOpen] = useState<boolean>(false);
  const [loaded, setLoaded] = useState<boolean>(false);
  const [data, setData] = useState<GeoData | null>(null);
  const [coverage, setCoverage] = useState<number>(100);
  const [floorNum, setFloorNum] = useState<number>(100);
  const [height, setHeight] = useState<number>(100);

  const handleControlPanel = () => {
    setControlOpen(!controlOpen);
  };

  const handleStatistiques = () => {
    setStatisOpen(!statisOpen);
  }

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar style={{display: 'flex', justifyContent: 'space-between'}}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleControlPanel}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Geospatial Insight
          </Typography>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="end"
            onClick={handleStatistiques}
            sx={{ ml: 2, display: { sm: 'none' } }}
          >
            <HelpCenterIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      {/* settings */}
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="settings folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={controlOpen}
          onClose={handleControlPanel}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          <ControlPanel
            setLoaded={setLoaded}
            setData={setData}
            coverage={coverage}
            height={height}
            setCoverage={setCoverage}
            setHeight={setHeight}
            floorNum={floorNum}
            setFloorNum={setFloorNum}
          />
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          <ControlPanel
            setLoaded={setLoaded}
            setData={setData}
            coverage={coverage}
            height={height}
            setCoverage={setCoverage}
            setHeight={setHeight}
            floorNum={floorNum}
            setFloorNum={setFloorNum}
          />
        </Drawer>
      </Box>

      {/* main view */}
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
      >
        <Toolbar />
        <MapBox loaded={loaded} data={data} coverage={coverage} height={height} floorNum={floorNum} />
      </Box>

      {/* statistiques */}
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="statistiques folders"
      >
        <Drawer
          container={container}
          variant="temporary"
          open={statisOpen}
          onClose={handleStatistiques}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          <StatistiquesView loaded={loaded} data={data} height={height} coverage={coverage} floorNum={floorNum} />
        </Drawer>
        <Drawer
          anchor='right'
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          <StatistiquesView loaded={loaded} data={data} height={height} coverage={coverage} floorNum={floorNum} />
        </Drawer>
      </Box>
    </Box>
  );
}
