import react, { useEffect, useState } from 'react'
import { Form, Input, Button, notification, Card } from 'antd';
import FormItem from '../../components/FormItem'
import './styles.less'
import { useDispatch } from 'react-redux';
import Request from '../../request';
import _ from 'lodash'
import { getUrlParams } from '../../routes';
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
        span: 8,
    },
};

const Demo = (props) => {
    const dispatch = useDispatch()
    const [form] = Form.useForm()
    const [loader, setLoader] = useState(false)
    const [params, setParams] = useState(false)
    const [department, setDepartment] = useState([])
    const [countries, setCountries] = useState([])
    const [numbers, setNumber] = useState([])

    const getFunction = async () => {
        let { user, token, success, data } = await Request.getCountries()
        if (success) {
            setCountries(() => data)
        } else {
            setCountries(() => [])

        }
    }
    const onFinish = async (valData) => {
        if (params?.id) {
            setLoader(true)
            valData = {
                ...valData,
                auth: {
                    firstname: valData?.firstname,
                    lastname: valData?.lastname,
                    email: valData?.email,
                    password: valData?.password,
                    mobile: valData?.mobile,
                }
            }
            let { user, token, success, message, data } = await Request.updateCaller(params?.id, { ...valData })
            console.log(success, data, message)
            setLoader(false)
            if (success) {
                notification.success({
                    message: message
                })
            } else {
                notification.error({
                    message: message || "Failed",
                    description:JSON.stringify(data).replace('[','').replace('{','').replace(']','').replace('}','')

                })
            }
        } else {
            setLoader(true)
            let { user, token, success, message, data } = await Request.addCaller(valData)
            setLoader(false)
            if (success) {
                notification.success({
                    message: message
                })
                form.resetFields()
            } else {
                notification.error({
                    message: `${message}` || "Failed",
                    description:JSON.stringify(data).replace('[','').replace('{','').replace(']','').replace('}','')
                })
            }
        }
    }

    const requiredRule = [{ required: true, message: 'Please input field' }]
    const apiFunction = async () => {
        let { success: deptSuccess, data: deptData } = await Request.allDept()
        if (deptSuccess) {
            setDepartment(() => deptData)
        }

        let params = getUrlParams('editUser', window.location.pathname)
        if (params?.id) {
            setParams(params)
            let { user, token, success, message, data } = await Request.getCaller(params?.id)
            if (success) {
                let mainData = data
                if (mainData?.department)
                    mainData.department = _.find(deptData, val => val?.id == mainData?.department?.id)?.id

                if (mainData?.callercountry)
                    mainData.callercountry = _.find(countries, val => val?.value == mainData?.callercountry)?.value
                mainData = {
                    ...mainData.auth,
                    ...mainData,
                    allocatedphone:mainData?.allocatedphone?.id
                }
                console.log(mainData)
                form.setFieldsValue({ ...mainData })
            } else {
                notification.error({
                    message: message || "Failed",
                    description:JSON.stringify(data).replace('[','').replace('{','').replace(']','').replace('}','')

                })
            }

        }
    }
    const NumberFxn = async () => {
        let { user, token, success, message, data } = await Request.getAllNumbers()
        if (success) {
          setNumber(()=>data)
        } else {
            setNumber(()=>[])
        }
      }
    useEffect(async () => {
        apiFunction()
        getFunction()
        NumberFxn()
    }, [props])
    return (
        <Card style={{ flex: 1 }}>
            {console.log(form.getFieldsValue())}
            <Form
                {...layout}
                form={form}
                onFinish={onFinish}
            >
                <FormItem
                    label={'First Name'}
                    name="firstname"
                    rules={requiredRule}
                />
                <FormItem
                    label={'Last Name'}
                    name="lastname"
                    rules={requiredRule}
                />
                <FormItem
                    label={'Department'}
                    name="department"
                    inputType={"SELECT"}
                    options={_.map(department, val => { return ({ label: val?.deptname, value: val?.id }) })}
                />
                <FormItem
                    label={'Allocated Phone'}
                    name="allocatedphone"
                    // rules={requiredRule}    
                    inputType={"SELECT"}
                    options={_.map(numbers, val => { return ({ label: val?.phonenumber, value: val?.id }) })}
                />
                {/* <FormItem
                    label={'Country'}
                    name="country"
                    inputType={"SELECT"}
                    options={_.map(countries, val => { return ({ label: val?.countryname, value: val?.countrycode }) })}
                /> */}
                <FormItem
                    label={'Phone'}
                    name="mobile"
                    rules={requiredRule}
                    maxLength={10}
                />
                <FormItem
                    label={'Comments'}
                    name="comments"
                />

                <FormItem
                    label={'Email Id'}
                    name="email"
                    rules={[{ ...requiredRule[0], message: 'Input must be of email', type: 'email' }]}
                />
               {!params&& <FormItem
                    label={'password'}
                    name="password"
                    inputType="PASSWORD"
                    rules={requiredRule}
                />}

                <div >
                    <FormItem
                        inputType="BUTTON"
                        tailLayout={tailLayout}
                        type="primary"
                        buttonStyle={{ width: 180, marginTop: 50 }}
                        loading={loader}
                        title="SUBMIT"
                        htmlType="submit" />
                </div>
            </Form>
        </Card >
    );
};

export default Demo