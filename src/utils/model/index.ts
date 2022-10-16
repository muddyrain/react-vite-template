export type ModalReducer<T> = (state: T, payload: T) => T;
export interface defaultValueProps {
  updater?: Date;
  loading?: boolean;
  processing?: boolean;
  datalist?: any[];
  page?: number;
  pageSize?: number;
  total?: number;
}
export const defaultValue: defaultValueProps = {
  updater: new Date(),
  loading: false,
  processing: false,
  page: 1,
  pageSize: 10,
};
export function InitReducer<T>(state: T, payload: T) {
  return {
    ...state,
    ...payload,
  };
}
