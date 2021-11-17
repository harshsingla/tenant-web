import React, { Suspense, lazy } from 'react'
import { Route, Redirect, Switch } from 'react-router-dom'
import menuData from '../../routes'
import Login from '../../containers/login'
import EmailConfirmationPage from '../../containers/EmailConfirmationPage'
import ReConfirmationPage from '../../containers/ReConfirmationPage'
import { componentLoader } from '../../utils'
import { Card } from 'antd'

// import {
//     sip,
//     call,
//     registerSip,
//     unregisterSip,
//     answerCall,
//     startCall,
//     stopCall,
//   } from "react-sip";
//   import {
//     SIP_STATUS_DISCONNECTED,
//     //SIP_STATUS_...,
//     CALL_STATUS_IDLE,
//     //CALL_STATUS_...,
//     SIP_ERROR_TYPE_CONFIGURATION,
//     //SIP_ERROR_TYPE_...,
//     CALL_DIRECTION_INCOMING,
//     CALL_DIRECTION_OUTGOING,
//   } from "react-sip";
const AuthLayout = lazy(() => componentLoader(() => import('../../layouts/authLayout')))
const BasicLayout = lazy(() => componentLoader(() => import('../../layouts/basicLayout')))

export default (props) => {
    console.log(props)
    const AppLoading = () => {
        return <Card loading={true}></Card>
    }
    return (
        <Suspense fallback={<AppLoading />}>
            <Switch>
                {menuData.map((item, key) => {

                    if (!item.children) {
                        return (<Route exact path={item.path} key={item.path} render={(route) => {
                            return <BasicLayout path={item.path} key={key} menuData={menuData} item={item} menuData={menuData}>
                                {!!item.component ?
                                    <Suspense fallback={<AppLoading />}>
                                        {item.component}
                                    </Suspense> : <></>}
                            </BasicLayout>
                        }} />)
                    }
                })}

                {menuData.map((item, key) => {
                    if (item.children) {
                        return item.children.map((child, k) => {
                            return (<Route exact path={child.path} key={child.path} render={(route) => {
                                return <BasicLayout path={child.path} menuData={menuData} item={item} menuData={menuData} >
                                    {!!child.component ?
                                        <Suspense fallback={<AppLoading />}>
                                            {child.component}
                                        </Suspense> : <></>}
                                </BasicLayout>
                            }} />)
                        })
                    }
                })}

                <Route exact path={'/'} key={'login'} render={(route) => <AuthLayout><Login /></AuthLayout>} />
                <Route exact path={'/confirmation/:token'} key={'confirmation'} render={(route) => <EmailConfirmationPage />} />
                <Route exact path={'/reconfirmation'} key={'reconfirmation'} render={(route) => <ReConfirmationPage />} />
                {/* <Route exact path={'/signup'} key={'signup'} render={(route) => <Signup />} />
                <Route exact path={'/verify'} key={'otp'} render={(route) => <OTP />} /> */}

            </Switch>
        </Suspense>
    )
};