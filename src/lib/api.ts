import {
  catchError,
  delay,
  from,
  of,
  startWith,
  switchMap,
  throwError,
  retry,
} from "rxjs";
import { fromFetch } from "rxjs/fetch";

export function request<TResult>(url: string) {
  return fromFetch(url).pipe(
    switchMap((response) => {
      if (response.ok) {
        return from(
          response.json().then((data) => createSuccessResponse<TResult>(data))
        ).pipe(delay(randomDelay()));
      } else if (response.status === 500) {
        return throwError(() => new Error("Server Error 500"));
      } else {
        return of(createErrorResponse(`Error ${response.status}`));
      }
    }),
    retry(3),
    catchError((err) => {
      console.error(err);
      return of(createErrorResponse(err.message));
    }),
    startWith(createLoadingResponse())
  );
}

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

function randomDelay() {
  return Math.floor(Math.random() * (3000 - 200 + 1)) + 200;
}
