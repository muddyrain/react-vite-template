import { FC } from "react";
import Drawer, { DrawerProps } from "./Drawer";
export type TypeComponent = FC<DrawerProps> & {};
const TranComponent = Drawer as TypeComponent;
export default TranComponent;
