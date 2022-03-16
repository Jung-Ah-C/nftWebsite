import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

// components
import Header from '../component/Header.js';
import ScrollToTop from '../component/ScrollToTop.js';
import Footer from '../component/Footer.js';
import DeleteModal from '../component/DeleteModal.js';
import Backdrop from '../component/Backdrop.js';
import ModifyModal from '../component/ModifyModal.js';

// mui
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';

function MintingBoardDetail(props) {
  const params = useParams();
  const [boardData, setBoardData] = useState('');
  const [imageData, setImageData] = useState([]);
  const [replyData, setReplyData] = useState([]);
  const [inputs, setInputs] = useState({
    user_id: '',
    content: ''
  });
  const {user_id, content} = inputs;
  const onDataChange = (e) => {
    const {value, name} = e.target
    setInputs({
      ...inputs,
      [name] : value
    })
  }

  useEffect(() => {
    // 게시물 데이터 가져오기
    axios.get("http://180.228.243.235/boards/"+params.id)
      .then((response) => {
        setBoardData(response.data)
        // console.log(response.data);
        // 게시물 이미지 가져오기
        axios.get("http://180.228.243.235/boards/"+params.id+"/images/")
          .then((response) => {
            setImageData(response.data);
            // console.log(response.data);
          })
          .catch((error) => console.log('cannot get image data.', error))

        axios.get("http://180.228.243.235/boards/"+params.id+"/replys/")
          .then((response) => {
            setReplyData(response.data);
            // console.log(response.data);
          })
          .catch((error) => console.log('cannot get reply data.', error))
      })
      .catch((error) => console.log('cannot get board data.', error))
  }, [])

  // 댓글 작성하기
  function replyApi() {
    console.log(inputs);
    axios.post("http://180.228.243.235/boards/"+params.id+"/replys/", {
      user_id: user_id,
      content: content
    }).then(function(response) {
      // console.log(response.data);
      window.location.replace("/mintingBoard/"+params.id)
    }).catch((error) => console.log('cannot post reply data.', error))
  }

  // 게시글 수정
  const [ modifyModalIsOpen, setModifyModalIsOpen ] = useState(false);
  function modifyHandler() {
    setModifyModalIsOpen(true);
  }

  function closeModifyModalHandler() {
    setModifyModalIsOpen(false);
  }

  function modifyActionHandler(password) {
    if(boardData.user_pw === password) {
      window.location.replace("/mintingBoard/modify/"+params.id);
    } else {
      alert('비밀번호가 틀립니다.');
    }
  }

  // 게시글 삭제
  const [ deleteModalIsOpen, setDeleteModalIsOpen ] = useState(false);

  function deleteHandler() {
    setDeleteModalIsOpen(true);
  }

  function closeDeleteModalHandler() {
    setDeleteModalIsOpen(false);
  }

  function deleteActionHandler(password) {
    if(boardData.user_pw === password) {
      axios.delete("http://180.228.243.235/boards/"+params.id, {
        board_id: params.id
      }).then(function(response) {
        alert('게시물이 삭제되었습니다.');
        window.location.replace("/mintingBoard");
      }).catch((error) => console.log('cannot delete board data.', error))
    } else {
      alert('비밀번호가 틀립니다.');
    }
  }

  return (
    <React.Fragment>
      <div className="AppBar">
        <Header/>
      </div>
      <Toolbar id="back-to-top-anchor" />
      <div className="content">
        <Container maxWidth="lg" className="board-detail-container" style={{ marginTop : 10 }}>
        <Card style={{ 
                      maxWidth: "lg",
                      minWidth: 375,
                      margin:"0 auto",
                      padding: "20px 5px",
                      marginTop : 50,
                      marginBottom : 7,
                      flexDirection : 'column'
                    }}
          >
            <CardContent>
              <Typography gutterBottom variant="h4" component="div" align="left">{boardData.title}</Typography>
              <Stack direction="row" spacing={1}>
                <Typography gutterBottom variant="subtitle1" component="p" align="left">by {boardData.user_id} | {boardData.createdAt}</Typography>
                <button className="btn" onClick={modifyHandler} disabled>수정</button>
                <button className="btn" onClick={deleteHandler}>삭제</button>
              </Stack>
              <Divider/>
              {
                imageData && imageData.map((data) => 
                  <img
                    src={data.image}
                    style={{ 
                      margin : 'auto',
                      maxWidth : '40%'
                    }}
                    alt="board_image"
                  />
                )
              }
              <Typography variant="body1" gutterBottom>
                {boardData.content}
              </Typography>
              <Divider>
                <Chip label="댓글 목록" />
              </Divider>
              {
                replyData ? replyData.map((reply) => (
                  <>
                    <div>
                      {reply.user_id} | [작성일 : {reply.createdAt.slice(0, 10)} {reply.createdAt.slice(11, 16)}]
                      <br/>
                      <p>{reply.content}</p>
                    </div>
                  </>
                ))
                : ''
              }
              <br/>
              <Divider>
                <Chip label="댓글 달기" />
              </Divider>
              <br/>
              <Stack direction="row" spacing={1}>
                <label>닉네임</label>
                <input type="text" name="user_id" placeholder="닉네임을 입력해주세요." onChange={onDataChange} style={{ width: 200 }}></input>
                {/* <label>비밀번호</label>
                <input type="password" name="user_pw" onChange={onDataChange} style={{ width: 300 }}></input> */}
                <input type="text" name="content" placeholder="댓글을 입력해주세요." onChange={onDataChange} style={{ width: 300 }}></input>
                <button className='btn' onClick={replyApi}>
                    작성
                </button>
              </Stack>
            </CardContent>
        </Card>
        </Container>
      </div>
      {/* 수정 모달창 */}
      { modifyModalIsOpen && <ModifyModal onCancel={closeModifyModalHandler} onConfirm={modifyActionHandler} />}
      { modifyModalIsOpen && <Backdrop onCancel={closeModifyModalHandler}/> }

      {/* 삭제 모달창 */}
      { deleteModalIsOpen && <DeleteModal onCancel={closeDeleteModalHandler} onConfirm={deleteActionHandler} /> }
      { deleteModalIsOpen && <Backdrop onCancel={closeDeleteModalHandler} /> }
      <ScrollToTop/>
      <div className="Footer">
          <Footer/>
      </div>
    </React.Fragment>
  )
}

export default MintingBoardDetail