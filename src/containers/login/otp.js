import React, { useState } from 'react'
import { Button, notification } from 'antd';
import './styles.less'
import { useDispatch, useSelector } from 'react-redux';
import Request from '../../request';
import { push } from 'connected-react-router';
import { ArrowRightOutlined, CaretRightOutlined, CheckOutlined } from '@ant-design/icons';
import OtpInput from 'react-otp-input';

const Login = () => {
    const dispatch = useDispatch()
    const [loader, setLoader] = useState(false)
    const [otp, setOtp] = useState('')
    const [verified, setVerified] = useState(false)

    const {mobileNo} = useSelector((state)=>({
        mobileNo : state.global.mobileNo
    }))
    
    const onFinish = async () => {
        if (!otp || otp.length !== 4) {
            notification.error({
                message: 'Invalid OTP'
            })
            return;
        }
        setLoader(true)
        let { user, success, message } = await Request.login({ otp })
        setLoader(false)
        if (success) {
            dispatch({
                type: 'SET_CURRENT_USER',
                payload: { ...user }
            })
        }
        else {
            notification.error({
                message: message || 'Failed'
            })
        }
        setVerified(() => true)
    }

    const handleOtpChange = (otp) => {
        setOtp(() => otp)
    }

    const onVerified = () => {
        dispatch(push('/home'))
    }

    return (
        <div className='loginWrapper'>
            {!verified ?
                <div className='otpContainer'>
                    <div className='loginTitle'>Verify OTP</div>
                    <div className='loginSubTitle'>Enter The OTP Received on {mobileNo.slice(0,4)} XXXX {mobileNo.slice(8)}</div>
                    <OtpInput
                        containerStyle={{
                            justifyContent: 'center',
                            margin: '1rem'
                        }}
                        value={otp}
                        onChange={handleOtpChange}
                        numInputs={4}
                        inputStyle={{
                            width: '40px',
                            height: '51.43px',
                            background: '#474747',
                            borderRadius: '4px',
                            border: 'none',
                            margin: '0.5rem',
                            color: '#3EC6FF',
                            fontSize: '25px',
                            fontWeight: 500
                        }}
                    />
                    <div className='resendBtn'>Resend OTP <CaretRightOutlined /></div>
                    <div className='loginBtn'>
                        <Button
                            onClick={onFinish}
                            size='large'
                            shape='circle'
                            loading={loader}
                            type='primary'
                            icon={<ArrowRightOutlined />}
                        />
                    </div>
                </div> :
                <div className='otpContainer'>
                    <div className='loginTitle'>Verified</div>
                    <div className='otpSubTitle'>Your account has been verified now.You can start your shop</div>
                    <CheckOutlined shape='circle' className='verifiedIcon' size='large' />
                    <div className='loginBtn verifiedBtn'>
                        <Button
                            onClick={onVerified}
                            size='large'
                            shape='circle'
                            loading={loader}
                            type='primary'
                            icon={<ArrowRightOutlined />}
                        />
                    </div>
                </div>
            }
        </div>
    );
}

export default Login