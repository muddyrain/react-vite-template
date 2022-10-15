import React, { useState, useEffect } from 'react';
import { Form, Row, Col, Button } from 'antd';
import _ from 'lodash';
import { Align } from '@bees/ui';
import styles from './index.module.less';
import regulars from './regulars';
import elements from './elements';

const Fragment = ({
  formProps,
  form,
  datasource,
  labelCol,
  wrapperCol,
  gutter,
  column,
  onFieldsChange,
  onValuesChange,
  onSubmit,
  submitText,
  submitProps,
  onReset,
  resetText,
  resetProps,
  renderActions,
  className,
  style,
}) => {
  const datasourceType = Object.prototype.toString.call(datasource);
  const [initForm] = Form.useForm();
  const $form = form || initForm;
  const [formdata, setFormdata] = useState({}); // 记录更新值

  const effectdata = $form?.getFieldsValue();
  useEffect(() => {
    const values = $form.getFieldsValue();
    const result = _.isEqual(values, formdata);
    if (!result) {
      setFormdata(values);
    }
  }, [effectdata]);

  const colSpan = 24 / (column || 3);

  // 处理FormItem项
  const procedureFormItem = (item = {}) => {
    if (item?.key) {
      return (
        <Form.Item
          name={item.key}
          label={item?.label}
          initialValue={item?.initialValue}
          rules={[
            { required: item?.required, message: item?.requiredMsg },
            ...(item?.rules || []).map((item) => ({
              ...(regulars[item?.type] || {}),
              ...item,
              ...(regulars[item?.type] && { type: undefined }),
            })),
          ]}
          {...(item?.onlyEntryNumber
            ? { getValueFromEvent: (e) => e.target.value.replace(/[^\d.]/g, '') }
            : {})}
          {...(item?.props || {})}
        >
          {(() => {
            const props = {
              style: { width: item?.width || '100%' },
              placeholder:
                item?.view === 'RangePicker'
                  ? undefined
                  : item?.placeholder ||
                    `${
                      ['Select', 'Picker', 'TreeSelect'].some((key) => key.includes(item?.view))
                        ? '请选择'
                        : '请输入'
                    }${item?.label || ''}`,
              allowClear: item?.allowClear,
              ...(item?.viewProps || {}),
            };

            const type = Object.prototype.toString.call(item.view);
            if (type === '[object String]') {
              const Element = elements[item.view];
              return <Element {...props} />;
            } else if (type === '[object Object]') {
              const Element = item.view;
              return Element;
            } else if (type === '[object Function]') {
              const Element = item.view;
              return <Element {...props} />;
            } else {
              throw 'view 参数不合法';
            }
          })()}
        </Form.Item>
      );
    } else {
      return (
        <Form.Item label={item?.label} {...(item?.props || {})}>
          {item?.view}
        </Form.Item>
      );
    }
  };

  // 处理操作行
  const procedureAction = () => {
    // 重置
    const reset = () => {
      const result = onReset();
      if (!result) {
        $form.resetFields();
        setFormdata($form.getFieldsValue());
      }
    };

    if (Object.prototype.toString.call(renderActions) === '[object Function]') {
      return renderActions(() => {
        $form.validateFields().then((values) => {
          onSubmit(values);
        });
      }, reset);
    } else if (resetText && submitText) {
      return (
        <Align align="cm" gutter={16}>
          <Button {...resetProps} onClick={reset}>
            {resetText}
          </Button>
          <Button type="primary" htmlType="submit" {...submitProps}>
            {submitText}
          </Button>
        </Align>
      );
    } else if (submitText) {
      return (
        <Button type="primary" htmlType="submit" {...submitProps}>
          {submitText}
        </Button>
      );
    } else if (resetText) {
      return (
        <Button {...resetProps} onClick={reset}>
          {resetText}
        </Button>
      );
    }
  };

  return (
    <Form
      {...formProps}
      className={`${styles.former} ${className}`}
      style={style}
      form={$form}
      name="former"
      labelCol={{ span: labelCol }}
      wrapperCol={{ span: wrapperCol }}
      onFinish={(values) => {
        onSubmit(values);
      }}
      onFieldsChange={onFieldsChange}
      onValuesChange={(changedValues, allValues) => {
        setFormdata(allValues);
        onValuesChange(changedValues, allValues);
      }}
    >
      <Row gutter={gutter}>
        {(() => {
          if (datasourceType === '[object Function]') {
            return datasource(formdata);
          } else if (datasourceType === '[object Array]') {
            return datasource;
          } else {
            return [];
          }
        })().map((item, index) =>
          (() => {
            const type = Object.prototype.toString.call(item?.visible);
            if (!(type === '[object Boolean]' && item.visible === false)) {
              return (
                <Col
                  key={index}
                  span={item?.span || colSpan}
                  style={(() => {
                    if (
                      Object.prototype.toString.call(item?.hide) === '[object Boolean]' &&
                      item.hide
                    ) {
                      return { display: 'none' };
                    }
                    return {};
                  })()}
                >
                  {procedureFormItem(item)}
                </Col>
              );
            }
          })()
        )}
      </Row>
      {procedureAction()}
    </Form>
  );
};

Fragment.useForm = Form.useForm;

Fragment.defaultProps = {
  formProps: {},
  className: '',
  style: {},
  form: undefined, // 经 Former.useForm() 创建的 form 控制实例，不提供时会自动创建
  labelCol: 8,
  wrapperCol: 16,
  gutter: 0,
  column: 3, // 列数
  // [{
  //   key: undefined, // 关键字段
  //   label: undefined, // 标题
  //   hide: null, // 是否隐藏保留 key 关键字的隐藏状态 => Boolean; default: null;
  //   visible: null, // 是否显示(销毁 key 关键字的隐藏状态) => Boolean
  //   initialValue: undefined, // 初始值
  //   required: false, // 是否必填
  //   requiredMsg: undefined, // 必填时提示文案 => 请[填写|选择]${label} | requiredMsg
  //   rules: [], // 校验规则 => 校验规则 => [{ required, pattern, message, type, ... }, ...]
  //   校验规则:type(校验规则类型) => mobile | mail | IDCard | mobile_telephone | telephone | amount | bankCard | disabledCertificate | postalCode
  //   props: {}, // 表单项 Props => { className, style, help, ... }
  //   view: 'input', // 组件 => 'Input' | Element | Node
  //   viewProps: {}, // 组件 Props => {}
  //   onlyEntryNumber: false, // 仅支持输入数字
  //   width: 220, // 宽度 => 220
  //   placeholder: undefined, // 前置文字 => placeholder || 请填写${item.label}
  //   allowClear: false, // 支持清除 => true || false
  //   span: undefined, // Col 独立布局块
  // }]
  datasource: [], // 数据源 => [] | (formdata = {}) => ([])
  onFieldsChange: (changedFields, allFields) => {}, // 字段更新时触发回调事件
  onValuesChange: (changedValues, allValues) => {}, // 字段值更新时触发回调事件
  onSubmit: (values = {}) => {}, // function
  submitText: '确定', // null | string
  submitProps: {},
  onReset: (values = {}) => {}, // function
  resetText: '重置', // null | string
  resetProps: {},
  renderActions: null, // 自定义操作行，优先级高。 => (submit = () => { }, reset = () => { }) => { }, // return Node;
};

export default Fragment;
