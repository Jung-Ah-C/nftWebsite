import React, {useState, useEffect} from 'react'
import axios from 'axios';
import { Navigate, Route } from 'react-router';

// components
import Header from '../component/Header.js';
import ScrollToTop from '../component/ScrollToTop.js';
import Footer from '../component/Footer.js';
import Home from '../pages/Home';

// mui
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';

// antd
import { Form, Input, Button, Upload } from 'antd';
import { InboxOutlined } from '@ant-design/icons';

const layout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 16,
    },
};

const validateMessages = {
    required: '${label}은 필수 입력 사항입니다!',
    types: {
      email: '${label}은 이메일 형식이 아닙니다.',
      number: '${label} is not a valid number!',
    },
    number: {
      range: '${label} must be between ${min} and ${max}',
    },
  };
  
const normFile = (e) => {
    console.log('Upload event:', e);

    if (Array.isArray(e)) {
    return e;
    }

    return e && e.fileList;
};


function WriteMintingBoard() {
    const [form] = Form.useForm();
    const [error, setError] = useState();
    const [isSuccess, setIsSuccess] = useState(false);

    const onFinish = (values) => {
        console.log(values);
        setError("")
            axios.post(`http://180.228.243.235/boards`, values)
                .then((response) => {
                    console.log('sent data to the server and response is .. : ', JSON.stringify(response));
                    if(response.status===200){
                        alert("등록 성공!")
                        setIsSuccess(true);
                    }
            }).catch((error) => {
                console.log('failed to send form data.', error);
            })
    };

    const onReset = () => {
        form.resetFields();
    };

    const [files, setFiles] = useState('');

    return (
        <React.Fragment>
            <div className="AppBar">
                <Header/>
            </div>
            <Toolbar id="back-to-top-anchor" />
            <div className="content">
                <Box 
                    component="form" 
                    autoComplete="off"
                    noValidate
                    sx={{ 
                        marginTop : 15,
                        height: 'auto',
                        marginBottom : 7,
                        display: 'flex',
                        flexDirection: 'column',
                        '& .MuiTextField-root': { m: 1, width: 'auto', maxWidth : 1200 },
                        alignItems : 'center'
                    }}
                >
                    <Form {...layout} form={form} name="nest-messages" onFinish={onFinish} validateMessages={validateMessages}>
                        <Form.Item
                            name="title"
                            label="제목"
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            name="content"
                            label="내용"
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                        >
                            <Input.TextArea />
                        </Form.Item>
                        <Form.Item
                            name="user_id"
                            label="닉네임"
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item 
                            name="user_pw" 
                            label="비밀번호"
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                        >
                            <Input.Password />
                        </Form.Item>
                        <Form.Item
                            name="confirm"
                            label="비밀번호 확인"
                            dependencies={['user_pw']}
                            hasFeedback
                            rules={[
                            {
                                required: true,
                                message: '비밀번호를 한번 더 입력해주세요!',
                            },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                if (!value || getFieldValue('user_pw') === value) {
                                    return Promise.resolve();
                                }

                                return Promise.reject(new Error('입력하신 비밀번호가 다릅니다!'));
                                },
                            }),
                            ]}
                        >
                            <Input.Password />
                        </Form.Item>
                        <Form.Item 
                            label="사진"
                        >
                            <Form.Item name="dragger" valuePropName="fileList" getValueFromEvent={normFile} noStyle>
                            <Upload.Dragger 
                                name="image" 
                                action="/upload.do"
                                rules={[
                                    {
                                        required: true,
                                    },
                                ]}
                            >
                                <p className="ant-upload-drag-icon">
                                    <InboxOutlined />
                                </p>
                                <p className="ant-upload-text">업로드 할 사진을 클릭 또는 드래그로 첨부해주세요.</p>
                                <p className="ant-upload-hint">사진은 3장까지만 업로드 가능합니다.</p>
                            </Upload.Dragger>
                            </Form.Item>
                        </Form.Item>
                        <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                            <Button danger htmlType="submit">
                                등록
                            </Button>
                            <Button htmlType="button" onClick={onReset}>
                                초기화
                            </Button>
                        </Form.Item>
                    </Form>
                </Box>
                    {isSuccess ? <Navigate to="/mintingBoard" /> : <Home/>}
            </div>
            <ScrollToTop/>
            <div className="Footer">
                <Footer/>
            </div>
        </React.Fragment>
  )
}

export default WriteMintingBoard