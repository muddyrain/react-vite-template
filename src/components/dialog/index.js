import React, { useState } from 'react';
import { Modal, Button } from 'antd';
import Confirm from './confirm';

// 处理框架宽度
const procedureWidth = (width) => {
  switch (width) {
    case 'small':
      return 480;
    case 'medium':
      return 680;
    case 'large':
      return 880;
    default:
      return width;
  }
};

const Fragment = ({
  className,
  style,
  title,
  onOpen,
  okText,
  okButtonProps,
  onOk,
  cancelText,
  cancelButtonProps,
  onCancel,
  afterClose,
  footer,
  children,
  width,
  renderOpenButton,
  openButtonProps,
  openText,
}) => {
  const [visible, setVisible] = useState(false);

  // 处理打开按钮
  const procedureOpenButton = () => {
    const type = Object.prototype.toString.call(renderOpenButton);
    if (type === '[object Function]') {
      return renderOpenButton(() => {
        onOpen();
        setVisible(true);
      });
    } else {
      return (
        <Button
          {...openButtonProps}
          onClick={() => {
            onOpen();
            setVisible(true);
          }}
        >
          {openText}
        </Button>
      );
    }
  };

  return (
    <>
      {procedureOpenButton()}
      {/* 弹窗 */}
      <Modal
        className={className}
        destroyOnClose
        style={style}
        title={title}
        width={procedureWidth(width)}
        visible={visible}
        okText={okText}
        okButtonProps={{
          ...okButtonProps,
          style: {
            display: okText ? 'inline-block' : 'none',
            ...(okButtonProps?.style || {}),
          },
        }}
        onOk={() => {
          const blocker = onOk(() => setVisible(false)); // 拦截器
          !blocker && setVisible(false);
        }}
        cancelText={cancelText}
        cancelButtonProps={{
          ...cancelButtonProps,
          style: {
            display: cancelText ? 'inline-block' : 'none',
            ...(cancelButtonProps?.style || {}),
          },
        }}
        onCancel={() => {
          setVisible(false);
          onCancel();
        }}
        afterClose={afterClose}
        {...(() => {
          const type = Object.prototype.toString.call(footer);
          if (type === '[object Undefined]') {
            return {};
          } else if (type === '[object Function]') {
            return {
              footer: footer(() => {
                setVisible(false);
              }),
            };
          } else {
            return { footer };
          }
        })()}
      >
        {children}
      </Modal>
    </>
  );
};

Fragment.Confirm = Confirm;

Fragment.defaultProps = {
  showHide: () => {}, // 暴露 hide 方法 [未实现]
  /* ### 按钮属性 ### */
  // visible: null, // 受控 => 开启 visible 为 Boolean 值时，所有 open 都将失效，等效于原 Modal
  openText: '打开',
  openButtonProps: {},
  onOpen: () => {},
  renderOpenButton: undefined, // 渲染元素 => undefined || function -> (open = () => {}) => { return Elemet }
  /* ### 弹窗属性 ### */
  defaultVisible: false, // 初始弹窗显示状态
  className: '',
  style: {},
  title: '弹窗标题',
  width: 'medium', // 标准弹窗宽度 => small:480 | 【默认】medium:680 | large:880 | integer
  okText: '确定', // 确定按钮文案 => 值为 false 时，不显示
  okButtonProps: {},
  onOk: (hide = () => {}) => {}, // 用 return 拦截 visible
  cancelText: '取消', // 取消按钮文案 => 值为 false 时，不显示
  cancelButtonProps: {},
  onCancel: () => {}, // 用 return 拦截 visible
  afterClose: () => {}, // 弹窗完全关闭后的回调
  footer: undefined, // 自定义页脚 => ReactNode || (close) => ReactNode,
  children: undefined,
};

export default Fragment;
