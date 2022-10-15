import React, { useState } from 'react';
import { Drawer, Button } from 'antd';
import { Align } from '@bees/ui';
import styles from './index.module.less';

const Fragment = ({
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
    if (type === '[object Function]') {
      return renderOpenButton(() => {
        setVisible(true);
        onOpen();
      });
    } else {
      return (
        <Button
          {...openProps}
          onClick={() => {
            setVisible(true);
            onOpen();
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
          afterVisibleChange(visible);
          if (visible) {
            beforeOpen();
          } else {
            afterClose();
          }
        }}
        keyboard={keyboard}
        width={(() => {
          switch (width) {
            case 'default':
              return 680;
            case 'small':
              return 480;
            case 'large':
              return 880;
            default:
              return width;
          }
        })()}
        onClose={() => {
          setVisible(false);
          onClose();
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
                  onClose();
                }}
              >
                {cancelText}
              </Button>
            )}
            {!footerRender && okText && (
              <Button
                {...okProps}
                onClick={() => {
                  const result = onOk(() => {
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
  renderOpenButton: null,
  openText: '打开',
  openProps: {},
  title: '标题',
  width: 'default', // default(680) | small(480) | large(880) | Number([0-9]*)
  closable: true,
  maskClosable: true,
  mask: true,
  maskStyle: {},
  style: {},
  drawerStyle: {},
  headerStyle: {},
  bodyStyle: {},
  height: 256,
  className: '',
  zIndex: 1000,
  placement: 'right',
  onOpen: () => {},
  cancelText: '取消', // null(不显示)
  cancelProps: {},
  onClose: () => {},
  okText: '确定', // null(不显示)
  okProps: { type: 'primary' },
  onOk: (close) => {},
  afterVisibleChange: (visible) => {},
  afterClose: () => {}, // 关闭之后
  beforeOpen: () => {}, // 打开之前
  keyboard: true,
  footerRender: null, // (close) => Element, // null
};

export default Fragment;
