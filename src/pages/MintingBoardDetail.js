import React, {useState, useEffect} from 'react'
import axios from 'axios';
import { Link, useParams } from "react-router-dom";

// components
import Header from '../component/Header.js';
import ScrollToTop from '../component/ScrollToTop.js';
import Footer from '../component/Footer.js';

// material UI
import Toolbar from '@mui/material/Toolbar';

function MintingBoardDetail () {
    // 상세정보 API
    const params = useParams();
    const [boardData, setBoardData] = useState('');
    const [images, setImages] = useState('');
    const [replys, setReplys] = useState('');
    useEffect(() => {
        // 상세정보 가져오기
        axios.get(`http://180.228.243.235/boards/${params.id}`)
            .then((response) => {
                setBoardData(response.data);
                
                // 이미지 가져오기
                axios.get(`http://180.228.243.235/boards/${params.id}/images`)
                    .then((responseImages) => {
                        setImages(responseImages);
                    })
                    .catch(err => console.log('cannot get images.', err));
            // 댓글 가져오기
            }).then(() => {
                axios.get(`http://180.228.243.235/boards/${params.id}/replys`)
                    .then((response) => {
                        setReplys(response.data);
                    }).catch(err => console.log('Cannot get comments.', err));
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
                
            </div>
            <ScrollToTop/>
            <div className="Footer">
                <Footer/>
            </div>
        </React.Fragment>
    )
}

export default MintingBoardDetail