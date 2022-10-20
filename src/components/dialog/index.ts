import { FC } from "react";
import Dialog, { DialogProps } from "./Dialog";
export type TypeComponent = FC<DialogProps> & {};
const TranComponent = Dialog as TypeComponent;
export default TranComponent;
