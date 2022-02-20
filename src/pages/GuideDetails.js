import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';

import Header from '../component/Header.js';
import Footer from '../component/Footer.js';
import ScrollToTop from '../component/ScrollToTop.js';
import { useParams } from 'react-router-dom';

export default function GuideDetails() {
    const [ data, setData ] = useState('');
    // useParams는 객체로 parameter 값들을 가져옴
    const id = useParams().id;

    useEffect(() => {
        axios.get(`http://15.164.49.215:3000/guides/${id}`).then((response) => {
        // console.log(response.data); 
        setData(response.data);
        });
    }, []);    

    return (
        <React.Fragment>
            <div className="AppBar">
                <Header/>
            </div>
            <Toolbar id="back-to-top-anchor" />
            
            {/* <div className="adfit"/> */}
            
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
                                src={data.image}
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
