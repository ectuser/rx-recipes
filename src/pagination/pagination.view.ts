import { fromEvent } from "rxjs";
import { IPaginationView, PaginationComponent } from "./pagination.component";
import { RecipesState } from "../recipes.state";

export class PaginationView implements IPaginationView {
  private readonly previousButton: HTMLButtonElement;
  private readonly nextButton: HTMLButtonElement;
  private readonly currentPageEl: HTMLElement;

  private readonly paginationComponent: PaginationComponent;

  constructor(private recipesState: RecipesState) {
    this.previousButton = this.getPreviousButton();
    this.nextButton = this.getNextButton();
    this.currentPageEl = this.getCurrentPageEl();

    this.paginationComponent = new PaginationComponent(this, this.recipesState);

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
