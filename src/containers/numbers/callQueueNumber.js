import React, { useState, useEffect, lazy } from 'react';
import { Select, Table, Button, notification, Modal } from 'antd';
import { sortableContainer, sortableElement, sortableHandle } from 'react-sortable-hoc';
import { MenuOutlined, DeleteOutlined, FileTwoTone } from '@ant-design/icons';
import { arrayMoveImmutable } from 'array-move';
import './styles.less'
import Request from '../../request'
import _ from 'lodash'
import moment from 'moment'
const DragHandle = sortableHandle(() => <MenuOutlined style={{ cursor: 'grab', color: '#999' }} />);

const columns = [
    {
        title: 'Sort',
        dataIndex: 'sort',
        // width: 40,
        className: 'drag-visible',
        render: () => <DragHandle />,
    },
    {
        title: 'Name',
        dataIndex: 'firstname',
        key: 'firstname',
        // width: 150,/
        fixed: 'left',
        render: (val, r) => {
            return <>{val} {r?.lastname}</>
        }
    },
    {
        title: 'Email',
        dataIndex: 'email',
        key: 'email',
        // width: 250,
        search: true

    },
    // {
    //     title: 'Allocated Phone',
    //     dataIndex: 'allocatedphone',
    //     key: 'allocatedphone',
    //     render: (val, r) => {
    //         return val?.phonenumber
    //     }
    // },
    {
        title: 'Phone',
        dataIndex: 'mobile',
        key: 'mobile',
    },
];
const SortableItem = sortableElement(props => <tr {...props} />);
const SortableContainer = sortableContainer(props => <tbody {...props} />);

const Home = ({ showModal, setShowModal, number }) => {

    const [dataSource, setState] = useState([])
    const [callers, setCallers] = useState([])
    const [filters, setFilters] = useState({})
    const [CallQueueId, setCallQueueId] = useState('')
    const [loading, setLoader] = useState(false)

    const apiFunction1 = async () => {
        setLoader(true)
        let { user, token, success, message, data } = await Request.fetchQueue({ number: number?.id })
        setLoader(false)
        if (success) {
            setCallQueueId(data?.id)
            setCallerFromApis(data?.items)
        } else {

            notification.error({
                message: message || "Failed"
            })
        }
    }

    const apiFunction2 = async () => {
        setLoader(true)
        let { user, token, success, message, data } = await Request.allCaller()
        setLoader(false)
        if (success) {
            setCallers(() => data)
        } else {
            setCallers(() => [])

            // notification.error({
            //   message: message || "Failed"
            // })
        }
    }
    useEffect(() => {
        apiFunction1()
        apiFunction2()
    }, [])
    const onAdd = async () => {
        if (!(dataSource.length)) {
            notification.warning({
                message: 'Required Fields',
                description: 'Choose Callers'
            })
            return
        }

        let itemArr = _.map(dataSource, val => ({ caller: val?.id }))
        let obj = {
            items: itemArr
        }
        setLoader(true)
        let { user, token, success, message, data } = await Request.updateQueue(CallQueueId,{ ...obj })
        setLoader(false)
        if (success) {
            notification.success({
                message: message || "added"
            })
        } else {
            notification.error({
                message: message || "Failed",
                description: JSON.stringify(data).replace('[', '').replace('{', '').replace(']', '').replace('}', '')

            })
        }
    }
    const onSortEnd = ({ oldIndex, newIndex }) => {
        if (oldIndex !== newIndex) {
            const newData = arrayMoveImmutable([].concat(dataSource), oldIndex, newIndex).filter(el => !!el);
            console.log('Sorted items: ', newData);
            setState(newData);
        }
    };

    const DraggableContainer = props => (
        <SortableContainer
            useDragHandle
            disableAutoscroll
            helperClass="row-dragging"
            onSortEnd={onSortEnd}
            {...props}
        />
    );
    const handleCancel = () => {
        setShowModal(() => false)
        setState([])
        setCallQueueId(undefined)
        setFilters({
            caller: undefined
        })
    };

    const DraggableBodyRow = ({ className, style, ...restProps }) => {
        // function findIndex base on Table rowKey props and should always be a right array index
        const index = dataSource.findIndex(x => x.index === restProps['data-row-key']);
        return <SortableItem index={index} {...restProps} />;
    };
    const setCallersFxn = (val) => {
        let arr = []
        let i =0
        _.forEach(val, search => {
            let obj = _.find(callers, call => call?.id == search)
            arr.push({
                ...obj?.auth,
                ...obj,
                index: i++
            })
        })
        setFilters((prev)=>({...prev,caller:val}))
        setState(arr)

    }
    const setCallerFromApis = (val) => {
        let arr = []
        let callerId=[]

        let i = 0
        _.forEach(val, search => {
            callerId.push(search?.caller?.id)
            arr.push({
                ...search?.caller?.auth,
                ...search?.caller,
                index: i++
            })
        })
        setFilters((prev)=>({...prev,caller:callerId}))
        setState(arr)

    }

    return (<Modal visible={showModal} destroyOnClose={true} onCancel={handleCancel} width={900} height={400} footer={null}>
        <div>
        {console.log(dataSource,"??????????dataSource")}
        {console.log(filters,"??????????filters")}
            <div className="flex marginRight">
                <div style={{ fontSize: 16, marginRight: '1rem' }}>Number : {number?.phonenumber}</div>
                <div className="marginRight">
                </div>
            </div>
            <div>
                <div className="flex marginTop">
                    <div style={{ fontSize: 16, marginRight: '1rem' }}>Select Callers for Queue :</div>
                    <Select
                        showSearch
                        allowClear={true}
                        mode="multiple"
                        key={filters?.caller}
                        onChange={(val) => setCallersFxn(val)}
                        style={{ width: 250, border: '1px solid #e1e3e8', borderRadius: '4px' }}
                        placeholder="Select Callers"
                        value={filters?.caller}
                        options={_.map(callers, val => { return ({ label: val?.auth?.firstname, value: val?.id }) })}

                    />
                </div>
            </div>
            <div className="marginTop">
                <div style={{ fontSize: 16, marginRight: '1rem', fontWeight: "bold" }}>Queue the callers</div>
                <Table
                    pagination={false}
                    dataSource={dataSource}
                    columns={columns}
                    rowKey="index"
                    size="small"
                    components={{
                        body: {
                            wrapper: DraggableContainer,
                            row: DraggableBodyRow,
                        },
                    }}
                />
            </div>
            <div className="flex jcc aic marginTopLarge">
                <Button type="primary" className="buttonPrimaryStyle" loading={loading} onClick={() => onAdd()}>Update Queue</Button>

            </div>
        </div>
    </Modal>
    );
}

export default Home
