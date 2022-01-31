import React, {useState, useEffect} from 'react';
import axios from 'axios';

import { BsLink45Deg } from "react-icons/bs";
import { BsDiscord } from "react-icons/bs";
import { BsTwitter } from "react-icons/bs";

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Tooltip from "@mui/material/Tooltip";
import { Link } from 'react-router-dom';

import Header from '../component/Header.js';
import Footer from '../component/Footer.js';
import ScrollToTop from '../component/ScrollToTop.js';

export default function Home() {
    const [tableData, setTableData] = useState('');
    useEffect(() => {
        axios.get(`/schedules`).then((response) => {
        console.log(response.data);    
        setTableData(response.data);
        });
    }, []);
    
    return (
        <React.Fragment>
            <div className="AppBar">
                <Header/>
            </div>
            <Toolbar id="back-to-top-anchor" />
            <div className="content">
                <Box 
                    sx={{ 
                        marginTop : 20,
                        height: 'auto',
                        marginBottom : 7
                    }}
                >
                    <Grid 
                        container 
                        justifyContent="center" 
                        alignItems="center"
                    >
                        <Grid item xs={11}>
                            <TableContainer component={Paper}>
                                <Table stickyHeader sx={{ minWidth: 800 }}>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell align="center" width="10%"><b>프로젝트</b></TableCell>
                                            <TableCell align="center" width="10%"></TableCell>
                                            <TableCell align="center" width="10%"><b>민팅가격</b></TableCell>
                                            <Tooltip title="시장 상황에 따라 가격이 변동될 수 있습니다.">
                                                <TableCell align="center" width="10%"><b>시장가격</b></TableCell>
                                            </Tooltip>
                                            <TableCell align="center" width="10%"><b>링크</b></TableCell>
                                            <TableCell align="center" width="10%"><b>날짜</b></TableCell>
                                            <TableCell align="center" width="10%"><b>수량</b></TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                    { 
                                        tableData ? tableData.map((row) => (
                                            <TableRow key={row.id} scope={row}>
                                                <TableCell align="center">
                                                    <Link to={`/${row.id}`}><img src={row.image} width="150" height="150"/></Link>
                                                </TableCell>
                                                <TableCell align="center">
                                                    <Link to={`/${row.id}`}>{row.name}</Link>
                                                </TableCell>
                                                <TableCell align="center">{row.price}</TableCell>
                                                <TableCell align="center">{row.high_price}</TableCell>
                                                <TableCell align="center">
                                                    <a href={row.weblink} style={{ color: 'gray' }} alt="webLink"><BsLink45Deg style={{ width: '20', height: '20' }}/></a>
                                                    <a href={row.twitlink} style={{ color: 'gray' }} alt="twitterLink"><BsTwitter style={{ width: '20', height: '20' }}/></a>
                                                    <a href={row.discordlink} style={{ color: 'gray' }} alt="discordLink"><BsDiscord style={{ width: '20', height: '20' }}/></a>
                                                </TableCell>
                                                <TableCell align="center">{row.date}</TableCell>
                                                <TableCell align="center">{row.count}</TableCell>
                                            </TableRow>
                                        )) : '' 
                                    }
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Grid>
                    </Grid>
                </Box>
            </div>
            <ScrollToTop/>
            <div className="Footer">
                <Footer/>
            </div>
        </React.Fragment>
    )
}