import { RecipesState } from "../recipes.state";
import { filter, Observable } from "rxjs";

export class PaginationComponent {
  private readonly previousButtonDisabled$: Observable<boolean>;
  private readonly nextButtonDisabled$: Observable<boolean | undefined>;

  private readonly page$: Observable<number>;

  constructor(
    private view: IPaginationView,
    private recipesState: RecipesState
  ) {
    this.previousButtonDisabled$ = this.recipesState.isFirstPage$;
    this.nextButtonDisabled$ = this.recipesState.isLastPage$;

    this.page$ = this.recipesState.currentPage$;

    this.previousButtonDisabled$.subscribe((isDisabled) => {
      this.view.togglePreviousPageButtonDisable(isDisabled);
    });

    this.nextButtonDisabled$
      .pipe(filter((val) => val !== undefined))
      .subscribe((isDisabled) => {
        this.view.toggleNextPageButtonDisable(isDisabled);
      });

    this.page$.subscribe((value) => {
      this.view.updateCurrentPage(value);
    });

    // this.page$.subscribe((page) => {
    //   this.searchState.setCurrentPage(page);
    // });
  }

  public handleNextPage() {
    this.recipesState.goNextPage();
  }

  public handlePreviousPage() {
    this.recipesState.goPreviousPage();
  }
}

export interface IPaginationView {
  updateCurrentPage(value: number): void;
  togglePreviousPageButtonDisable(isDisabled: boolean): void;
  toggleNextPageButtonDisable(isDisabled: boolean): void;
}
