import React from "react";
import utils from "../../utils";
import utilsTest from "../../utils/test";
import {
  Button,
  Space,
  Divider,
  Popconfirm,
  Tooltip,
  PopconfirmProps,
  TableColumnType,
  PaginationProps,
} from "antd";
import styles from "./index.module.less";
import { RecordType, TablerActionsProps } from "./Tabler";

// 是否隐藏
const procedureColumnVisible = (item: TablerActionsProps) => {
  const type = Object.prototype.toString.call(item?.visible);
  if (
    type === "[object Function]" &&
    (item.visible as Function)(item) === false
  ) {
    return false;
  } else if (type === "[object Boolean]" && item.visible === false) {
    return false;
  } else {
    return true;
  }
};

// 渲染单元格
const renderCell = (
  ellipsis: boolean = false,
  value: any = "",
  index: number | string = ""
) => {
  const type = Object.prototype.toString.call(ellipsis);
  if (type === "[object Boolean]" && ellipsis) {
    return (
      <Tooltip
        key={`tooltip_${index}`}
        title={<div style={{ fontSize: 12 }}>{value}</div>}
      >
        <div
          style={{
            display: "block",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {value}
        </div>
      </Tooltip>
    );
  } else {
    return value;
  }
};

// 处理属性列
const procedureColumns = ({
  fixed,
  ordered,
  columns = [],
  pagination,
}: {
  fixed?: boolean;
  ordered?: boolean;
  columns?: TableColumnType<RecordType>[];
  pagination?: PaginationProps;
}) => {
  return [
    ...(ordered
      ? [
          {
            ...(fixed ? { fixed: "left" } : {}),
            align: "center",
            width: 68,
            title: "序号",
            dataIndex: "index",
            valueType: "indexBorder",
            render: (value, record, index) =>
              index +
              1 +
              ((pagination?.current || 1) - 1) * (pagination?.pageSize || 10),
          },
        ]
      : []),
    ...columns
      .map((item: any) => {
        if (procedureColumnVisible(item)) {
          return {
            align: "center",
            ...(() => {
              if (item?.format) {
                return {
                  render: (obj, record, index) => {
                    const value =
                      record?.[item?.dataIndex] ??
                      obj?.props?.children ??
                      obj?.props?.title ??
                      obj; // 精准取到组件对象内部值
                    if (item.format === "time") {
                      return renderCell(
                        item?.ellipsis,
                        utilsTest.FormatTime(value),
                        index
                      );
                    } else if (
                      /(YYYY)|(MM)|(DD)|(HH)|(mm)|(ss)/.test(item.format)
                    ) {
                      return renderCell(
                        item?.ellipsis,
                        utilsTest.FormatTime(value, item.format),
                        index
                      );
                    } else if (Array.isArray(item.format)) {
                      const [list, key] = item.format;
                      return renderCell(
                        item?.ellipsis,
                        utils.FieldMapping(list, key || value)?.label ?? "-",
                        index
                      );
                    } else {
                      return renderCell(item?.ellipsis, value ?? "-", index);
                    }
                  },
                };
              } else {
                return {
                  render: (value, record, index) =>
                    renderCell(item?.ellipsis, value ?? "-", index),
                };
              }
            })(),
            ...item,
          };
        } else {
          return null;
        }
      })
      .filter((e) => e),
  ];
};

// 是否显示
const procedureActionVisible = (
  item: TablerActionsProps,
  record: RecordType,
  index: number
) => {
  const type = Object.prototype.toString.call(item.visible);
  switch (type) {
    case "[object Function]":
      return (item.visible as Function)(record, index);
    case "[object Boolean]":
      return item.visible;
    default:
      return true;
  }
};

// 等待状态
const procedureLoading = (
  item: TablerActionsProps,
  record: RecordType,
  index: number
) => {
  const type = Object.prototype.toString.call(item.loading);
  switch (type) {
    case "[object Function]":
      return (item.loading as Function)(record, index);
    case "[object Boolean]":
      return item.loading;
    default:
      return false;
  }
};

// 二次确认
const procedureConfirm = (
  ele: React.ReactNode,
  item: TablerActionsProps,
  record: RecordType,
  index: number
) => {
  const type = Object.prototype.toString.call(item.confirm);
  const popconfirmProps: Omit<PopconfirmProps, "title"> = {
    placement: "topRight",
    ...disabledStatus(item, record, index),
    onConfirm: () => {
      const clickType = Object.prototype.toString.call(item.onClick);
      clickType === "[object Function]" &&
        item.onClick &&
        item.onClick(record, index);
    },
  };
  switch (type) {
    case "[object String]":
      return (
        <Popconfirm
          key={`popconfirm_${index}`}
          title={(item.confirm as string) || "确定执行该操作？"}
          {...popconfirmProps}
        >
          {ele}
        </Popconfirm>
      );
    case "[object Function]":
      return (
        <Popconfirm
          key={`popconfirm_${index}`}
          title={() =>
            (item.confirm as Function)(record, index) || "确定执行该操作？"
          }
          {...popconfirmProps}
        >
          <> {ele}</>
        </Popconfirm>
      );
    default:
      return <section key={`ele_${item?.key || index}`}>{ele}</section>;
  }
};

// 禁用状态
const disabledStatus = (
  item: TablerActionsProps,
  record: RecordType,
  index: number
) => {
  const type = Object.prototype.toString.call(item.disabled);
  switch (type) {
    case "[object Function]":
      return {
        disabled: item.disabled && (item.disabled as Function)(record, index),
      };
    case "[object Boolean]":
      return { disabled: item.disabled };
    default:
      return {};
  }
};

// 创建按钮
const createButton = (
  cxt: React.ReactNode,
  item: TablerActionsProps,
  record: RecordType,
  index: number
) => (
  <Button
    key={`button_${index}`}
    type="link"
    loading={procedureLoading(item, record, index)}
    {...disabledStatus(item, record, index)}
    {...(item?.props || {})}
    onClick={() => {
      const type = Object.prototype.toString.call(item.onClick);
      !item.confirm &&
        type === "[object Function]" &&
        item.onClick &&
        item.onClick(record, index);
    }}
  >
    {cxt}
  </Button>
);

// 处理操作列
const procedureActions = ({
  fixed,
  actionsWidth,
  actions,
  actionsProps,
}: {
  fixed?: boolean;
  actionsWidth?: string | number | undefined;
  actions?: TablerActionsProps[];
  actionsProps?: TableColumnType<object>;
}): (TableColumnType<object> & { valueType: string })[] => {
  if (Array.isArray(actions)) {
    return [
      {
        ...(fixed ? { fixed: "right" } : {}),
        align: "center",
        title: "操作",
        width: actionsWidth,
        key: "option",
        valueType: "option",
        render: (value, record, index) => (
          <Space
            key={`space_${index}`}
            className={styles.actions}
            split={<Divider className={styles.divider} type="vertical" />}
          >
            {actions.map((item) =>
              (() => {
                const isVisible = procedureActionVisible(item, record, index);
                const contentType = Object.prototype.toString.call(
                  item.content
                );

                if (contentType === "[object Function]") {
                  const ele = (item.content as Function)(record, index);
                  const eleType = Object.prototype.toString.call(ele);
                  const element =
                    eleType === "[object String]" ? (
                      createButton(ele, item, record, index)
                    ) : (
                      <section key={`ele_${index}`}>{ele}</section>
                    );
                  return (
                    isVisible && procedureConfirm(element, item, record, index)
                  );
                } else {
                  const element = createButton(
                    item.content as React.ReactNode,
                    item,
                    record,
                    index
                  );
                  return (
                    isVisible && procedureConfirm(element, item, record, index)
                  );
                }
              })()
            )}
          </Space>
        ),
        ...actionsProps,
      },
    ];
  } else {
    return [];
  }
};

// 处理固定列
const procedureFixed = ({
  fixed,
  columns,
}: {
  fixed?: boolean;
  columns?: TableColumnType<Object>[];
}) => {
  let total = 0;

  // 计算内容需要宽度 [Begin]
  const recursion = (list: TableColumnType<Object>[] = []) => {
    list.forEach((item: any) => {
      total = total + (Number(item?.width) || 0);
      item?.children && recursion(item.children);
    });
  };
  // 计算内容需要宽度 [End]

  recursion(columns);

  return fixed ? { scroll: { x: total } } : {};
};

export default {
  procedureColumns,
  procedureActions,
  procedureFixed,
};
