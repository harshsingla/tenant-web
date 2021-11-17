import { useState, lazy, useEffect } from 'react';
import { Card, Space, Tooltip, notification, Radio, message, Table, Tabs, Button, Input, Tag, Switch } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import './styles.less'
import { AudioOutlined, DeleteColumnOutlined, SearchOutlined, DeleteOutlined, DeleteTwoTone, EditOutlined } from '@ant-design/icons';
import { getPushPathWrapper } from '../../routes';
import Request from '../../request'
import moment from "moment";
import { confirmBox } from '../../utils';
import async from 'async'
import FilterTable from '../../components/Table'
import _ from 'lodash';

const { Search } = Input;


const HomeView = (props) => {
    const dispatch = useDispatch()
    const { currentUser } = useSelector((state) => ({
        currentUser: state.global.currentUser
    }))
    const [dataSource, setDataSource] = useState([])
    const [loading, setLoader] = useState(false)


    const suffix = (
        <AudioOutlined
            style={{
                fontSize: 16,
                color: '#1890ff',
            }}
        />
    );

    const onSearch = value => console.log(value);

    const deleteUser = (fields) => {
        confirmBox(dispatch, {
            message: 'Are you sure you want to Delete',
            onOk: async () => {
                setLoader(true)
                let { user, token, success, message, data } = await Request.deleteCaller(fields?.id)
                setLoader(false)
                if (success) {
                    notification.success({
                        message: message || "Failed"
                    })
                    apiFunction()
                } else {
                    notification.error({
                        message: message || "Failed"
                    })
                }
            }
        })
    }
    const edit = (record) => {
        dispatch(getPushPathWrapper('editUser', record))
    }
    const onChange = async (val, id) => {
        setLoader(true)
        let { user, token, success, message, data } = await Request.updateCaller(id, { callerstatus: val?'blocked':'inactive' })
        setLoader(false)
        if (success) {
            notification.success({
                message: message || "success"
            })
            apiFunction()
        } else {
            notification.error({
                message: message || "Failed"
            })
        }
    }
    const columns = [
        {
            title: 'Name',
            dataIndex: 'firstname',
            key: 'firstname',
            width: 250,
            fixed: 'left',
            // search:true,
            render: (val, record) => {
                return <>{val} {record.lastname}</>
            }
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            width: 250,
            search: true

        },
        {
            title: 'Allocated Phone',
            dataIndex: 'allocatedphone',
            key: 'allocatedphone',
            render: (val, r) => {
                return <>{val?.phonecode&&<>({val?.phonecode})</>} {val?.phonenumber}</>
             }
        },
        {
            title: 'Department',
            dataIndex: 'department',
            key: 'department',
            render: (val, r) => {
                return val?.deptname
            }
        },
        // {
        //     title: 'Phone',
        //     dataIndex: 'mobile',
        //     key: 'mobile',
        // },
        // {
        //     title: 'Country',
        //     dataIndex: 'callercountry',
        //     key: 'callercountry',
        // },
        // {
        //     title: 'Status',
        //     dataIndex: 'callerstatus',
        //     key: 'callerstatus',
        // },
        {
            title: 'Status',
            dataIndex: 'online',
            key: 'online',
            render: (val, r) => {
                return <Tag style={{ borderRadius: 30, width: 80, justifyContent: "center" }} color={val ? '#2fd838' : "#f50"}>{(val ? 'online' : 'offline')}</Tag>
            }
        },
        // {
        //     title: 'Working hours',
        //     dataIndex: 'workinghours',
        //     key: 'workinghours',
        // },
        // {
        //     title: 'Comments',
        //     dataIndex: 'comments',
        //     key: 'comments',
        // },

        // {
        //     title: 'Created At',
        //     dataIndex: 'createdon',
        //     key: 'createdon',
        //     render: (val, r) => {
        //         return <Tag>{moment(val).format('DD-MM-YYYY')}</Tag>
        //     }
        // },
        {
            title: 'Blocked',
            dataIndex: 'callerstatus',
            key: 'callerstatus',
            render: (val, record) => {
                return <Switch checked={val=='blocked'?true:false} onChange={(e) => onChange(e, record?.id)} />
            }
        },
        {
            title: 'Action',
            dataIndex: 'Action',
            key: 'Action',
            // width: 130,
            // fixed: 'right',
            render: (val, record) => {
                return <div className="flex">
                    <div>
                        <DeleteOutlined style={{ color: "red", fontSize: 20 }} onClick={() => deleteUser(record)} />
                    </div>
                    <div style={{ marginLeft: 10 }}>
                        <EditOutlined style={{ color: "primary", fontSize: 20 }} onClick={() => edit(record)} />
                    </div>
                </div>
            }
        },
    ];
    const apiFunction = async () => {
        setLoader(true)
        let { user, token, success, message, data } = await Request.allCaller()
        setLoader(false)
        let newData = []
        if (success) {
            async.forEach(data, (val, cb) => {
                let obj = {
                    ...val?.auth,
                    ...val,
                }
                newData.push(obj)
                cb()
            }, () => {
                setDataSource(newData)
            })
        } else {
            setDataSource([])

            // notification.error({
            //     message: message || "Failed"
            // })
        }
    }
    useEffect(() => {
        apiFunction()
    }, [])
    return <div>
        <div className="flex jcsb marginRight">
            <div>
                {/* <Input
                    placeholder="Search"
                    suffix={
                        <SearchOutlined style={{ color: 'rgba(0,0,0,.45)' }} />
                    }
                    style={{ borderRadius: '4px' }}
                /> */}
            </div>
            <Button type="primary" className="buttonPrimaryStyle" onClick={() => dispatch(getPushPathWrapper('addUser'))}>
                Add User
            </Button>
        </div>
        <div className="marginTop">
            <FilterTable size="large" bordered dataSource={dataSource} columns={columns} loading={loading} />

        </div>
    </div>
}

export default HomeView;