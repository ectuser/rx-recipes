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
          response.json().then(
            (data) =>
              ({
                data,
                loading: false,
                error: undefined,
              } as SuccessResponse<TResult>)
          )
        ).pipe(delay(2000));
      } else if (response.status === 500) {
        return throwError(() => new Error("Server Error 500"));
      } else {
        return of({
          data: undefined,
          loading: false,
          error: `Error ${response.status}`,
        } as ErrorResponse);
      }
    }),
    retry(3),
    catchError((err) => {
      console.error(err);
      return of({
        data: undefined,
        loading: false,
        error: err.message,
      } as ErrorResponse);
    }),
    startWith({
      data: undefined,
      loading: true,
      error: undefined,
    } as LoadingResponse)
  );
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
