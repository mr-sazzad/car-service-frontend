export interface IMeta {
  total: number;
  page: number;
  size: number;
}

export interface IResponse {
  data: any;
  meta?: IMeta;
}

export interface IErrorResponse {
  statusCode?: number;
  message?: string;
  errorMessages?: IErrorMessages[];
}

export interface IErrorMessages {
  path: string;
  message?: string;
}

export type IService = {
  id?: string;
  title: string;
  price: string;
  description: string;
  image: string;
  reviews?: string[];
};

export type IUpdateCart = {
  id: string;
  status: string;
  confirmedDate: string | null;
};
