import { RoutesProps } from "@/layouts/config";
import { MenuItemType } from "antd/lib/menu/hooks/useItems";

const recursionList = (list: RoutesProps[]) => {
  return list.map((item: RoutesProps) => {
    if (!item.hideMenu) {
      return {
        label: item.name,
        key: item.path,
        children: item.children ? recursionList(item.children || []) : null,
      };
    }
  });
};
// routes 转换为 menuItems
export const TransfromRoutesToMenusItems = (
  list: RoutesProps[]
): MenuItemType[] => {
  const newList = JSON.parse(JSON.stringify(list));
  return recursionList(newList);
};
