import React, {useState, useEffect} from 'react'
import axios from 'axios';

// components
import Header from '../component/Header.js';
import ScrollToTop from '../component/ScrollToTop.js';
import Footer from '../component/Footer.js';

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
  };
  
const normFile = (e) => {
    console.log('Upload event:', e);

    if (Array.isArray(e)) {
    return e;
    }

    return e && e.fileList;
};


function MintingBoardCreate() {
    const [form] = Form.useForm();

    const [files, setFiles] = useState('');

    // 입력 폼 초기화
    const onReset = () => {
        form.resetFields();
    };

    const handleUpload = ({ fileList }) => {
        console.log('fileList', fileList);
        setFiles({ fileList });
    };

    const onFinish = (values) => {
        const { user_id, user_pw, title, content } = values;
        
        // 이미지 파일 포맷 설정
        const formData = new FormData();
        console.log('onFinish files {} : ', files);
        for(let i = 0; i < 3; i++) {
            formData.append('files', files[i]);
        }
        const config = {
            Headers: {
                'content-type': 'multipart/form-data'
            },
        }
        
        // 폼에서 작성한 데이터 보내기
        axios.post(`http://15.164.49.215:3000/boards`, {user_id, user_pw, title, content})
            .then((response) => {
                console.log('sent data to the server and response is .. : ', response);
                
                // 이미지 보내기
                axios.post(`http://15.164.49.215:3000/boards/${response.data.id}/images`, formData, config)
                    .then((responseImages) => {
                        console.log('sent images to the server and response is .. :', responseImages);
                    }).catch((error) => {
                        console.log('failed to send images.', error);
                    })
                window.location.replace("/mintingBoard");
        }).catch((error) => {
            console.log('failed to send form data.', error);
        })
    };


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
                                    rules={[
                                        {
                                            required: true,
                                        },
                                    ]}
                                    onChange={handleUpload}
                                    beforeUpload={() => false}
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
            </div>
            <ScrollToTop/>
            <div className="Footer">
                <Footer/>
            </div>
        </React.Fragment>
  )
}

export default MintingBoardCreate