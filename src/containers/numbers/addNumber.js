import react, { useEffect, useState } from 'react'
import { Form, Input, Button, notification, Card, Select, Radio, Switch } from 'antd';
import FormItem from '../../components/FormItem'
import './styles.less'
import { useDispatch } from 'react-redux';
import Request from '../../request';
import _ from 'lodash';
const layout = {
    labelCol: {
        span: 8,
    },
    wrapperCol: {
        span: 16,
    },
};
const tailLayout = {
    wrapperCol: {
        offset: 8,
        span: 16,
    },
};
const { Option } = Select;

const Demo = () => {
    const dispatch = useDispatch()
    const [loader, setLoader] = useState(false)
    const [formLoader, setFormLoader] = useState(false)
    const [numbersArr, getNumbers] = useState([])
    const [filters, setFilters] = useState({})
    const [formData, setData] = useState({})
    const [code, setCode] = useState([])

    const [isLocal, setLocal] = useState(true)
    const [loading, setLoading] = useState(true)


    const onFinish = async () => {
        if (!(filters?.country_id)) {
            notification.warning({
                message: 'Required Fields',
                description: 'Phone Code'
            })
            return
        }
        setLoader(true)
        let { user, token, success, message, data } = await Request.getNumbers({ country:filters?.country_id, tollfree: !isLocal })
        console.log(user, token, success, message, data)
        setLoader(false)
        if (success && data?.length) {
            getNumbers(() => data)
        } else if (success) {
            notification.success({
                message: message,
                description: ''
            })
            getNumbers(() => [])

        } else {
            getNumbers(() => [])
            notification.error({
                message: message || "Failed",
                description: message
            })
        }
    }
    const apiFunction = async (search) => {
        setLoading(true)
        let { user, token, success, message, data } = await Request.getNumberCode({ search: search })
        console.log(data)
        setLoading(false)
        if (success) {
            setCode(()=>data)
        } else {
            setCode([])

        }

    }
    useEffect(() => {
        apiFunction()
    }, [])
    const onAdd = async (valData) => {
        if (!(formData?.phonenumber)) {
            notification.warning({
                message: 'Required Fields',
                description: 'Choose number'
            })
            return
        }
        setFormLoader(true)
        let { user, token, success, message, data } = await Request.getNumbers({ ...formData, country: filters?.country_id })
        console.log(user, token, success, message, data)
        setFormLoader(false)
        if (success) {
            notification.success({
                message: message || "added"
            })
            setData(() => { })
            setFilters(() => ({ countrycode: undefined }))
            getNumbers([])
        } else {
            notification.error({
                message: message || "Failed",
                description: JSON.stringify(data).replace('[', '').replace('{', '').replace(']', '').replace('}', '')

            })
        }
    }
    const requiredRule = [{ required: true, message: 'Please input field' }]
    const setLocalFxn = (value) => {
        setLocal(value)
        setData(() => { })
        setFilters(() => ({ countrycode: undefined }))
        getNumbers([])
    }
    return (
        <div >
            <div style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                // width:'40%',
                alignItems: "center"

            }}>
                <div className="LocalText">
                    Choose your local or toll-free company number
                </div>
                <div className="buttonDiv1">
                    <div className={isLocal ? 'selectedDiv' : 'unselectedDiv'}>
                        <Button size="large" ghost={!isLocal} type={isLocal ? "primary" : "secondary"} shape="round"
                            onClick={() => { setLocalFxn(true) }} className={isLocal ? 'selectedDivButton' : 'unselectedDivButton1'}>Local</Button>
                    </div>
                    <div className={!isLocal ? 'selectedDiv' : 'unselectedDiv'}>
                        <Button size="large" ghost={isLocal} type={!isLocal ? "primary" : "secondary"} shape="round"
                            onClick={() => { setLocalFxn(() => false) }} className={!isLocal ? 'selectedDivButton' : 'unselectedDivButton1'}>Toll-Free</Button>
                    </div>
                </div>

            </div>

            <div style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                marginTop: '2rem'

            }}>

                <div style={{ fontSize: 15 }}>
                    Country Code :<Select
                        showSearch
                        onChange={(val) => setFilters((prev) => ({ ...prev, country_id: val }))}
                        style={{ width: 200, marginLeft: '10px' }}
                        placeholder="Search Country Code"
                        optionFilterProp="label"
                        loading={loading}
                        value={filters?.country_id}
                        filterOption={(input, option) => option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }
                        onInputKeyDown={(e)=>{
                            apiFunction(e?.target?.value)
                        }}
                        onClear={()=>{
                            apiFunction()

                        }}
                        // filterSort={(optionA, optionB) =>
                        //     optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
                        // }
                        options={_.map(code, val => { return ({ label: `${val?.phonecode} - ${val?.country_id}`, value: val?.country_id }) })}

                    />
                </div>
                <div style={{ marginLeft: 20, width: '10%' }}>
                    <Button
                        type="primary"
                        onClick={() => onFinish()}
                        loading={loader}>Search</Button>
                </div>

            </div>
            {
                numbersArr?.length ? <div className="marginTop">
                    <div style={{ marginTop: 10, fontSize: 16, fontWeight: 'bold' }}>Choose Number </div><Radio.Group buttonStyle="solid"
                        onChange={(e) => setData(() => ({ phonenumber: e?.target?.value }))}
                        value={formData?.phonenumber}>
                        {_.map(numbersArr, val => <Radio.Button value={val?.phonenumber} style={{
                            margin: 8,
                            padding: '1vh 2vh 2vh 2vh',
                            borderRadius: 4, height: '7vh'
                        }}>
                            <div style={{ fontSize: 14 }}>{val?.phonenumber}</div></Radio.Button>)}
                    </Radio.Group>

                </div> : null
            }
            <div style={{
                display: "flex",
                justifyContent: "center"
            }}>
                {
                    numbersArr?.length ? <Button type="primary" size="large" style={{ width: '20%', marginTop: '1rem' }} loading={formLoader} onClick={() => onAdd()}>Submit</Button> : null
                }
            </div>

        </div >
    );
};

export default Demo