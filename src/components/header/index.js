import React from 'react'
import './styles.less'
import { Typography, Form, Switch, Menu, Badge, Avatar, Popover, List, Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { confirmBox } from '../../utils';
import { ReactComponent as NotificationIcon } from '../../assets/notification.svg'
import { ArrowLeftOutlined, CaretRightOutlined, CheckOutlined, PhoneOutlined } from '@ant-design/icons';
import { LeftOutlined } from '@ant-design/icons';
import { goBack, push } from 'connected-react-router';
import { UserOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;
const { SubMenu } = Menu;
const HomeHeader = ({ item, key }) => {
    const dispatch = useDispatch()
    const { currentUser } = useSelector((state) => ({
        currentUser: state.global.currentUser
    }))

    return (<div className={'header'}>
        <div className={'headText'}>
            <div className="flex">
                <div onClick={() => dispatch(goBack())}>
                    <LeftOutlined style={{ fontSize: 20, marginRight: 10, color: '#fff' }} />
                </div>
                <div className={'heading'}>{item?.title}</div>
            </div>
        </div>
        <div className={'headTools flex'}>
            {/* <div className={'marginMore'}>
                <Button type="primary" icon={<PhoneOutlined />}>Open Dailer</Button>
            </div> */}
            {/* <Badge dot={true} className={'marginMore'}>
                <NotificationIcon />
            </Badge> */}
            {/* <div className={'username marginRight'}>{currentUser?.email}</div> */}

            <Menu  mode="horizontal" title={currentUser?.auth?.email ? currentUser?.auth?.email : 'test'} style={{width:'200px'}} className={'username'}>
                <SubMenu key="SubMenu" title={currentUser?.auth?.email ? currentUser?.auth?.email : 'test@gmail.com'}>
                <Menu.Item key="logout" onClick={() => confirmBox(dispatch, {
                        message: 'Are you sure you want to Logout',
                        onOk: () => {
                            dispatch({ type: 'LOGOUT' })
                        }
                    })} >
                        Log Out
                    </Menu.Item>
                </SubMenu>
            </Menu>
            <Avatar style={{ backgroundColor: '#2fd838' }} icon={<UserOutlined />} />
        </div>
    </div>
    )
}
export default HomeHeader