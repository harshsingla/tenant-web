import React, { useState } from 'react'
import { Button, Typography, Input, Space, notification, Select, Divider } from 'antd';
import './styles.less'
import { useDispatch } from 'react-redux';
import { Form } from 'antd';
import Request from '../../request';
import { push } from 'connected-react-router';
import { ArrowRightOutlined } from '@ant-design/icons';
import _ from 'lodash'
import { isNormalInteger } from '../../utils';
import { ReactComponent as ImageThumb } from '../../assets/LoginPage.svg'
import Signup from '../signup'
import { ReactComponent as EMAIL } from '../../assets/email.svg'

const Forgot = (props) => {
    const dispatch = useDispatch()
    const [form] = Form.useForm()
    const [loader, setLoader] = useState(false)
    const [login, setLoginRun] = useState(true)
    const [forgotPassWord, setForgotPassword] = useState(props?.forgotpass)

    const onFinish = async (valData) => {
        const { mobile } = valData
        setLoader(true)
        let { user, token, success, message: loginMessage, data } = await Request.login(valData)
        if (success) {
            dispatch({
                type: 'SET_AUTH_TOKEN',
                payload: data.auth_token
            })
            Request.getProfile().then(({ error, data: profileData, message }) => {
                if (!error && profileData) {
                    dispatch({
                        type: 'SET_CURRENT_USER',
                        payload: { ...profileData }
                    })
                    dispatch(push('/dashboard'))
                    notification.success({
                        message: loginMessage
                    })

                } else {
                    notification.error({
                        message: message || "Failed"
                    })
                }
            })
        }
        else {
            notification.error({
                message: loginMessage || "Failed"
            })
        }
        setLoader(false)
    }
    const setLoginBack = () => {
        setForgotPassword(false)
        props.setForgotPassword(false)
    }

    const requiredRule = [{ required: true, message: 'Please input field' }]

    return (
        <div className="displayFlexForForgot flex">
           <div >
                <EMAIL style={{width:'90px',margin:10}}/>
                <Form className='form' form={form} onFinish={onFinish} size='large'>
                <span style={{
                        fontSize: 22, fontWeight: "bold", display: "flex",
                    }}>
                       Forgot Password
                    </span>
                    <span style={{
                        fontSize: 16, display: "flex",
                        margin:'10px 0px 0px 0px'
                    }}>
                        Reset login credential mail will be send to you to change the password
                    </span>
                    <div className='inputWidth marginTop'>
                        <Form.Item name='email' rules={requiredRule}>
                            <Input type="email" placeholder='Enter Email ID' />
                        </Form.Item>

                    </div>
                    <Form.Item >
                        <Button size='large' loading={loader} htmlType='submit' type='primary' style={{ width: '18vw', marginTop: '1rem' }}>Submit</Button>
                    </Form.Item>
                    <div style={{ width: '70%' }}>
                        <Divider>Or</Divider>
                    </div>
                    <div className="flex">
                        <Button size='large' loading={loader} onClick={() => setLoginBack()} type='secondary' style={{ width: '16vw' }}>Login/Signup</Button>
                    </div>

                </Form>
           </div>
           <div className="TermsAndCond">
                <div className="TermData">By clicking the button above,you agree to our <Space />
                    <span className="termsOfUse">terms of use</span>
                    <Space /> <span>and</span>
                    <span className="termsOfUse"> privacy policy</span>
                </div>
            </div>
            
        </div>);
}

export default Forgot