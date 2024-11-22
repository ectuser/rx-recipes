import { fromEvent } from "rxjs";
import { SearchState } from "../search/search.state";
import { IPaginationView, PaginationComponent } from "./pagination.component";
import { PaginationState } from "./pagination.state";

export class PaginationView implements IPaginationView {
  private readonly previousButton: HTMLButtonElement;
  private readonly nextButton: HTMLButtonElement;
  private readonly currentPageEl: HTMLElement;

  private readonly paginationComponent: PaginationComponent;

  constructor() {
    this.previousButton = this.getPreviousButton();
    this.nextButton = this.getNextButton();
    this.currentPageEl = this.getCurrentPageEl();

    const searchState = SearchState.getInstance();
    const paginationState = new PaginationState(searchState);
    this.paginationComponent = new PaginationComponent(
      this,
      searchState,
      paginationState
    );

    const previousButtonClick$ = fromEvent(this.previousButton, "click");
    const nextButtonClick$ = fromEvent(this.nextButton, "click");

    previousButtonClick$.subscribe(() => {
      this.paginationComponent.handlePreviousPage();
    });

    nextButtonClick$.subscribe(() => {
      this.paginationComponent.handleNextPage();
    });
  }

  public updateCurrentPage(value: number): void {
    this.currentPageEl.textContent = (value + 1).toString();
  }

  public togglePreviousPageButtonDisable(isDisabled: boolean) {
    this.previousButton.disabled = isDisabled;
  }

  public toggleNextPageButtonDisable(isDisabled: boolean) {
    this.nextButton.disabled = isDisabled;
  }

  private getPreviousButton(): HTMLButtonElement {
    const button = document.querySelector<HTMLButtonElement>("button#prev");
    if (!button) {
      throw new Error("Previous button not found");
    }
    return button;
  }

  private getNextButton(): HTMLButtonElement {
    const button = document.querySelector<HTMLButtonElement>("button#next");
    if (!button) {
      throw new Error("Next button not found");
    }
    return button;
  }

  private getCurrentPageEl(): HTMLElement {
    const pageEl = document.querySelector<HTMLElement>("button#current-page");
    if (!pageEl) {
      throw new Error("Current page element not found");
    }
    return pageEl;
  }
}
