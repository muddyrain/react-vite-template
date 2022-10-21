import UploaderImage, { UploaderImageProps } from "../uploader/UploaderImage";
import UploaderFile, { UploaderFileProps } from "../uploader/UploaderFile";
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
import { CheckboxGroupProps } from "antd/lib/checkbox";
import { MonthPickerProps, RangePickerProps } from "antd/lib/date-picker";
import { PasswordProps, TextAreaProps } from "antd/lib/input";

const { Password, TextArea } = Input;
const { MonthPicker, RangePicker } = DatePicker;
const RadioGroup = Radio.Group;
const CheckboxGroup = Checkbox.Group;

// 组件注册
const elements = {
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
};
