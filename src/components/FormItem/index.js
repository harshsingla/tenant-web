import React, { PureComponent } from 'react'
import {
  Form,
  Icon,
  Input,
  Radio,
  DatePicker,
  Select,
  TimePicker,
  InputNumber,
  Switch,
  Button,
  Upload
} from 'antd'
import _ from 'lodash'
import { UploadOutlined } from '@ant-design/icons'
// import styles from './styles.less'
const { Option } = Select
const { TextArea } = Input
const { RangePicker } = DatePicker;

const styles = {
  mainDiv: {
    position: 'relative'
  },
  loadingBox: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: '100%',
    width: '100%',
    backgroundColor: 'rgba(255, 255,255, 0.5)',
    textAlign: 'center',
    paddingTop: '10%'

  }
}
export default class FormItem extends PureComponent {
   dummyRequest = ({ file, onSuccess }) => {
    setTimeout(() => {
        onSuccess("ok");
    }, 0);
  };
  componentDidMount() {
  }
  InputType = () => {
    const {
      inputType,
      getFieldDecorator,
      name,
      accept,
      validateRule,
      type,
      placeholder,
      label,
      onChange,
      defaultValue,
      onRadioChange,
      radioOptions,
      format,
      minuteStep,
      initialValues ,
      loadOpt,
      mode,
      disabled,
      options,
      tokenSeparators,
      htmlType,
      title,
      loading,
      layout,
      value,
      readonly,
      onClick,
      validator,
      maxLength,
      size,
      buttonStyle
    } = this.props
    switch (inputType) {
      case 'RADIO':
        return <Radio.Group
          // defaultValue={defaultValue && defaultValue}
          // value={value}
          size={size && size}
          buttonStyle={buttonStyle && buttonStyle}
          name={name}
          readOnly={readonly && readonly}
          onChange={onRadioChange}>
          {radioOptions.map(opt => (
            <Radio.Button value={opt.toLowerCase()} key={opt.toLowerCase()} >
              <div >{opt}</div>
            </Radio.Button>
          ))}
        </Radio.Group>
      case 'DATE':
        return <DatePicker {...this.props} format='DD/MM/YYYY' />
      
      case 'RANGEPICKER':
          return <RangePicker  {...this.props} format='DD/MM/YYYY' />
  
      case 'TIME':
        return <TimePicker
          format={format && format}
          minuteStep={minuteStep && minuteStep}
          readOnly={readonly && readonly}
        />
      case 'SWITCH':
        return <Switch />

      case 'UPLOAD':
        return <Upload name="logo" action="/upload.do" customRequest={this.dummyRequest} accept={accept}  listType="picture">
          <Button icon={<UploadOutlined />}>Click to upload</Button>
        </Upload>
      
      case 'SELECT':
        return loadOpt ? <Select
          placeholder={placeholder || label}
          showSearch
          allowClear={true}
          onChange={onChange && onChange}
          readOnly={readonly && readonly}
          disabled={disabled && disabled}
          style={{ width: this.props.width ? this.props.width : '100%' }}
          mode={mode && mode}
          className={layout ? styles.layout : null}
          filterOption={(input, option) =>
            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
          tokenSeparators={tokenSeparators && tokenSeparators}>
          {options && options}
        </Select>
          :
          <Select
            showSearch
            placeholder={placeholder || label}
            onChange={onChange && onChange}
            readOnly={readonly && readonly}
            disabled={disabled && disabled}
            style={{ width: this.props.width ? this.props.width : '100%' }}
            mode={mode && mode}
            filterOption={(input, option) =>
              option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
            tokenSeparators={tokenSeparators && tokenSeparators}>
            {options &&
              options.map(opt => {
                return (
                  <Option value={opt?.value || opt?.label} key={opt?.value || opt?.label}>
                    {opt?.label}
                  </Option>
                )
              })}
          </Select>
      case 'TEXTAREA':
        return <TextArea
          className={name}
          prefix={
            <Icon type={type && type} style={{ color: 'rgba(0,0,0,.25)' }} />
          }
          placeholder={placeholder || name}
          onChange={onChange && onChange}
          readOnly={readonly && readonly}
        />
      case 'NUMBER':
        return <InputNumber
          onChange={onChange}
          readOnly={readonly && readonly}
          style={{ width: this.props.width ? this.props.width : '' }}
        />
      case 'PASSWORD':
        return <Form.Item
          className={name}
          name={name || label}
          placeholder={placeholder || label || _.startCase(name)}
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password />
        </Form.Item>
      case 'BUTTON':
        return (
          <Button
            type={type && type}
            style={buttonStyle && buttonStyle}
            htmlType={htmlType && htmlType}
            loading={loading && loading}
            onClick={onClick}>
            {title}
          </Button>
        )
      default:
        return <Input
          className={name}
          name={name || label}
          maxLength={maxLength}
          placeholder={placeholder || label || _.startCase(name)}
          readOnly={readonly && readonly}
          initialValues ={initialValues  && initialValues }
          onChange={onChange}
        />
    }
  }

  render() {
    let {
      label,
      name,
      getFieldDecorator,
      validateRule,
      layout,
      formItemLayout,
      tailLayout
    } = this.props


    if (!formItemLayout && !layout) {
      formItemLayout = {
        labelCol: {
          xs: { span: 24 },
          sm: { span: 8 },
          md: { span: 8 }
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 16 },
          md: { span: 12 }
        }
      }
    }

    if (!label) {
      label = _.startCase(name)
    }

    return (
      <>
        <Form.Item
          label={label && label}
          {...this.props}
          {...formItemLayout}
          {...tailLayout}
          className={styles.FormItem}>
          {this.InputType()}
        </Form.Item>
      </>
    )
  }
}