import { useState, lazy, useEffect } from 'react';
import { Card, Switch, Tooltip, notification, Radio, message, Table, Tabs, Button, Input, Tag } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import './styles.less'
import { OrderedListOutlined,CloseCircleOutlined, SearchOutlined, DeleteOutlined, DeleteTwoTone, EditOutlined } from '@ant-design/icons';
import { getPushPathWrapper } from '../../routes';
import Request from '../../request'
import moment from "moment";
import { confirmBox } from '../../utils';
import { replace } from 'lodash';
import CallQueue from './callQueueNumber'
import FilterTable from '../../components/Table'
import Upgradeplan from '../settings/upgradePlan'

const HomeView = (props) => {
  const dispatch = useDispatch()
  const { currentUser } = useSelector((state) => ({
    currentUser: state.global.currentUser
  }))
  const [dataSource, setDataSource] = useState([])
  const [loading, setLoader] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [number, setNumber] = useState({})


  const deleteNumber = (fields) => {
    confirmBox(dispatch, {
      message: 'Are you sure you want to Delete',
      onOk: async () => {
        setLoader(true)
        let { user, token, success, message, data } = await Request.deleteNumbers(fields?.id)
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
    })
  }
  const deleteQueueNumber = (fields) => {
    confirmBox(dispatch, {
      message: 'Are you sure you want to Delete Queue',
      onOk: async () => {
        setLoader(true)
        let { user, token, success, message, data } = await Request.deleteQueue({number:fields?.id})
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
    })
  }
  const setShowModalFxn=(record)=>{
    setShowModal(true)
    setNumber(record)
    // request
  }
  const onChange=async(val,id)=>{
    setLoader(true)
    let { user, token, success, message, data } = await Request.updateNumber(id,{active:val})
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
      title: 'Phone Number',
      dataIndex: 'phonenumber',
      key: 'phonenumber',
      search: true,
    },
    {
      title: 'Phone Code',
      dataIndex: 'phonecode',
      key: 'phonecode',
      search: true,
    },
    {
      title: 'Area',
      dataIndex: 'area',
      key: 'area',
    },
    {
      title: 'Province',
      dataIndex: 'province',
      key: 'province',
    },
    {
      title: 'Active',
      dataIndex: 'active',
      key: 'active',
      render: (val, record) => {
        return <Switch checked={val} onChange={(e)=>onChange(e,record?.id)} />
      }
    },
    // {
    //   title: 'Toll-Free',
    //   dataIndex: 'tollfree',
    //   key: 'tollfree',
    //   render: (val, r) => {
    //     return <Tag color={val ? '#2fd838' : "#f50"}>{val ? 'Yes' : 'No'}</Tag>
    //   }
    // },
    // {
    //   title: 'Created At',
    //   dataIndex: 'createdon',
    //   key: 'createdon',
    //   render: (val, r) => {
    //     return <Tag>{moment(val).format('DD-MM-YYYY')}</Tag>
    //   }
    // },

    {
      title: 'Action',
      dataIndex: 'Action',
      key: 'Action',
      render: (val, record) => {
        return <div className="flex">
          <div>
            <Tooltip title="Delete Number">
            <DeleteOutlined style={{ color: "red",marginRight:10, fontSize: 20 }} onClick={() => deleteNumber(record)} />
            </Tooltip>
            {record?.call_queue?<Tooltip title="Delete Call Queue">
            <CloseCircleOutlined  style={{ marginRight:10,fontSize: 20 }} onClick={() => deleteQueueNumber(record)} />
            </Tooltip>:null}

            {record?.call_queue?<Tooltip title="Update Priority Queue">
            <OrderedListOutlined style={{ color: "black", fontSize: 20 }} onClick={() => setShowModalFxn(record)} />
            </Tooltip>:null}

          </div>
        </div>
      }
    },
  ];
  const apiFunction = async () => {
    setLoader(true)
    let { user, token, success, message, data } = await Request.getAllNumbers()
    setLoader(false)
    if (success) {
      setDataSource(()=>data)
    } else {
      setDataSource(()=>[])

      // notification.error({
      //   message: message || "Failed"
      // })
    }
  }
  useEffect(() => {
    apiFunction()
  }, [])
  // if(true){
  //   return <Upgradeplan />
  // }
  return <div>
    <div className="flex jcsb marginRightLarge">
      <div>
        {/* <Input
          placeholder="Search"
          suffix={
              <SearchOutlined style={{ color: 'rgba(0,0,0,.45)' }} />
          }
          style={{borderRadius:'4px'}}
        /> */}
      </div>
      <Button type="primary" className="buttonPrimaryStyle" onClick={()=> dispatch(getPushPathWrapper('addNumbers'))}>
        Add Number
        </Button>
    </div>
    <div className="marginTop">
      <FilterTable bordered dataSource={dataSource} columns={columns} loading={loading} />

    </div>
    {showModal&&<CallQueue  showModal={showModal} setShowModal={setShowModal} number={number}/>}
  </div>
}

export default HomeView;