// import {
//   combineLatest,
//   debounceTime,
//   filter,
//   map,
//   merge,
//   Observable,
//   of,
//   shareReplay,
//   skip,
//   Subject,
//   switchMap,
//   take,
// } from "rxjs";
// import { searchRecipes } from "./search.api";
// import { Recipe } from "./types";
// import { getPaginationSkip, PAGINATION_LIMIT } from "../pagination/model";

// export class SearchState {
//   public readonly searchItems$: Observable<Recipe[] | undefined>;
//   public readonly loading$: Observable<boolean>;
//   public readonly error$: Observable<string | undefined>;
//   public readonly numberOfItems$: Observable<number | undefined>;

//   private readonly searchValue$: Subject<string>;
//   private readonly currentPage$: Subject<number>;

//   private static instance: SearchState;
//   private constructor() {
//     this.searchValue$ = new Subject<string>();
//     this.currentPage$ = new Subject<number>();

//     const query$ = this.assembleQuery();

//     this.searchItems$ = query$.pipe(map((query) => query.data?.recipes));
//     this.loading$ = query$.pipe(map((query) => query.loading));
//     this.error$ = query$.pipe(map((query) => query.error));

//     this.numberOfItems$ = query$.pipe(map((query) => query.data?.total));
//   }

//   public static getInstance(): SearchState {
//     if (!SearchState.instance) {
//       SearchState.instance = new SearchState();
//     }
//     return SearchState.instance;
//   }

//   public setSearchValue(value: string) {
//     this.searchValue$.next(value);
//   }

//   public setCurrentPage(page: number) {
//     this.currentPage$.next(page);
//   }

//   private assembleQuery() {
//     const initialSearchValue$ = of("");
//     const searchValue$ = merge(
//       this.searchValue$.pipe(debounceTime(300)),
//       initialSearchValue$
//     ).pipe(filter((val) => val.length >= 3 || val.length === 0));

//     const initialPage$ = this.currentPage$.pipe(take(1));
//     const otherPage$ = this.currentPage$.pipe(skip(1), debounceTime(300));
//     const page$ = merge(initialPage$, otherPage$);

//     const query$ = combineLatest([searchValue$, page$]).pipe(
//       debounceTime(0),
//       switchMap(([searchValue, currentPage]) => {
//         const skip = getPaginationSkip(currentPage, PAGINATION_LIMIT);
//         return searchRecipes(searchValue, PAGINATION_LIMIT, skip);
//       }),
//       shareReplay({ refCount: true, bufferSize: 1 })
//     );

//     return query$;
//   }
// }
