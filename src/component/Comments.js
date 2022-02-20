import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { Link, useParams } from "react-router-dom";

// semantic UI
import 
    {
        Button, 
        Comment, 
        Form, 
        Header, 
        Input
    } from 'semantic-ui-react';


import logo from '../img/logo.png';

function Comments() {
    const params = useParams();
    const [reply, setReply] = useState('');
    useEffect(() => {
        // 댓글 가져오기
        axios.get(`http://15.164.49.215:3000/boards/${params.id}/replys`)
            .then((response) => {
                setReply(response.data);
            }).catch(err => {
                console.log('Cannot get reply data.', err);
            })
    }, []);

    // 댓글 내용 설정
    const [nickname, setNickname] = useState('');
    const [password, setPassword] = useState('');
    const [content, setContent] = useState('');

    // 댓글 등록하기
    const replyAPI = (e) => {
        axios.post(`http://15.164.49.215:3000/boards/${params.id}/replys`, { 
        }).then(function(response) {
            window.location.replace("/boards"+params.id);
        }).catch(err => console.log('cannot send reply data to the server.', err))
    }

    return (
        <div>
            <Comment.Group style={{ }}>
                <Header as='h3' dividing>
                    댓글
                </Header>

                {/* 댓글 목록 */}
                {
                    reply && reply.map((row)=> (
                        <Comment>
                            <Comment.Avatar src= {logo} />
                            <Comment.Content>
                                <Comment.Author as='a'>{row.user_id}</Comment.Author>
                                <Comment.Metadata>
                                    <div>{row.createdAt.slice(0, 10)} {row.createdAt.slice(11, 16)}</div>
                                </Comment.Metadata>
                                <Comment.Text>
                                    {row.content}
                                </Comment.Text>
                            </Comment.Content>
                        </Comment>
                    ))
                }

                {/* 댓글 입력란 */}
                <Form reply>
                    <Form.Group widths='equal'>
                        <Form.Input
                            label='닉네임'
                            placeholder='닉네임을 입력하세요.'
                            name='nickname'
                        />
                        <Form.Input
                            label='비밀번호'
                            placeholder='비밀번호를 입력하세요.'
                            name='password'
                            type='password'
                        />
                    </Form.Group>
                    <Form.TextArea placeholder = "댓글을 입력하세요." />
                    <Button content='댓글 달기' labelPosition='left' icon='edit' primary onClick={replyAPI}/>
                </Form>
            </Comment.Group>
        </div>
    )
}

export default Comments