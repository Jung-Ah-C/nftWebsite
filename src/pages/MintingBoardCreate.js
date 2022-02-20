import React, {useState, useEffect} from 'react'
import axios from 'axios';

// components
import Header from '../component/Header.js';
import ScrollToTop from '../component/ScrollToTop.js';
import Footer from '../component/Footer.js';

// mui
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';

// react bootstrap
import { Button } from 'react-bootstrap';


function MintingBoardCreate() {
    const [formValue, setFormValue] = useState({
        user_id: '',
        user_pw: '',
        title: '',
        content: ''
    });
    const [files, setFiles] = useState('');

    const handleChange = (event) => {
        setFormValue({
            ...formValue,
            [event.target.name] : event.target.value
        });
    }

    // 폼 제출 시
    const handleSubmit = async() => {
        const formData = new FormData;
        console.log(formValue.user_id)
        console.log(formValue.user_pw)
        console.log(formValue.title)
        console.log(formValue.content)
        formData.append("user_id", formValue.user_id)
        formData.append("user_pw", formValue.user_pw)
        formData.append("title", formValue.title)
        formData.append("content", formValue.content)

        // // 이미지 파일 포맷 설정
        // const imageData = new FormData();
        // console.log('onFinish files {} : ', files);
        // for(let i = 0; i < files.length; i++) {
        //     imageData.append('files', files[i]);
        // }
        // const config = {
        //     Headers: {
        //         'content-type': 'multipart/form-data'
        //     },
        // }

        // 폼에서 작성한 데이터 보내기  / `http://15.164.49.215:3000/boards/${response.data.id}/images`
        axios.post("http://180.228.243.235/boards", {formData})
        .then((response) => console.log(response))
        .catch(error => console.log(error))
    }


    return (
        <React.Fragment>
            <div className="AppBar">
                <Header/>
            </div>
            <Toolbar id="back-to-top-anchor" />
            <div className="content">
                <Box 
                    sx={{ 
                        marginTop : 10,
                        height: 'auto',
                        marginBottom : 7,
                        display: 'flex',
                        flexDirection: 'column',
                        '& .MuiTextField-root': { m: 1, width: 'auto', maxWidth : 1200 },
                        alignItems : 'center'
                    }}
                >
                    <h1>게시물 등록</h1>
                    <form 
                        onSubmit={handleSubmit}
                        style= {{
                            display: 'flex',
                            flexDirection: 'column'
                        }}
                    >
                            <label>
                                제목:
                                <input
                                    name="title"
                                    placeholder="제목을 입력하세요."
                                    value={formValue.title}
                                    onChange={handleChange}
                                />
                            </label>
                            
                            <label>내용</label>
                            <textarea
                                name="content"
                                placeholder="내용을 입력하세요."
                                value={formValue.content}
                                onChange={handleChange}
                                rows={6}
                                cols={50}
                            />
                            <p>닉네임</p>
                            <input
                                name="user_id"
                                placeholder="닉네임을 입력하세요."
                                value={formValue.user_id}
                                onChange={handleChange}
                            />

                            <p>비밀번호</p>
                            <input
                                type="password"
                                name="user_pw"
                                placeholder="비밀번호를 입력하세요."
                                value={formValue.user_pw}
                                onChange={handleChange}
                            />

                            <input type="file"/>
                            <br/>
                            <input type="submit" value="등록하기"/>
                    </form>
                </Box>
            </div>
            <ScrollToTop/>
            <div className="Footer">
                <Footer/>
            </div>
        </React.Fragment>
  )
}

export default MintingBoardCreate