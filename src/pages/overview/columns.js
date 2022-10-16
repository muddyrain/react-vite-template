import { SEX } from '@/constant';

export default [
  {
    title: '姓名',
    dataIndex: 'name',
  },
  {
    title: '性别',
    dataIndex: 'sex',
    format: [SEX],
  },
  {
    title: '年龄',
    dataIndex: 'age',
  },
];
