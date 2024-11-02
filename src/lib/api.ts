export function request<TResult>(url: string) {}

function createSuccessResponse<TResult>(
  data: TResult
): SuccessResponse<TResult> {
  return {
    data,
    loading: false,
    error: undefined,
  };
}

function createErrorResponse(error: string): ErrorResponse {
  return {
    data: undefined,
    loading: false,
    error,
  };
}

function createLoadingResponse(): LoadingResponse {
  return {
    data: undefined,
    loading: true,
    error: undefined,
  };
}

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
