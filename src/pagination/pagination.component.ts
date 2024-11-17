import {
  combineLatest,
  distinctUntilChanged,
  filter,
  map,
  merge,
  Observable,
  of,
  shareReplay,
  Subject,
  switchMap,
  take,
} from "rxjs";
import { SearchState } from "../search/search.state";
import { getIsLastPage, PAGINATION_LIMIT } from "./model";

export class PaginationComponent {
  public readonly currentPage$: Observable<number>;
  public readonly previousPage$: Subject<void>;
  public readonly nextPage$: Subject<void>;

  private readonly previousPageDisabled$: Observable<boolean>;
  private readonly nextPageDisabled$: Observable<boolean>;

  constructor(private view: IPaginationView, private searchState: SearchState) {
    this.previousPage$ = new Subject();
    this.nextPage$ = new Subject();
    const initialPage$ = of(0);
    this.currentPage$ = merge(
      initialPage$,
      this.searchState.searchValue$.pipe(map(() => 0)),
      this.previousPage$.pipe(switchMap(() => this.getCurrentPagePrevious())),
      this.nextPage$.pipe(switchMap(() => this.getCurrentPageNext()))
    ).pipe(
      distinctUntilChanged(),
      shareReplay({ refCount: true, bufferSize: 1 })
    );

    this.previousPageDisabled$ = this.currentPage$.pipe(
      map((currentPage) => currentPage === 0)
    );
    this.nextPageDisabled$ = combineLatest([
      this.currentPage$,
      this.searchState.numberOfItems$.pipe(
        filter((numberOfItems) => numberOfItems !== undefined)
      ),
    ]).pipe(
      map(([currentPage, total]) =>
        getIsLastPage(currentPage, total, PAGINATION_LIMIT)
      )
    );

    this.previousPageDisabled$.subscribe((isDisabled) => {
      this.view.togglePreviousPageButtonDisable(isDisabled);
    });

    this.nextPageDisabled$.subscribe((isDisabled) => {
      this.view.toggleNextPageButtonDisable(isDisabled);
    });

    this.currentPage$.subscribe((value) => {
      this.view.updateCurrentPage(value);
    });

    this.currentPage$.subscribe((page) => {
      this.searchState.setCurrentPage(page);
    });
  }

  public handleNextPage() {
    this.nextPage$.next();
  }

  public handlePreviousPage() {
    this.previousPage$.next();
  }

  private getCurrentPagePrevious() {
    return this.currentPage$.pipe(
      take(1),
      map((currentPage) => currentPage - 1)
    );
  }

  private getCurrentPageNext() {
    return this.currentPage$.pipe(
      take(1),
      map((currentPage) => currentPage + 1)
    );
  }
}

export interface IPaginationView {
  updateCurrentPage(value: number): void;
  togglePreviousPageButtonDisable(isDisabled: boolean): void;
  toggleNextPageButtonDisable(isDisabled: boolean): void;
}
