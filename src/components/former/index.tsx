import { FC } from "react";
import Fromer, { FormerProps, RecordType } from "./former";
import { Form, FormInstance } from "antd";
export type FormerComponent = FC<FormerProps> & {
  useForm: () => [FormInstance<RecordType>];
};
const TranFormer = Fromer as FormerComponent;
TranFormer.useForm = Form.useForm;
export default TranFormer;
