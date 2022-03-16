import React from 'react';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Container from '@mui/material/Container';
import TwitterIcon from '@mui/icons-material/Twitter';
import Grid from '@mui/material/Grid';
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { SidebarData } from './SidebarData';

import hanguelLogo from '../img/hanguelLogo.png';
import { SiKakaotalk } from "react-icons/si";

export default function Header() {
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };
    
    return (
        <>
            <AppBar position="fixed" sx={{ height: 100, justifyContent: 'center', backgroundColor : "#FFFFFF" }}>
                <Container maxWidth="false">
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
                            {/* 햄버거 메뉴 (모바일) */}
                            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
                                <IconButton
                                size="large"
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleOpenNavMenu}
                                color="default"
                                >
                                <MenuIcon />
                                </IconButton>
                                <Menu
                                id="menu-appbar"
                                anchorEl={anchorElNav}
                                anchorOrigin={{
                                    vertical: "bottom",
                                    horizontal: "left"
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: "top",
                                    horizontal: "left"
                                }}
                                open={Boolean(anchorElNav)}
                                onClose={handleCloseNavMenu}
                                sx={{
                                    display: { xs: "block", md: "none" }
                                }}
                                >
                                {SidebarData.map((item, index) => (
                                    <MenuItem key={index} onClick={handleCloseNavMenu} style={{ textDecoration: 'none' }}>
                                        <Link to={item.path} style={{ textDecoration: 'none', color: 'inherit' }}>
                                            {item.icon}
                                            <span> {item.title}</span>
                                        </Link>
                                    </MenuItem>
                                ))}
                                </Menu>
                            </Box>
                        </Grid>
                        <Grid xs={4}>
                            {/* 중앙 / 데스크탑 버전 */}
                            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex', justifyContent: 'center' }, minWidth : 380 }}>
                                {/* 로고 */}
                                {/* <a href="/">
                                    <img
                                        alt="logo"
                                        src={logo}
                                        style={{ width:210, height:140, margin:'auto' }}
                                        
                                    />
                                </a> */}
                                {SidebarData.map((item, index) => (
                                    <Button
                                    key={index}
                                    onClick={handleCloseNavMenu}
                                    sx={{ my: 2, color: "black", display: "block" }}
                                  >
                                    <Link to={item.path} style={{ textDecoration: 'none', color: 'inherit' }}>
                                        {item.title}
                                    </Link>
                                  </Button>
                                ))}
                            </Box>
                            {/* 중앙로고 / 모바일 버전 */}
                            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none', justifyContent: 'center' } }}>
                                <a href="/">
                                    <img
                                        alt="hanguelLogo"
                                        src={hanguelLogo}
                                        style={{ width:200, height:'auto', margin:'auto' }}
                                        
                                    />
                                </a>
                            </Box>
                        </Grid>
                        {/* SNS 로고 */}
                        <Grid xs={4}>
                            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'flex', justifyContent: 'end' } }}>
                                <IconButton sx={{ p: 0, marginRight: 1 }}>
                                    <a href="https://open.kakao.com/o/gRFLV7Xd" alt="openKakaoLink" style={{ color : '#FFE523' }}><SiKakaotalk/></a>
                                </IconButton>
                                <IconButton sx={{ p: 0, marginRight: 1 }}>
                                    <a href="https://twitter.com/NFTPROCLOUD" alt="twitterLink" style={{ color : '#33B0FF' }}><TwitterIcon/></a>
                                </IconButton>
                            </Box>
                        </Grid>
                    </Toolbar>
                </Container>
            </AppBar>
        </>

    )
}