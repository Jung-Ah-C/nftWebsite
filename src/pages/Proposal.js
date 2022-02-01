import React from 'react';

// material UI
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';

// component
import Header from '../component/Header.js';
import Footer from '../component/Footer.js';
import ScrollToTop from '../component/ScrollToTop.js';

function Proposal() {
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
                        textAlign="center"
                    >
                        <Grid item xs={12}>
                            <h2>제휴문의</h2>
                            <br/>
                            <a href="mailto:nftprocloud@naver.com">
                                <h2>nftprocloud@naver.com</h2>
                            </a>
                        </Grid>
                    </Grid>
                </Box>
            </div>
            <ScrollToTop/>
            <div className="Footer">
                <Footer/>
            </div>
        </React.Fragment>
    );
}

export default Proposal;
