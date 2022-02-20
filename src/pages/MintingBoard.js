import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";

// Material UI
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Toolbar from '@mui/material/Toolbar';

// components
import Header from '../component/Header.js';
import logo from '../img/logo.png';
import Pagination from '../component/Pagination';
import './MintingBoard.css';
import ScrollToTop from '../component/ScrollToTop.js';
import Footer from '../component/Footer.js';

// icons
import { HiSpeakerphone } from "react-icons/hi";

export default function ShowingOff() {
    // 게시판 정보 가져오기
    const [posts, setPosts] = useState('');
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        setLoading(true);
        axios.get(`http://15.164.49.215:3000/boards`).then((response) => {
            console.log(response.data);
            setPosts(response.data);
            setLoading(false);
        });
    }, []);

    // 작성자 아바타 설정
    function stringAvatar(name) {
        return {
          sx: {
            bgcolor: '#ff9800',
          },
          children: `${name.split(' ')[0][0]}`,
        };
    }
    
    // 페이징
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(10);

    // 클릭한 페이지의 게시글 가져오기
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

    // 페이지 변경
    const paginate = (pageNumber) => setCurrentPage(pageNumber);
    

    return (
        <React.Fragment>
            <div className="AppBar">
                <Header/>
            </div>
            <Toolbar id="back-to-top-anchor" />
            <div className="content">
                <Box sx={{ 
                        marginTop : 20,
                        height: 'auto',
                        marginBottom : 7
                    }}
                >
                    <Container maxWidth="lg" className="boardContainer">
                        {/* 공지사항 */}
                        <Typography variant="h7" className="boardTitle">
                            <HiSpeakerphone style={{ marginRight : 7 }} />
                            민팅 성공을 자랑하는 게시판입니다.
                        </Typography>

                        {/* 게시판 글쓰기 */}
                        <Box style={{ marginTop : 10 }}>
                            <Button variant="outlined" color="error" href="/mintingBoard/write">
                                글쓰기
                            </Button>
                        </Box>
                        {/* 게시판 글 목록 */}
                        <Grid container spacing={3} style={{ marginTop : 0 }}>
                            {
                                currentPosts && currentPosts.map((item) => (
                                    <Grid item xs={12} sm={6} md={4}>
                                        <Card className="card">
                                            <Link to={"/mintingBoard/"+item.id}>
                                                <CardMedia
                                                    component="img"
                                                    height="140"
                                                    image={logo}
                                                    alt="example"
                                                    className="media"
                                                />
                                            </Link>
                                            <CardContent style={{ textAlign : 'center' }}>
                                                <Link to={"/mintingBoard/"+item.id} style={{ textDecoration : 'none' }}>
                                                    <Typography gutterBottom variant="h5" component="div" color="textSecondary">
                                                        {item.title}
                                                    </Typography>
                                                </Link>
                                                <Typography variant="body2" color="text.secondary">
                                                    {item.content.split()[0][49]}this is for test. what's up guys!
                                                </Typography>
                                            </CardContent>
                                            <CardActions className="cardActions" style={{ justifyContent : 'center' }}>
                                                <Box className="author">
                                                    <Avatar {...stringAvatar('Nick Name')} />
                                                    <Box ml={2}>
                                                        <Typography variant="subtitle" component="p">
                                                            {item.user_id}
                                                        </Typography>
                                                        <Typography variant="subtitle2" color="textSecondary" component="p">
                                                            {item.createdAt.replace('T', ' ').substring(0, 10)}
                                                        </Typography>
                                                    </Box>
                                                </Box>
                                            </CardActions>
                                        </Card>
                                    </Grid>
                                ))
                            }
                        </Grid>
                    </Container>
                    <Pagination 
                        postsPerPage={postsPerPage} 
                        totalPosts={posts.length}
                        paginate={paginate}
                    />
                </Box>
            </div>
            <ScrollToTop/>
            <div className="Footer">
                <Footer/>
            </div>
        </React.Fragment>
    )
}
