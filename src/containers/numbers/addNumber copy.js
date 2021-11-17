import react, { useState } from 'react'
import { Form, Input, Button, Checkbox, Card } from 'antd';
import FormItem from '../../components/FormItem'
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

const Demo = () => {
    const [formData, setFormData] = useState({})
    const onFinish = (values) => {
        console.log('Success:', values);
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    return (
        <Card>
            <Form
                {...layout}
                name="basic"
                initialValues={{
                    remember: true,
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
            >
               
                <FormItem
                    label={'Number'}
                    name="Number"
                    inputType={"NUMBER"}
                    required={true}
                />
                
                <FormItem
                    label={'Radio'}
                    name="Radio"
                    inputType={"RADIO"}
                    radioOptions={['DWED','DWQDQWDQ','RWAR']}
                    required={true}
                />
                 <FormItem
                    label={'Switch'}
                    name="Switch"
                    inputType={"SELECT"}
                    options={['DWED','DWQDQWDQ','RWAR']}
                    required={true}
                />
                
                <FormItem
                    label={'pass'}
                    name="pass"
                />
                   <FormItem
                    label={'Number'}
                    name="Number"
                    inputType={"TEXTAREA"}
                    required={true}
                />
                <FormItem
                    inputType="BUTTON"
                    tailLayout={tailLayout}
                    type="primary"
                    title="SUBMIT"
                    htmlType="submit" />
            </Form>
        </Card >
    );
};

export default Demo