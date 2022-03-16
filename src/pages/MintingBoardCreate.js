import React, { useState } from 'react';
import axios from 'axios';

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


function MintingBoardCreate() {
    const [formValues, setFormValues] = useState({
        user_id: '',
        user_pw: '',
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
        // console.log(files.length);
        if(files.length > 3) {
            alert("사진은 최대 3장까지만 가능합니다.");
        }
        setFiles(files);
        console.log('files : ', files);
    }

    // 폼 제출 시
    const handleSubmit = (e) => {
        // 이미지 파일 포맷 설정
        const imageData = new FormData();
        // console.log('onFinish files {} : ', files);
        for(let i = 0; i < 3; i++) { // 3개까지만 가능
            imageData.append('files', files[i]);
        }
        const config = {
            Headers: {
                'content-type': 'multipart/form-data',
            },
        }

        // 폼에서 작성한 데이터 보내기
        axios.post("http://180.228.243.235/boards", {
            user_id: user_id,
            user_pw: user_pw,
            title: title,
            content: content
        }).then((response) => {
            // console.log(response);
            axios.post("http://180.228.243.235/boards/"+response.data.id+"/images/", imageData, config)
                .then((responseImage) => {
                    // console.log('responseImage : ', responseImage)
                }).catch((error) => {
                    console.log('cannot send image data : ', error)
                    axios.delete("http://180.228.243.235/boards/"+response.data.id)
                })
                return response
        }).then((response2) => {
            window.location.replace("/mintingBoard/"+response2.data.id)
        }).catch(error => console.log('cannot create board : ', error))
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
                        게시물 등록
                    </Typography>
                    <CardContent>
                        <Grid container spacing={1} direction="column" alignItems="center" justifyContent="space-between" >
                            <Stack spacing={2}>
                                <Grid xs={12} sm={6}>
                                    <label>제목</label>
                                    <input
                                        name="title"
                                        placeholder="제목을 입력하세요."
                                        value={title}
                                        onChange={handleChange}
                                    />
                                </Grid>
                                <Grid xs={12} sm={6}>
                                    <label>내용</label>
                                    <textarea
                                        name="content"
                                        placeholder="내용을 입력하세요."
                                        value={content}
                                        onChange={handleChange}
                                        rows={6}
                                        cols={50}
                                    />
                                </Grid>
                                <Grid xs={12} sm={6}>
                                    <label>닉네임</label>
                                    <input
                                        name="user_id"
                                        placeholder="닉네임을 입력하세요."
                                        value={user_id}
                                        onChange={handleChange}
                                    />
                                </Grid>
                                <Grid xs={12} sm={6}>
                                    <label>비밀번호</label>
                                    <input
                                        type="password"
                                        name="user_pw"
                                        placeholder="비밀번호를 입력하세요."
                                        value={user_pw}
                                        onChange={handleChange}
                                    />
                                </Grid>
                                <Grid xs={12} sm={6}>
                                    <input 
                                        type="file" 
                                        name="image"
                                        accept="image/png, image/jpeg, image/jpg" 
                                        multiple
                                        onChange={onLoadingFile}
                                    />
                                </Grid>
                            </Stack>
                        </Grid>
                        <Grid container alignItems="center" justifyContent="center" style={{ marginTop : 10 }}>
                            <Button variant="outlined" color="error" onClick={handleSubmit}>
                                작성
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

export default MintingBoardCreate