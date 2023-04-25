import React, { FC, useState } from 'react'
import { Modal, Button, ButtonProps, ModalProps } from 'antd'
import Confirm from '../confirm'
import { SizeProps } from '@/interface/baseProps'
import { CommonComponentsProps } from '@/interface/commonComponentsProps'

// 处理框架宽度
const procedureWidth = (width: SizeProps | number) => {
  switch (width) {
    case 'small':
      return 480
    case 'default':
      return 600
    case 'medium':
      return 680
    case 'large':
      return 880
    default:
      return width
  }
}

export interface DialogProps extends CommonComponentsProps {
  /** 标题 */
  title?: string
  /** 宽度 */
  width?: SizeProps | number
  /** 打开按钮文字 */
  openText?: React.ReactNode
  /** 确定按钮文字 */
  okText?: React.ReactNode
  /** 取消按钮文字 */
  cancelText?: React.ReactNode
  /** 确定按钮配置项 */
  okButtonProps?: ButtonProps
  /** 取消按钮配置项 */
  cancelButtonProps?: ButtonProps
  /** 打开按钮配置项 */
  openButtonProps?: ButtonProps
  /** 打开之前的操作 */
  onOpen?: () => void
  /** 点击确定之后的操作 hide:Function类型(手动关闭弹框) 返回值: boolean类型(是否自动关闭) */
  onOk?: (hide: () => void) => boolean
  /** 关闭之后的操作 */
  onCancel?: () => void
  /** 关闭之前的操作 */
  afterClose?: () => void
  /** 自定义footer */
  footer?: (close: () => void) => React.ReactNode | React.ReactNode | any
  /** 自定义渲染打开按钮 */
  renderOpenButton?: (int: () => void) => void
}
const Dialog: FC<DialogProps> = ({
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
  openText
}) => {
  const [visible, setVisible] = useState(false)

  // 处理打开按钮
  const procedureOpenButton = () => {
    const type = Object.prototype.toString.call(renderOpenButton)
    if (type === '[object Function]') {
      return (
        renderOpenButton &&
        renderOpenButton(() => {
          onOpen && onOpen()
          setVisible(true)
        })
      )
    } else {
      return (
        <Button
          {...openButtonProps}
          onClick={() => {
            onOpen && onOpen()
            setVisible(true)
          }}
        >
          {openText}
        </Button>
      )
    }
  }

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
            display: okText ? 'inline-block' : 'none',
            ...(okButtonProps?.style || {})
          }
        }}
        onOk={() => {
          const blocker = onOk && onOk(() => setVisible(false)) // 拦截器
          !blocker && setVisible(false)
        }}
        cancelText={cancelText}
        cancelButtonProps={{
          ...cancelButtonProps,
          style: {
            display: cancelText ? 'inline-block' : 'none',
            ...(cancelButtonProps?.style || {})
          }
        }}
        onCancel={() => {
          setVisible(false)
          onCancel && onCancel()
        }}
        afterClose={afterClose}
        {...(() => {
          const type = Object.prototype.toString.call(footer)
          if (type === '[object Undefined]') {
            return {}
          } else if (type === '[object Function]') {
            return {
              footer:
                footer &&
                footer(() => {
                  setVisible(false)
                })
            }
          } else {
            return { footer }
          }
        })()}
      >
        {children}
      </Modal>
    </>
  )
}

// Dialog.Confirm = Confirm;

Dialog.defaultProps = {
  /* ### 按钮属性 ### */
  // visible: null, // 受控 => 开启 visible 为 Boolean 值时，所有 open 都将失效，等效于原 Modal
  openText: '打开',
  openButtonProps: {},
  onOpen: () => {},
  renderOpenButton: undefined, // 渲染元素 => undefined || function -> (open = () => {}) => { return Elemet }
  /* ### 弹窗属性 ### */
  className: '',
  style: {},
  title: '弹窗标题',
  width: 'medium', // 标准弹窗宽度 => small:480 | 【默认】medium:680 | large:880 | integer
  okText: '确定', // 确定按钮文案 => 值为 false 时，不显示
  okButtonProps: {},
  onOk: (hide = () => {}) => false, // 用 return 拦截 visible
  cancelText: '取消', // 取消按钮文案 => 值为 false 时，不显示
  cancelButtonProps: {},
  onCancel: () => {}, // 用 return 拦截 visible
  afterClose: () => {}, // 弹窗完全关闭后的回调
  footer: undefined, // 自定义页脚 => ReactNode || (close) => ReactNode,
  children: undefined
}

export default Dialog
