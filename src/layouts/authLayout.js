import React, { useEffect } from 'react'
import './styles.less'
import { useDispatch, useSelector } from 'react-redux';
import { push } from 'connected-react-router';

const Login = (props) => {
    const dispatch = useDispatch()
    const { currentUser } = useSelector((state) => ({
        currentUser: state.global.currentUser
    }))
    useEffect(() => {
        if (currentUser) {
            dispatch(push('/dashboard'))
        }
    }, [currentUser])
    return (
        <div className='authWrapper'>
            {props.children}
        </div>
    );
}

export default Login