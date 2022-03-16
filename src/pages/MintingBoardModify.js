import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

// components
import Header from '../component/Header.js';
import ScrollToTop from '../component/ScrollToTop.js';
import Footer from '../component/Footer.js';

// mui
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';

// icons
import { BsPencilFill } from "react-icons/bs";

function MintingBoardModify () {
    const [boardData, setBoardData] = useState('');
    const params = useParams();
    useEffect(() => {
        // 게시물 데이터 가져오기
        axios.get("http://180.228.243.235/boards/"+params.id)
          .then((response) => {
            setBoardData(response.data);
            console.log(response.data);
          })
          .catch((error) => console.log('cannot get board data.', error))
      }, [])
    
    
    const [formValues, setFormValues] = useState({
        user_id: boardData.user_id,
        user_pw: boardData.user_pw,
        title: '',
        content: ''
    });

    const {user_id, user_pw, title, content} = formValues;
    const handleChange = (event) => {
        setFormValues({
            ...formValues,
            [event.target.name] : event.target.value
        });
    }

    // 이미지 파일 설정
    const [files, setFiles] = useState('');
    const onLoadingFile = (e) => {
        const files = e.target.files;
        console.log(files.length);
        if(files.length > 3) {
            alert("사진은 최대 3장까지만 가능합니다.");
        }
        setFiles(files);
        console.log('files : ', files);
    }

    // 폼 제출 시
    const handleSubmit = (e) => {
        // 폼에서 작성한 데이터 보내기
        axios.put("http://180.228.243.235/boards/"+params.id, {
            user_id: user_id,
            user_pw: user_pw,
            title: title,
            content: content
        }).then((response) => {
            console.log(response.data);
            window.location.replace("/mintingBoard/"+response.data.id);
        }).catch(error => console.log('cannot modify board : ', error))
    }

    return (
        <React.Fragment>
            <div className="AppBar">
                <Header/>
            </div>
            <Toolbar id="back-to-top-anchor" />
            <div className="content">
                <Card style={{ 
                        maxWidth: 650,
                        minWidth: 375,
                        margin:"0 auto",
                        padding: "20px 5px",
                        marginTop : 50,
                        marginBottom : 7,
                        flexDirection : 'column'
                        }}
                >
                    <Typography gutterBottom variant="h5" align="center">
                        <BsPencilFill/>
                        &nbsp;
                        게시물 수정
                    </Typography>
                    <CardContent>
                        <Grid container spacing={1} direction="column" alignItems="center" justifyContent="space-between" >
                            <Stack spacing={2}>
                                <Grid xs={12} sm={6}>
                                    <label>제목</label>
                                    <input
                                        name="title"
                                        placeholder={boardData.title}
                                        onChange={handleChange}
                                    />
                                </Grid>
                                <Grid xs={12} sm={6}>
                                    <label>내용</label>
                                    <textarea
                                        name="content"
                                        placeholder={boardData.content}
                                        onChange={handleChange}
                                        rows={6}
                                        cols={50}
                                    />
                                </Grid>
                                <Grid xs={12} sm={6}>
                                    <label>닉네임</label>
                                    <input
                                        name="user_id"
                                        value={boardData.user_id}
                                        readonly="readonly"
                                    />
                                </Grid>
                                {/* <Grid xs={12} sm={6}>
                                    <input 
                                        type="file" 
                                        name="image"
                                        accept="image/png, image/jpeg, image/jpg" 
                                        multiple
                                        onChange={onLoadingFile}
                                    />
                                </Grid> */}
                            </Stack>
                        </Grid>
                        <Grid container alignItems="center" justifyContent="center" style={{ marginTop : 10 }}>
                            <Button variant="outlined" color="error" onClick={handleSubmit}>
                                수정
                            </Button>
                            <Button variant="outlined" color="error" href="/mintingBoard">
                                목록으로
                            </Button>
                        </Grid>
                    </CardContent>
                </Card>
            </div>
            <ScrollToTop/>
            <div className="Footer">
                <Footer/>
            </div>
        </React.Fragment>
  )
}

export default MintingBoardModify;