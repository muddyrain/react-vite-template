import React, { FC, useState } from "react";
import { Modal, Button, ButtonProps, ModalProps } from "antd";
import Confirm from "./confirm";
import { SizeProps } from "@/interface/baseProps";
import { CommonComponentsProps } from "@/interface/commonComponentsProps";

// 处理框架宽度
const procedureWidth = (width: SizeProps | number) => {
  switch (width) {
    case "small":
      return 480;
    case "default":
      return 600;
    case "medium":
      return 680;
    case "large":
      return 880;
    default:
      return width;
  }
};

interface DialogProps extends CommonComponentsProps {
  /**标题 */
  title?: string;
  onOpen?: () => void;
  okText?: React.ReactNode;
  openText?: React.ReactNode;
  cancelText?: React.ReactNode;
  okButtonProps?: ButtonProps;
  cancelButtonProps?: ButtonProps;
  openButtonProps?: ButtonProps;
  onOk?: (hide: () => void) => boolean;
  onCancel?: () => void;
  afterClose?: () => void;
  footer?: (close: () => void) => React.ReactNode | React.ReactNode | any;
  width?: SizeProps | number;
  renderOpenButton?: (int: () => void) => void;
}
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
  width,
  children,
  renderOpenButton,
  openButtonProps,
  openText,
}: DialogProps) => {
  const [visible, setVisible] = useState(false);

  // 处理打开按钮
  const procedureOpenButton = () => {
    const type = Object.prototype.toString.call(renderOpenButton);
    if (type === "[object Function]") {
      return (
        renderOpenButton &&
        renderOpenButton(() => {
          onOpen && onOpen();
          setVisible(true);
        })
      );
    } else {
      return (
        <Button
          {...openButtonProps}
          onClick={() => {
            onOpen && onOpen();
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
        width={procedureWidth(width!)}
        open={visible}
        okText={okText}
        okButtonProps={{
          ...okButtonProps,
          style: {
            display: okText ? "inline-block" : "none",
            ...(okButtonProps?.style || {}),
          },
        }}
        onOk={() => {
          const blocker = onOk && onOk(() => setVisible(false)); // 拦截器
          !blocker && setVisible(false);
        }}
        cancelText={cancelText}
        cancelButtonProps={{
          ...cancelButtonProps,
          style: {
            display: cancelText ? "inline-block" : "none",
            ...(cancelButtonProps?.style || {}),
          },
        }}
        onCancel={() => {
          setVisible(false);
          onCancel && onCancel();
        }}
        afterClose={afterClose}
        {...(() => {
          const type = Object.prototype.toString.call(footer);
          if (type === "[object Undefined]") {
            return {};
          } else if (type === "[object Function]") {
            return {
              footer:
                footer &&
                footer(() => {
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

// Fragment.Confirm = Confirm;

Fragment.defaultProps = {
  /* ### 按钮属性 ### */
  // visible: null, // 受控 => 开启 visible 为 Boolean 值时，所有 open 都将失效，等效于原 Modal
  openText: "打开",
  openButtonProps: {},
  onOpen: () => {},
  renderOpenButton: undefined, // 渲染元素 => undefined || function -> (open = () => {}) => { return Elemet }
  /* ### 弹窗属性 ### */
  className: "",
  style: {},
  title: "弹窗标题",
  width: "medium", // 标准弹窗宽度 => small:480 | 【默认】medium:680 | large:880 | integer
  okText: "确定", // 确定按钮文案 => 值为 false 时，不显示
  okButtonProps: {},
  onOk: (hide = () => {}) => false, // 用 return 拦截 visible
  cancelText: "取消", // 取消按钮文案 => 值为 false 时，不显示
  cancelButtonProps: {},
  onCancel: () => {}, // 用 return 拦截 visible
  afterClose: () => {}, // 弹窗完全关闭后的回调
  footer: undefined, // 自定义页脚 => ReactNode || (close) => ReactNode,
  children: undefined,
};

export default Fragment;
