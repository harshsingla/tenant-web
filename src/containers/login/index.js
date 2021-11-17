import React, { useState } from 'react'
import { Button, Typography, Input, Space, notification, Select, Switch } from 'antd';
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
import ForgotPassword from './ForgotPassword'
const { Text } = Typography
const { Option } = Select

const Login = () => {
    const dispatch = useDispatch()
    const [form] = Form.useForm()
    const [loader, setLoader] = useState(false)
    const [login, setLoginRun] = useState(true)
    const [forgotPassWord, setForgotPassword] = useState(false)

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
                        console.log("in login <<<<<<<<<<<<<<<<<<<<<<<<<<<<<")
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
                            message: message || "Failed",
                            description:JSON.stringify(profileData).replace('[','').replace('{','').replace(']','').replace('}','')

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

    const requiredRule = [{ required: true, message: 'Please input field' }]

    return (
        <div className="LoginParentDiv">
            <div className="LoginSubDiv">
                <div className="LeftSubDiv">
                    <div className="loginPageCustomer">
                    Single Platform for all Your Business Telephony Requirements!
                </div>
                <div style={{fontSize:'12px'}}>
                Empower your business and employees globally with our integrated contact center application.
                </div>
                    <ImageThumb height="50vh" />
                </div>
            </div>
            <div className='loginWrapper'>
                {!forgotPassWord ? <div className='loginContainer'>
                    <div className="buttonDiv">
                        <div className={login ? 'selectedDiv' : 'unselectedDiv'}>
                            <Button ghost={!login} type={login ? "primary" : "secondary"} shape="round"
                                onClick={() => { setLoginRun(true) }} className={login ? 'selectedDivButton' : 'unselectedDivButton'}>sign in</Button>
                        </div>
                        <div className={!login ? 'selectedDiv' : 'unselectedDiv'}>
                            <Button ghost={login} type={!login ? "primary" : "secondary"} shape="round"
                                onClick={() => { setLoginRun(() => false) }} className={!login ? 'selectedDivButton' : 'unselectedDivButton'}>sign up</Button>
                        </div>
                    </div>
                    <div className="displayFlex">
                        {login ? <div >
                            <Form className='form' form={form} onFinish={onFinish} size='large'>
                                <div className='inputWidth'>
                                    <Form.Item name='email' rules={requiredRule}>
                                        <Input type="email" placeholder='Enter Email ID' />
                                    </Form.Item>
                                    <Form.Item name='password' rules={requiredRule}>
                                        <Input maxLength={10} type="password" placeholder='Enter Password' />
                                    </Form.Item>
                                    <div style={{ textAlign: 'start', lineHeight: '16px' }} onClick={() => setForgotPassword(true)}>
                                        Forgot Password
                                    </div>
                                </div>
                                <Form.Item >
                                    <Button size='large' loading={loader} htmlType='submit' type='primary' style={{ width: '18vw', marginTop: '3rem' }}>Sign in</Button>
                                </Form.Item>
                            </Form>
                        </div> : <Signup />}
                        <div className="TermsAndCond">
                            <div className="TermData">By clicking the button above,you agree to our <Space />
                                <span className="termsOfUse">terms of use</span>
                                <Space /> <span>and</span>
                                <span className="termsOfUse"> privacy policy</span>
                            </div>
                        </div>
                    </div>
                </div> : <div className='loginContainer'>
                    <ForgotPassword forgotpass={forgotPassWord} setForgotPassword={setForgotPassword} />
                </div>}
            </div>
        </div>
    );
}

export default Login