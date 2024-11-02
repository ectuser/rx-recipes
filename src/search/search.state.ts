import {
  BehaviorSubject,
  debounceTime,
  filter,
  map,
  Observable,
  shareReplay,
  switchMap,
} from "rxjs";
import { searchRecipes } from "./api";
import { Recipe } from "./types";

export class SearchState {
  public readonly searchItems$: Observable<Recipe[] | undefined>;
  public readonly loading$: Observable<boolean>;
  public readonly error$: Observable<string | undefined>;
  public readonly numberOfItems$: Observable<number | undefined>;

  private readonly searchValue$: BehaviorSubject<string>;

  constructor() {
    this.searchValue$ = new BehaviorSubject("");

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

  public setSearch(searchValue: string) {
    this.searchValue$.next(searchValue);
  }
}
