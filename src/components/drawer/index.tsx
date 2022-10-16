import { FC, useState } from "react";
import { Drawer, Button, ButtonProps } from "antd";
import { Align } from "@bees/ui";
import styles from "./index.module.less";
import { CommonComponentsProps } from "@/interface/commonComponentsProps";
import { DirectionProps, SizeProps } from "@/interface/baseProps";
interface DrawerProps extends CommonComponentsProps {
  title?: string;
  openText?: React.ReactNode;
  cancelText?: React.ReactNode;
  okText?: React.ReactNode;
  openProps?: ButtonProps;
  cancelProps?: ButtonProps;
  okProps?: ButtonProps;
  width?: SizeProps | number;
  height?: number;
  zIndex?: number;
  closable?: boolean;
  maskClosable?: boolean;
  mask?: boolean;
  keyboard?: boolean;
  destroyOnClose?: boolean;
  maskStyle?: React.CSSProperties | undefined;
  drawerStyle?: React.CSSProperties | undefined;
  headerStyle?: React.CSSProperties | undefined;
  bodyStyle?: React.CSSProperties | undefined;
  placement?: DirectionProps;
  onOpen?: () => void;
  onClose?: () => void;
  onOk?: (hide: () => void) => boolean;
  afterVisibleChange?: (visible: boolean) => void;
  afterClose?: () => void;
  beforeOpen?: () => void;
  footerRender?: (close: () => void) => React.ReactNode | React.ReactNode | any;
  renderOpenButton?: (
    close: () => void
  ) => React.ReactNode | React.ReactNode | any;
}
const Fragment: FC<DrawerProps> = ({
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
      <Drawer
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
      </Drawer>
    </>
  );
};

Fragment.defaultProps = {
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

export default Fragment;
