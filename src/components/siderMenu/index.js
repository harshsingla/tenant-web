import React, { useEffect, useState } from 'react'
import { Layout, Menu, Button } from 'antd';
import './styles.less'
import { Link } from 'react-router-dom'
import _ from 'lodash'
import { ReactComponent as HeadLogo } from '../../assets/dailmantraWhite.svg'
import { useSelector } from 'react-redux';
import { ReactComponent as NotificationIcon } from '../../assets/notification.svg'

const { Sider } = Layout;
const { SubMenu } = Menu


export default (props) => {
    const { menuData, path, collapsed, isMobile } = props
    const [selected, setSelected] = useState(false)
    const { currentUser } = useSelector((state) => ({
        currentUser: state.global.currentUser
    }))
    useEffect(() => {
        if (menuData) {
            _.forEach(menuData, (menu) => {
                if (path === menu.path)
                    setSelected(() => menu.key)
            })
        }
    }, [menuData])

    const createSubMenu = (item) => {
        if (item.children) {
            return (
                <SubMenu
                    key={item.key}
                    title={
                        <span>
                            {item.icon}
                            <span>{item.name}</span>
                        </span>
                    }
                >
                    {item.children.map(child => {
                        return (
                            <Menu.Item key={child.key} title={child.name}>
                                <Link
                                    to={child.path}
                                >
                                    {child.icon}
                                    <span>{child.name}</span>
                                </Link>
                            </Menu.Item>
                        )
                    })}
                </SubMenu>
            )
        }
    }

    return (
        <Sider
            className={'drawer'}
            trigger={null}
            collapsedWidth={0}
            style={{ height: isMobile ? '100%' : 'unset' }}
            collapsible collapsed={collapsed}
        >

            <div>
                <div className={'namespace'}>
                    <div className={' flex'} style={{ width: '3rem' }}>
                        <HeadLogo />
                        {/* <NotificationIcon /> */}
                    </div>
                    <span>Dialmantra</span>
                </div>
                <Menu mode='inline'
                    selectedKeys={[selected]}
                    onSelect={(item) => {
                        setSelected(item.key)
                    }}
                    className={'menu'}
                >
                    {(_.filter(menuData, (e) => !e.dontShowOnMenu)).map(item => {
                        return (item.children ? createSubMenu(item) :
                            <Menu.Item key={item.key} title={item.name} className={'menuItem'}>
                                <Link

                                    to={item.path} style={{ display: "flex", alignItems: "center" }}
                                >
                                    <div>{item.icon}</div>
                                    <span className="manuItemName">{item.name}</span>
                                </Link>
                            </Menu.Item>
                        )
                    })}
                </Menu>
            </div>
            {!currentUser?.verified?<div className="flex" style={{
                //  bottom: 0,position: 'absolute',
                marginBottom: '4rem',
                marginLeft: '4rem'
            }}>
                <Button type="primary" onClick={() => window.location.href = "/reconfirmation"}>
                    Reupload Documents</Button>
            </div>:
            <div className="flex" style={{
                //  bottom: 0,position: 'absolute',
                marginBottom: '4rem',
                marginLeft: '4rem'
            }}>
                <Button type="primary">
                    Balance : {currentUser?.balance?.balance}</Button>
            </div>}
           
        </Sider>
    );
}