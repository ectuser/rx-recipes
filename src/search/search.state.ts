import {
  combineLatest,
  debounceTime,
  filter,
  map,
  merge,
  mergeAll,
  Observable,
  of,
  ReplaySubject,
  shareReplay,
  startWith,
  switchMap,
} from "rxjs";
import { searchRecipes } from "./search.api";
import { Recipe } from "./types";
import { getPaginationSkip, PAGINATION_LIMIT } from "../pagination/model";

export class SearchState {
  public readonly searchItems$: Observable<Recipe[] | undefined>;
  public readonly loading$: Observable<boolean>;
  public readonly error$: Observable<string | undefined>;
  public readonly numberOfItems$: Observable<number | undefined>;

  private static instance: SearchState;

  public readonly searchValue$: ReplaySubject<string>;
  private readonly currentPage$: ReplaySubject<number>;

  private constructor() {
    this.searchValue$ = new ReplaySubject<string>(1);

    const value$ = merge(this.searchValue$, of("")).pipe(
      filter((val) => val.length >= 3 || val.length === 0),
      debounceTime(300)
    );

    this.currentPage$ = new ReplaySubject<number>(1);

    const query$ = combineLatest([value$, this.currentPage$]).pipe(
      debounceTime(0),
      switchMap(([searchValue, currentPage]) => {
        const skip = getPaginationSkip(currentPage, PAGINATION_LIMIT);
        return searchRecipes(searchValue, PAGINATION_LIMIT, skip);
      }),
      shareReplay({ refCount: true, bufferSize: 1 })
    );

    this.searchItems$ = query$.pipe(map((query) => query.data?.recipes));
    this.loading$ = query$.pipe(map((query) => query.loading));
    this.error$ = query$.pipe(map((query) => query.error));

    this.numberOfItems$ = query$.pipe(map((query) => query.data?.total));
  }

  public static getInstance(): SearchState {
    if (!SearchState.instance) {
      SearchState.instance = new SearchState();
    }
    return SearchState.instance;
  }

  public setSearchValue(value: string) {
    this.searchValue$.next(value);
  }

  public setCurrentPage(page: number) {
    this.currentPage$.next(page);
  }
}
