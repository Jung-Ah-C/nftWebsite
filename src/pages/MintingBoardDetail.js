import React, {useState, useEffect} from 'react'
import axios from 'axios';
import { Link, useParams } from "react-router-dom";

// components
import Header from '../component/Header.js';
import ScrollToTop from '../component/ScrollToTop.js';
import Footer from '../component/Footer.js';
import Comments from '../component/Comments.js';

// material UI
import Toolbar from '@mui/material/Toolbar';

// semantic UI
import { 
    Container,
    Header as HeaderName,
    Divider,
    Icon,
    Image,
    Grid,
    Label,
    Button,
    Input

} from 'semantic-ui-react';

function MintingBoardDetail () {
    // 상세정보 API
    const params = useParams();
    const [boardData, setBoardData] = useState('');
    const [images, setImages] = useState('');
    useEffect(() => {
        // 상세정보 가져오기
        axios.get(`http://15.164.49.215:3000/boards/${params.id}`)
            .then((response) => {
                setBoardData(response.data);
                
                // 이미지 가져오기
                axios.get(`http://15.164.49.215:3000/boards/${params.id}/images`)
                    .then((responseImages) => {
                        setImages(responseImages);
                    }).catch(err => console.log('cannot get images.', err));
            }).catch(err => {
                console.log('Cannot get boardData.', err);
            })
    }, [])

    return (
        <React.Fragment>
            <div className="AppBar">
                <Header/>
            </div>
            <Toolbar id="back-to-top-anchor" />
            <div className="content">

                <HeaderName as="h1" dividing>
                    <Container textAlign="center">제목</Container>
                </HeaderName>
                <Grid centered>
                    <Grid.Row>
                        <Image size="medium" rounded centered />
                    </Grid.Row>
                </Grid>
                <br />
                <Divider horizontal>
                <HeaderName as="h4">
                <Icon name="comment alternate" />
                    내용
                </HeaderName>
                </Divider>
                <Container textAlign="center">
                
                </Container>
                <Comments />
                <br />
            </div>
            <ScrollToTop/>
            <div className="Footer">
                <Footer/>
            </div>
        </React.Fragment>
    )
}

export default MintingBoardDetail