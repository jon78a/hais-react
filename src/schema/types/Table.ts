export type TablePagination<T> = {
  cursor?: T;
  page: number;
  size: number;
  totalElements?: number;
  isPrev?: boolean;
};
