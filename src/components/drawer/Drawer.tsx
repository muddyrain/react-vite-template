import { FC, useState } from "react";
import { Drawer as AntDrawer, Button, ButtonProps } from "antd";
import { Align } from "@bees/ui";
import styles from "./index.module.less";
import { CommonComponentsProps } from "@/interface/commonComponentsProps";
import { DirectionProps, SizeProps } from "@/interface/baseProps";
export interface DrawerProps extends CommonComponentsProps {
  /** 标题 */
  title?: string;
  /** 宽度 */
  width?: SizeProps | number;
  /** 高度 */
  height?: number;
  /** 设置 Drawer 的 z-index */
  zIndex?: number;
  /** 是否显示左上角的关闭按钮 */
  closable?: boolean;
  /** 点击蒙层是否允许关闭 */
  maskClosable?: boolean;
  /** 是否显示遮罩 */
  mask?: boolean;
  /** 是否支持键盘 esc 关闭 */
  keyboard?: boolean;
  /** 关闭时销毁 Drawer 里的子元素 */
  destroyOnClose?: boolean;
  /** 打开按钮文字 */
  openText?: React.ReactNode;
  /** 取消按钮文字 */
  cancelText?: React.ReactNode;
  /** 确定按钮文字 */
  okText?: React.ReactNode;
  /** 打开按钮配置项 */
  openProps?: ButtonProps;
  /** 取消按钮配置项 */
  cancelProps?: ButtonProps;
  /** 确定按钮配置项 */
  okProps?: ButtonProps;
  /** 遮罩样式 */
  maskStyle?: React.CSSProperties | undefined;
  /** 用于设置 Drawer 弹出层的样式 */
  drawerStyle?: React.CSSProperties | undefined;
  /** 用于设置 Drawer 头部的样式 */
  headerStyle?: React.CSSProperties | undefined;
  /** 可用于设置 Drawer 内容部分的样式 */
  bodyStyle?: React.CSSProperties | undefined;
  /** 抽屉的方向 */
  placement?: DirectionProps;
  /** 打开之前做的操作 */
  onOpen?: () => void;
  /** 关闭之后的操作 */
  onClose?: () => void;
  /** 点击确定之后的操作 hide:Function类型(手动关闭弹框) 返回值: boolean类型(是否自动关闭) */
  onOk?: (hide: () => void) => boolean;
  /** 关闭之后显示的调整操作  */
  afterVisibleChange?: (visible: boolean) => void;
  /** 关闭之前的操作 */
  afterClose?: () => void;
  /** 打开之前的操作 */
  beforeOpen?: () => void;
  /** 自定义footer渲染 */
  footerRender?: (close: () => void) => React.ReactNode | React.ReactNode | any;
  /** 自定义渲染打开按钮 */
  renderOpenButton?: (
    close: () => void
  ) => React.ReactNode | React.ReactNode | any;
}
const Drawer: FC<DrawerProps> = ({
  openText,
  openProps,
  title,
  width,
  closable,
  maskClosable,
  children,
  mask,
  maskStyle,
  style,
  drawerStyle,
  headerStyle,
  bodyStyle,
  height,
  className,
  zIndex,
  placement,
  onOpen,
  onClose,
  afterVisibleChange,
  afterClose,
  beforeOpen,
  keyboard,
  onOk,
  cancelText,
  cancelProps,
  okText,
  okProps,
  footerRender,
  destroyOnClose,
  renderOpenButton,
}) => {
  const [visible, setVisible] = useState(false);

  // 处理打开按钮
  const procedureOpenButton = () => {
    const type = Object.prototype.toString.call(renderOpenButton);
    if (type === "[object Function]") {
      return renderOpenButton!(() => {
        setVisible(true);
        onOpen!();
      });
    } else {
      return (
        <Button
          {...openProps}
          onClick={() => {
            setVisible(true);
            onOpen!();
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
      <AntDrawer
        visible={visible}
        title={title}
        destroyOnClose={destroyOnClose}
        closable={closable}
        maskClosable={maskClosable}
        mask={mask}
        maskStyle={maskStyle}
        style={style}
        drawerStyle={drawerStyle}
        headerStyle={headerStyle}
        bodyStyle={bodyStyle}
        height={height}
        className={className}
        zIndex={zIndex}
        placement={placement}
        afterVisibleChange={(visible) => {
          afterVisibleChange!(visible);
          if (visible) {
            beforeOpen!();
          } else {
            afterClose!();
          }
        }}
        keyboard={keyboard}
        width={(() => {
          switch (width) {
            case "default":
              return 680;
            case "medium":
              return 680;
            case "small":
              return 480;
            case "large":
              return 880;
            default:
              return width;
          }
        })()}
        onClose={() => {
          setVisible(false);
          onClose!();
        }}
      >
        {children}
        {(cancelText || okText || footerRender) && (
          <Align className={styles.footer} align="rm">
            {footerRender &&
              footerRender(() => {
                setVisible(false);
              })}
            {!footerRender && cancelText && (
              <Button
                {...cancelProps}
                onClick={() => {
                  // Modal.confirm({
                  //   title: '关闭弹窗',
                  //   content: '数据未保存,确认关闭弹窗吗?',
                  //   centered: true,
                  //   onOk() {
                  //     setVisible(false);
                  //     onClose();
                  //   },
                  // });
                  setVisible(false);
                  onClose!();
                }}
              >
                {cancelText}
              </Button>
            )}
            {!footerRender && okText && (
              <Button
                {...okProps}
                onClick={() => {
                  const result = onOk!(() => {
                    setVisible(false);
                  });
                  !result && setVisible(false);
                }}
              >
                {okText}
              </Button>
            )}
          </Align>
        )}
        {(cancelText || okText || footerRender) && (
          <div className={styles.block} />
        )}
      </AntDrawer>
    </>
  );
};

Drawer.defaultProps = {
  renderOpenButton: undefined,
  openText: "打开",
  openProps: {},
  title: "标题",
  width: "default", // default(680) | small(480) | large(880) | Number([0-9]*)
  closable: true,
  maskClosable: true,
  mask: true,
  maskStyle: {},
  style: {},
  drawerStyle: {},
  headerStyle: {},
  bodyStyle: {},
  height: 256,
  className: "",
  zIndex: 1000,
  placement: "right",
  onOpen: () => {},
  cancelText: "取消", // null(不显示)
  cancelProps: {},
  onClose: () => {},
  okText: "确定", // null(不显示)
  okProps: { type: "primary" },
  onOk: (close) => false,
  afterVisibleChange: (visible) => {},
  afterClose: () => {}, // 关闭之后
  beforeOpen: () => {}, // 打开之前
  keyboard: true,
  footerRender: undefined, // (close) => Element, // null
};

export default Drawer;
