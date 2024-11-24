import {
  combineLatest,
  concatMap,
  debounceTime,
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
import { Recipe } from "./search/types";
import {
  getIsLastPage,
  getPaginationSkip,
  PAGINATION_LIMIT,
} from "./pagination/model";
import { searchRecipes } from "./search/search.api";

export class RecipesState {
  public readonly currentPage$: Observable<number>;
  public readonly isFirstPage$: Observable<boolean>;
  public readonly isLastPage$: Observable<boolean | undefined>;

  public readonly search$: Observable<string>;

  public readonly recipes$: Observable<Recipe[] | undefined>;
  public readonly loading$: Observable<boolean>;
  public readonly error$: Observable<string | undefined>;
  public readonly numberOfRecipes$: Observable<number | undefined>;

  private readonly previousPage$ = new Subject<void>();
  private readonly nextPage$ = new Subject<void>();

  private readonly setSearch$ = new Subject<string>();

  constructor() {
    this.search$ = this.assembleSearch();
    this.currentPage$ = this.assembleCurrentPage();

    const query$ = this.assembleQuery();
    this.recipes$ = query$.pipe(map((query) => query.data?.recipes));

    this.loading$ = query$.pipe(map((query) => query.loading));
    this.error$ = query$.pipe(map((query) => query.error));
    this.numberOfRecipes$ = query$.pipe(map((query) => query.data?.total));

    this.isFirstPage$ = this.currentPage$.pipe(map((page) => page === 0));
    this.isLastPage$ = this.getIsLastPage();
  }

  public goNextPage() {
    this.nextPage$.next();
  }

  public goPreviousPage() {
    this.previousPage$.next();
  }

  public setSearch(searchValue: string) {
    this.setSearch$.next(searchValue);
  }

  private assembleCurrentPage() {
    const initialPage$ = of(0);
    return merge(
      initialPage$,
      this.search$.pipe(map(() => 0)),
      this.previousPage$.pipe(concatMap(() => this.getPreviousPage())),
      this.nextPage$.pipe(concatMap(() => this.getNextPage()))
    ).pipe(
      distinctUntilChanged(),
      shareReplay({ refCount: true, bufferSize: 1 })
    );
  }

  private getPreviousPage(): Observable<number> {
    return this.currentPage$.pipe(
      take(1),
      map((currentPage) => currentPage - 1)
    );
  }

  private getNextPage(): Observable<number> {
    return this.currentPage$.pipe(
      take(1),
      map((currentPage) => currentPage + 1)
    );
  }

  private getIsLastPage() {
    return combineLatest([this.currentPage$, this.numberOfRecipes$]).pipe(
      map(([currentPage, total]) => {
        if (total === undefined) {
          return undefined;
        }
        return getIsLastPage(currentPage, total, PAGINATION_LIMIT);
      })
    );
  }

  private assembleSearch() {
    const initialSearch$ = of("");

    return merge(initialSearch$, this.setSearch$).pipe(
      distinctUntilChanged(),
      shareReplay({ refCount: true, bufferSize: 1 })
    );
  }

  private assembleQuery() {
    const search$ = this.search$.pipe(
      filter((search) => search.length >= 3 || search.length === 0),
      debounceTime(300),
      distinctUntilChanged()
    );

    const currentPage$ = this.currentPage$.pipe(
      debounceTime(300),
      distinctUntilChanged()
    );

    const query$ = combineLatest([search$, currentPage$]).pipe(
      debounceTime(0),
      switchMap(([searchValue, currentPage]) => {
        const skip = getPaginationSkip(currentPage, PAGINATION_LIMIT);
        return searchRecipes(searchValue, PAGINATION_LIMIT, skip);
      }),
      shareReplay({ refCount: true, bufferSize: 1 })
    );

    return query$;
  }
}
