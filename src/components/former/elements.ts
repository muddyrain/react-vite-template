import UploaderImage, { UploaderImageProps } from "../uploader/UploaderImage";
import UploaderFile, { UploaderFileProps } from "../uploader/UploaderFile";
import SelectSearch, { SelectSearchProps } from "../selectSearch";
import {
  Select,
  Input,
  Radio,
  Switch,
  SwitchProps,
  Checkbox,
  DatePicker,
  Cascader,
  TimePicker,
  TreeSelect,
  InputProps,
  SelectProps,
  TimePickerProps,
  DatePickerProps,
  CheckboxProps,
  CascaderProps,
  RadioProps,
  TreeSelectProps,
  RadioGroupProps,
  UploadProps,
} from "antd";

import { PasswordProps, TextAreaProps } from "antd/es/input";
import { MonthPickerProps, RangePickerProps } from "antd/es/date-picker";
import { CheckboxGroupProps } from "antd/es/checkbox";

const { Password, TextArea } = Input;
const { MonthPicker, RangePicker } = DatePicker;
const RadioGroup = Radio.Group;
const CheckboxGroup = Checkbox.Group;

// 组件注册
const elements = {
  SelectSearch,
  Input,
  Password,
  TextArea,
  Select,
  Switch,
  DatePicker,
  TimePicker,
  MonthPicker,
  RangePicker,
  Checkbox,
  UploaderImage,
  UploaderFile,
  CheckboxGroup,
  Cascader,
  Radio,
  TreeSelect,
  RadioGroup,
};
export default elements;

export type elementsProps = {
  Input: InputProps;
  Upload: UploadProps;
  Password: PasswordProps;
  TextArea: TextAreaProps;
  Select: SelectProps;
  UploaderImage: UploaderImageProps;
  UploaderFile: UploaderFileProps;
  Switch: SwitchProps;
  TimePicker: TimePickerProps;
  DatePicker: DatePickerProps;
  MonthPicker: MonthPickerProps;
  RangePicker: RangePickerProps;
  Checkbox: CheckboxProps;
  CheckboxGroup: CheckboxGroupProps;
  Cascader: CascaderProps<any>;
  Radio: RadioProps;
  TreeSelect: TreeSelectProps;
  RadioGroup: RadioGroupProps;
  SelectSearch: SelectSearchProps;
};
