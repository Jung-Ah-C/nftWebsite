import React from 'react';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Container from '@mui/material/Container';
import TwitterIcon from '@mui/icons-material/Twitter';
import Grid from '@mui/material/Grid';
import {FaDiscord} from 'react-icons/fa';

import logo from '../img/logo.png';
import hanguelLogo from '../img/hanguelLogo.png';

export default function Header() {
    return (
        <>
            <AppBar position="fixed" color="default" sx={{ height: 100, justifyContent: 'center' }}>
                <Container maxWidth="xl">
                    <Toolbar disableGutters>
                        <Grid xs={4}>
                            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex', justifyContent: 'start' } }}>
                                <a href="/">
                                    <img
                                        alt="hanguelLogo"
                                        src={hanguelLogo}
                                        style={{ width:250, height:100, margin:'auto' }}
                                        
                                    />
                                </a>
                            </Box>
                        </Grid>
                        <Grid xs={4}>
                            {/*  */}
                            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex', justifyContent: 'center' } }}>
                                <a href="/">
                                    <img
                                        alt="logo"
                                        src={logo}
                                        style={{ width:210, height:140, margin:'auto' }}
                                        
                                    />
                                </a>
                            </Box>
                            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none', justifyContent: 'center' } }}>
                                <a href="/">
                                    <img
                                        alt="hanguelLogo"
                                        src={hanguelLogo}
                                        style={{ width:250, height:100, margin:'auto' }}
                                        
                                    />
                                </a>
                            </Box>
                        </Grid>
                        <Grid xs={4}>
                            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'flex', justifyContent: 'end' } }}>
                                <IconButton sx={{ p: 0 }}>
                                    <TwitterIcon/>
                                    {/* <FaDiscord/> */}
                                </IconButton>
                            </Box>
                        </Grid>
                    </Toolbar>
                </Container>
            </AppBar>
        </>

    )
}