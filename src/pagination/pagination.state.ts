// import {
//   combineLatest,
//   merge,
//   Observable,
//   of,
//   Subject,
//   map,
//   distinctUntilChanged,
//   shareReplay,
//   take,
//   filter,
//   mergeMap,
// } from "rxjs";
// import { SearchState } from "../search/search.state";
// import { getIsLastPage, PAGINATION_LIMIT } from "./model";

// export class PaginationState {
//   public readonly currentPage$: Observable<number>;
//   public readonly previousPage$: Subject<void>;
//   public readonly nextPage$: Subject<void>;

//   public readonly isFirstPage$: Observable<boolean>;
//   public readonly isLastPage$: Observable<boolean>;

//   constructor(private searchState: SearchState) {
//     this.previousPage$ = new Subject();
//     this.nextPage$ = new Subject();

//     const initialPage$ = of(0);
//     this.currentPage$ = merge(
//       initialPage$,
//       this.searchState.searchValue$.pipe(map(() => 0)),
//       this.previousPage$.pipe(mergeMap(() => this.getPreviousPage())),
//       this.nextPage$.pipe(mergeMap(() => this.getNextPage()))
//     ).pipe(
//       distinctUntilChanged(),
//       shareReplay({ refCount: true, bufferSize: 1 })
//     );

//     this.isFirstPage$ = this.currentPage$.pipe(
//       map((currentPage) => currentPage === 0)
//     );

//     this.isLastPage$ = combineLatest([
//       this.currentPage$,
//       this.searchState.numberOfItems$.pipe(
//         filter((numberOfItems) => numberOfItems !== undefined)
//       ),
//     ]).pipe(
//       map(([currentPage, total]) =>
//         getIsLastPage(currentPage, total, PAGINATION_LIMIT)
//       )
//     );
//   }

//   public handleNextPage() {
//     this.nextPage$.next();
//   }

//   public handlePreviousPage() {
//     this.previousPage$.next();
//   }

//   private getPreviousPage(): Observable<number> {
//     return this.currentPage$.pipe(
//       take(1),
//       map((currentPage) => currentPage - 1)
//     );
//   }

//   private getNextPage(): Observable<number> {
//     return this.currentPage$.pipe(
//       take(1),
//       map((currentPage) => currentPage + 1)
//     );
//   }
// }
