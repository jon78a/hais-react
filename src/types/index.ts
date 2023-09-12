export type YN = "Y" | "N";

export type PaginationOption = {
  limit: number;
  offset: number;
}

export type DataStateType<T> = {
  data: T,
  loading: boolean,
  error?: ErrorDetail | null | undefined
}

export type InfoType = {
  name: string;
  message: string;
}

export type ExceptionDetail = InfoType;
export type ErrorDetail = InfoType;
