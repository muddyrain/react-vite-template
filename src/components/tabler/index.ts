import { FC } from "react";
import Tabler, { TablerProps } from "./Tabler";
export type TypeComponent = FC<TablerProps> & {};
const TranComponent = Tabler as TypeComponent;
export default TranComponent;
