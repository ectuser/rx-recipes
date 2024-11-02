import { catchError, delay, of, startWith, switchMap } from "rxjs";
import { fromFetch } from "rxjs/fetch";
import { fromPromise } from "rxjs/internal/observable/innerFrom";

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

export function request<TResult>(url: string) {
  return fromFetch(url).pipe(
    switchMap((response) => {
      if (response.ok) {
        return fromPromise(
          response.json().then(
            (data) =>
              ({
                data,
                loading: false,
                error: undefined,
              } as SuccessResponse<TResult>)
          )
        ).pipe(delay(2000));
      } else {
        return of({
          data: undefined,
          loading: false,
          error: `Error ${response.status}`,
        } as ErrorResponse);
      }
    }),
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
