import { PaginationState } from "./pagination.state";
import { SearchState } from "../search/search.state";
import { Observable } from "rxjs";

export class PaginationComponent {
  private readonly previousButtonDisabled$: Observable<boolean>;
  private readonly nextButtonDisabled$: Observable<boolean>;

  private readonly page$: Observable<number>;

  constructor(
    private view: IPaginationView,
    private searchState: SearchState,
    private paginationState: PaginationState
  ) {
    this.previousButtonDisabled$ = this.paginationState.isFirstPage$;
    this.nextButtonDisabled$ = this.paginationState.isLastPage$;

    this.page$ = this.paginationState.currentPage$;

    this.previousButtonDisabled$.subscribe((isDisabled) => {
      this.view.togglePreviousPageButtonDisable(isDisabled);
    });

    this.nextButtonDisabled$.subscribe((isDisabled) => {
      this.view.toggleNextPageButtonDisable(isDisabled);
    });

    this.page$.subscribe((value) => {
      this.view.updateCurrentPage(value);
    });

    this.page$.subscribe((page) => {
      this.searchState.setCurrentPage(page);
    });
  }

  public handleNextPage() {
    this.paginationState.handleNextPage();
  }

  public handlePreviousPage() {
    this.paginationState.handlePreviousPage();
  }
}

export interface IPaginationView {
  updateCurrentPage(value: number): void;
  togglePreviousPageButtonDisable(isDisabled: boolean): void;
  toggleNextPageButtonDisable(isDisabled: boolean): void;
}
