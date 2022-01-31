import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';

import Header from '../component/Header.js';
import Footer from '../component/Footer.js';
import ScrollToTop from '../component/ScrollToTop.js';
import NFT from '../img/NFT.jpg';

// https://antdev.tistory.com/80

export default function GuideDetails({ history, location, match }) {
    const [ data, setData ] = useState('');
    // const { no } = match.params;
    // useEffect(() => {
    //     axios.get(`/guide/`+no).then((response) => {
    //     console.log(response.data);    
    //     setData(response.data);
    //     });
    // }, []);    

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
                        <div className="guideImage">
                            <img
                                alt="NFT"
                                src={NFT}
                                style={{ width: '50%', height:'auto' }}
                            />
                        </div>
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
