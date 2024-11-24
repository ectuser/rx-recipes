// import {
//   concatMap,
//   distinctUntilChanged,
//   map,
//   merge,
//   Observable,
//   of,
//   shareReplay,
//   Subject,
//   take,
// } from "rxjs";

// export class PaginationState {
//   public readonly currentPage$: Observable<number>;
//   private readonly previousPage$ = new Subject<void>();
//   private readonly nextPage$ = new Subject<void>();

//   constructor() {
//     this.currentPage$ = this.assembleCurrentPage();
//   }

//   public goNextPage() {
//     this.nextPage$.next();
//   }

//   public goPreviousPage() {
//     this.previousPage$.next();
//   }

//   private assembleCurrentPage() {
//     const initialPage$ = of(0);
//     return merge(
//       initialPage$,
//       this.previousPage$.pipe(concatMap(() => this.getPreviousPage())),
//       this.nextPage$.pipe(concatMap(() => this.getNextPage()))
//     ).pipe(
//       distinctUntilChanged(),
//       shareReplay({ refCount: true, bufferSize: 1 })
//     );
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
