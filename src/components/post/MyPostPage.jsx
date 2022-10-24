import React, { useEffect, useState } from 'react'
import MyBodyPost from './MyBodyPost'
import MyHeader from '../common/MyHeader'
import { useNavigate } from 'react-router-dom';





function MyPostPage() {
    const [isLogin, setIsLogin] = useState(false);
    const navigate = useNavigate()
    const checkIsLogin = async () => {
        if (localStorage['access_token'] !== undefined) {
            navigate('/post')
        } else {
            navigate('/login')
        }
    }
    React.useEffect(
        () => {
            checkIsLogin()
        }, []
    )

    return (
        <>
            <MyHeader />
            <MyBodyPost />
        </>

    )

}

export default MyPostPage