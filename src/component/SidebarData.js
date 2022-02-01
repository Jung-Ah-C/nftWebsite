import React from 'react';
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";

export const SidebarData = [
    {
        title: '홈',
        path: '/',
        icon: <AiIcons.AiFillHome/>,
        cName: 'nav-text'
    },
    {
        title: '초보자 가이드',
        path: '/guide',
        icon: <FaIcons.FaBook/>,
        cName: 'nav-text'
    },
    {
        title: '제휴문의',
        path: '/proposal',
        icon: <AiIcons.AiFillQuestionCircle/>,
        cName: 'nav-text'
    },
]