import React, {useState, useEffect} from 'react';
import axios from 'axios';
import './Home.css';

import { BsLink45Deg } from "react-icons/bs";
import { BsDiscord } from "react-icons/bs";
import { BsTwitter } from "react-icons/bs";

// material UI
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
import Collapse from '@mui/material/Collapse';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';

// bootStrap
import { Carousel } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

// components
import Header from '../component/Header.js';
import Footer from '../component/Footer.js';
import ScrollToTop from '../component/ScrollToTop.js';
import mobileGuide from '../img/mobileGuide.png';

// 향후 상세 정보 기능 만들 때 쓸 예정
function Row(props) {
    const { row } = props;
    const [open, setOpen] = React.useState(false);
  
    return (
      <React.Fragment>
        <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
          <TableCell>
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={() => setOpen(!open)}
            >
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </TableCell>
          <TableCell component="th" scope="row">
            {row.name}
          </TableCell>
          <TableCell align="right">{row.calories}</TableCell>
          <TableCell align="right">{row.fat}</TableCell>
          <TableCell align="right">{row.carbs}</TableCell>
          <TableCell align="right">{row.protein}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box sx={{ margin: 1 }}>
                <Typography variant="h6" gutterBottom component="div">
                  민팅정보 (향후 업데이트 예정입니다.)
                </Typography>
                <Table size="small" aria-label="details">
                  <TableHead>
                    <TableRow>
                      <TableCell>종류</TableCell>
                      <TableCell>날짜</TableCell>
                      <TableCell>시간</TableCell>
                      <TableCell>민팅수량</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {/* 프리 */}
                      <TableRow>
                        <TableCell>프리</TableCell>
                        <TableCell>-</TableCell>
                        <TableCell>-</TableCell>
                        <TableCell>-</TableCell>
                      </TableRow>
                    {/* OG */}
                      <TableRow>
                        <TableCell>OG</TableCell>
                        <TableCell>-</TableCell>
                        <TableCell>-</TableCell>
                        <TableCell>-</TableCell>
                      </TableRow>
                    {/* WL */}
                      <TableRow>
                        <TableCell>WL</TableCell>
                        <TableCell>-</TableCell>
                        <TableCell>-</TableCell>
                        <TableCell>-</TableCell>
                      </TableRow>
                    {/* 퍼블릭 */}
                      <TableRow>
                        <TableCell>퍼블릭</TableCell>
                        <TableCell>-</TableCell>
                        <TableCell>-</TableCell>
                        <TableCell>-</TableCell>
                      </TableRow>
                  </TableBody>
                </Table>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      </React.Fragment>
    );
  }

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
                {/* 모바일 버전  */}
                <Box sx={{ marginTop : 10, display: { xs: "flex", md: "none" }, textAlign : 'center' }}>
                    <img src={mobileGuide} width={400} height='auto'/>
                </Box>
                <Box 
                    className="home-content"
                    sx={{ 
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
                                            <TableCell align="center" width="20%"><b>프로젝트</b></TableCell>
                                            <TableCell align="center" width="10%"></TableCell>
                                            <Tooltip title="시장 상황에 따라 가격이 변동될 수 있습니다.">
                                                <TableCell align="center" width="10%"><b>최고가</b></TableCell>
                                            </Tooltip>
                                            <TableCell align="center" width="20%"><b>링크</b></TableCell>
                                            <TableCell align="center" width="20%"><b>민팅날짜</b></TableCell>
                                            <TableCell align="center" width="10%"><b>민팅가격</b></TableCell>
                                            <TableCell align="center" width="10%"><b>수량</b></TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                    {
                                        tableData ? tableData.map((row) => (
                                            <TableRow key={row.id} scope={row}>

                                                <TableCell align="center">
                                                    <Carousel variant="dark" indicators={false}>
                                                        <Carousel.Item>
                                                            <img
                                                            className="d-block w-100"
                                                            src={row.image}
                                                            alt="First slide" 
                                                            maxWidth="150"
                                                            height="auto"
                                                            />
                                                        </Carousel.Item>
                                                        <Carousel.Item>
                                                            <img
                                                            className="d-block w-100"
                                                            src={row.image}
                                                            alt="Second slide"
                                                            maxWidth="150"
                                                            height="auto"
                                                            />
                                                        </Carousel.Item>
                                                        <Carousel.Item>
                                                            <img
                                                            className="d-block w-100"
                                                            src={row.image}
                                                            alt="Third slide"
                                                            maxWidth="150"
                                                            height="auto"
                                                            />
                                                        </Carousel.Item>
                                                    </Carousel>
                                                </TableCell>
                                                <TableCell align="center">
                                                    {row.name}
                                                </TableCell>
                                                <TableCell align="center" style={{ color: 'red' }}>{row.high_price}</TableCell>
                                                <TableCell align="center">
                                                    <a href={row.weblink} style={{ color: 'gray' }} alt="webLink"><BsLink45Deg style={{ width: '20', height: '20' }}/></a>
                                                    <a href={row.twitlink} style={{ color: 'gray' }} alt="twitterLink"><BsTwitter style={{ width: '20', height: '20' }}/></a>
                                                    <a href={row.discordlink} style={{ color: 'gray' }} alt="discordLink"><BsDiscord style={{ width: '20', height: '20' }}/></a>
                                                </TableCell>
                                                <TableCell align="center">{row.date}</TableCell>
                                                <TableCell align="center">{row.price}</TableCell>
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