import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'next/link';
import { useRouter } from 'next/router';

export default function TopAppbar() {
  const router = useRouter();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar sx={{justifyContent: 'space-between'}}>
          {/* <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton> */}
          <Typography variant="h6" component="span" onClick={() => { router.push('/') }}>
            MintTool
          </Typography>
          <div>
            <Button color="inherit" onClick={() => { router.push('/mint') }} >Mint</Button>
            <Button color="inherit" onClick={() => { router.push('/createnft') }} >CreateNFT</Button>
            <Button color="inherit" onClick={() => { router.push('/ticket') }} >Ticket</Button>
          </div>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
