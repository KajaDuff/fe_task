import { useState } from 'react'
import { AppBar, Box, CssBaseline, Divider, Drawer, IconButton, List, ListItem, ListItemButton, ListItemText, Toolbar, Typography, Button } from '@mui/material'

import { Menu as MenuIcon } from '@mui/icons-material'
import { Link } from 'react-router-dom'


const DRAWER_WIDTH = 240
const NAV_ITEMS = [{ id: 1, path: '/', title: 'Home' }, { id: 2, path: '/attributes', title: 'Attributes' }]
const APP_TITLE = 'Simple React App'

export const CustomAppBar = () => {

  const [mobileOpen, setMobileOpen] = useState(false)

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState)
  }


  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        {APP_TITLE}
      </Typography>
      <Divider />
      <List>
        {NAV_ITEMS.map((item) => (
          <ListItem key={item.id} disablePadding>
            <ListItemButton component={Link} to={item.path} sx={{ textAlign: 'center' }} >
              <ListItemText primary={item.title} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  )


  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar component="nav">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ display: { sm: 'none' }, mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ display: { sm: 'block', xs: 'none' }, flexGrow: 1, textAlign: 'start' }}
          >
            {APP_TITLE}
          </Typography>
          <Box sx={{ display: { sm: 'block', xs: 'none' } }}>
            {NAV_ITEMS.map((item) => (
              <Button key={item.id} sx={{ color: '#fff' }} component={Link} to={item.path} onClick={() => localStorage.clear()}>
                {item.title}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </AppBar>
      <nav>
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: DRAWER_WIDTH },
            display: { sm: 'none', xs: 'block' },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
    </Box >

  )
}
