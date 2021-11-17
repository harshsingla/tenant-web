import React, { useState, useEffect } from 'react'
import _ from 'lodash'
import { Layout, Menu, Drawer } from 'antd';
import './styles.less'
import { push } from 'connected-react-router';
import { useDispatch, useSelector } from 'react-redux'
// import logo from '../assets/logoWhite.png'
import Media from 'react-media';
import DashboardHeader from '../components/header';
import SiderMenu from '../components/siderMenu'
import CallsPlans from '../containers/plans'
import Modal from 'antd/lib/modal/Modal';
import Request from '../request'
const { Header, Content } = Layout;

export default (props) => {
    const dispatch = useDispatch()

    const [collapsed, setCollapsed] = useState(false)
    const [modal, setModalVisible] = useState(false)
    const { currentUser, showPlan } = useSelector((state) => ({
        currentUser: state.global.currentUser,
        showPlan: state.global.showPlan

    }))


    useEffect(() => {
        if (!currentUser) {
            dispatch(push(''))
        }
    }, [currentUser])
    useEffect(() => {
        checkFunctionForPlans()
    }, [])
    const checkFunctionForPlans = async () => {
        let { data, success } = await Request.getProfile()
        if (success) {
            dispatch({
                type: 'SET_CURRENT_USER',
                payload: { ...data }
            })
            if (data?.plan?.id) {
                setModalVisible(false)
            } else {
                setModalVisible(true)
            }
        } else
            setModalVisible(true)

    }
    const toggle = () => {
        setCollapsed((prev) => !prev)
    }
    const { children, menuData, path, item } = props
    return (
        <Layout>
            <Media queries={{ small: { maxWidth: 599 } }}>
                {matches =>
                    matches.small ? (
                        <Drawer
                            width={200}
                            visible={!collapsed}
                            placement="left"
                            onClose={toggle}
                            closable={false}
                            getContainer={false}
                            bodyStyle={{
                                padding: 0,
                                height: '100vh',
                            }}
                        >
                            <SiderMenu isMobile={matches.small} menuData={menuData} path={path} collapsed={collapsed} />
                        </Drawer>
                    ) : <SiderMenu isMobile={matches.small} menuData={menuData} path={path} collapsed={collapsed} />
                }
            </Media>

            <Layout className={'layout'}>
                <DashboardHeader collapsed={collapsed} toggle={toggle} item={item} key={props?.key} />
                <Modal visible={modal} width={'90%'} footer={null} onCancel={() => {
                    setModalVisible(false)
                }}
                    title="Please Select The Plan First To Proceed Further">
                    <CallsPlans />
                </Modal>
                <Content
                    className={'content'}
                >
                    {children}
                </Content>
            </Layout>
        </Layout>
    );
}