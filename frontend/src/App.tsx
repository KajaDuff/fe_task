

import './App.css'
import { Outlet } from 'react-router-dom';
import { CustomAppBar } from './components/AppBar/AppBar'
import { Box, CssBaseline } from '@mui/material';


function App() {

  return (
    <>
      <CssBaseline />
      <CustomAppBar />
      <div >
        <Box display="flex" flexGrow={1} flexDirection="column">
          <Outlet />
        </Box>
      </div>
    </>
  )
}

export default App
