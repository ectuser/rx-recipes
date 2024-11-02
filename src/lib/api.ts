export function request<TResult>(url: string) {}

export type SuccessResponse<TResult> = {
  data: TResult;
  loading: false;
  error: undefined;
};

export type ErrorResponse = {
  data: undefined;
  loading: false;
  error: string;
};

export type LoadingResponse = {
  data: undefined;
  loading: true;
  error: undefined;
};
