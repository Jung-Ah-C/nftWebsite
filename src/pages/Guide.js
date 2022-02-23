import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

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

import Header from '../component/Header.js';
import Footer from '../component/Footer.js';
import ScrollToTop from '../component/ScrollToTop.js';

export default function Guide() {
    const [tableData, setTableData] = useState('');
    useEffect(() => {
        axios.get(`http://180.228.243.235/guides`).then((response) => {
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
                                <Table stickyHeader sx={{ minWidth: 650 }}>
                                    <TableHead>
                                        <TableRow>
                                            {/* <TableCell align="center" width="10%"><b>글번호</b></TableCell> */}
                                            <TableCell align="center" width="10%"><b>제목</b></TableCell>
                                            <TableCell align="center" width="10%"><b>작성자</b></TableCell>
                                            <TableCell align="center" width="10%"><b>작성날짜</b></TableCell>
                                            {/* <TableCell align="center" width="10%"><b>조회수</b></TableCell> */}
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                    { 
                                        tableData && tableData.map((row) => (
                                            <TableRow key={row.id} scope={row}>
                                                {/* <TableCell align="center">{row.id}</TableCell> */}
                                                <TableCell align="center">
                                                    <a href={"/guide/"+row.id}>{row.title}</a>
                                                </TableCell>
                                                <TableCell align="center">관리자</TableCell>
                                                <TableCell align="center">{row.createdAt.slice(0,10)}</TableCell>
                                                {/* <TableCell align="center">{row.readCount}</TableCell> */}
                                            </TableRow>
                                        ))
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