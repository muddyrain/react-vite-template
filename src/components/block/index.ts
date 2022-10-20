import { FC } from "react";
import Block, { BlockProps } from "./Block";
export type TypeComponent = FC<BlockProps> & {};
const TranComponent = Block as TypeComponent;
export default TranComponent;
