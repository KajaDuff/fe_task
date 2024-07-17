

import './App.css'
import { Outlet } from 'react-router-dom'
import { CustomAppBar } from './components/AppBar/AppBar'
import { CssBaseline, Toolbar } from '@mui/material'


function App() {

  return (
    <>
      <CssBaseline />
      <CustomAppBar />
      <Toolbar />
      <div>
        <Outlet />
      </div>
    </>
  )
}

export default App
