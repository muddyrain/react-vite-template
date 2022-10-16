import {
  Select,
  Input,
  Radio,
  Checkbox,
  DatePicker,
  Cascader,
  TreeSelect,
  InputProps,
  SelectProps,
  DatePickerProps,
  CheckboxProps,
  CascaderProps,
  RadioProps,
  TreeSelectProps,
  RadioGroupProps,
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
  DatePicker,
  MonthPicker,
  RangePicker,
  Checkbox,
  CheckboxGroup,
  Cascader,
  Radio,
  TreeSelect,
  RadioGroup,
};
export default elements;

export type elementsProps = {
  Input: InputProps;
  Password: PasswordProps;
  TextArea: TextAreaProps;
  Select: SelectProps;
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
