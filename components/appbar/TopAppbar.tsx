import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { useRouter } from 'next/router';
import { ButtonBase } from '@mui/material';

export default function TopAppbar() {
  const router = useRouter();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          {/* <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton> */}
          <ButtonBase onClick={() => { router.push('/') }}>
            <Typography variant="h6" component="span">
              MintTool
            </Typography>
          </ButtonBase>
          <div>
            <Button color="inherit" onClick={() => { router.push('/mint') }} >Mint</Button>
            <Button color="inherit" onClick={() => { router.push('/createnft') }} >CreateNFT</Button>
            <Button color="inherit" onClick={() => { router.push('/mypage') }} >MyPage</Button>
            <Button color="inherit" onClick={() => { router.push('/ticket') }} >Ticket</Button>
          </div>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
