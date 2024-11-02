import {
  debounceTime,
  filter,
  map,
  mergeAll,
  Observable,
  ReplaySubject,
  shareReplay,
  startWith,
  switchMap,
} from "rxjs";
import { searchRecipes } from "./api";
import { Recipe } from "./types";

export class SearchState {
  public readonly searchItems$: Observable<Recipe[] | undefined>;
  public readonly loading$: Observable<boolean>;
  public readonly error$: Observable<string | undefined>;
  public readonly numberOfItems$: Observable<number | undefined>;

  public readonly searchValue$: Observable<string>;
  private readonly sources$: ReplaySubject<Observable<string>>;

  constructor() {
    this.sources$ = new ReplaySubject<Observable<string>>(Infinity);
    this.searchValue$ = this.sources$.pipe(mergeAll(), startWith(""));

    const value$ = this.searchValue$.pipe(
      filter((val) => val.length >= 3 || val.length === 0),
      debounceTime(300)
    );

    const query$ = value$.pipe(
      switchMap((searchValue) => searchRecipes(searchValue)),
      shareReplay({ refCount: true, bufferSize: 1 })
    );

    this.searchItems$ = query$.pipe(map((query) => query.data?.recipes));
    this.loading$ = query$.pipe(map((query) => query.loading));
    this.error$ = query$.pipe(map((query) => query.error));

    this.numberOfItems$ = this.searchItems$.pipe(map((items) => items?.length));
  }

  public connectSource(source$: Observable<string>) {
    this.sources$.next(source$);
  }
}
