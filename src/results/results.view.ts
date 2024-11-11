import { SearchState } from "../search/search.state";
import { Recipe } from "../search/types";
import { IResultsView, ResultsComponent } from "./results.component";

export class ResultsView implements IResultsView {
  private loading: Element | undefined;
  private results: Element[] | undefined;
  private container: Element;

  constructor() {
    this.container = this.getSearchContainerElement();

    const searchState = SearchState.getInstance();
    new ResultsComponent(this, searchState);
  }

  public setLoading(value: boolean) {
    if (value && !this.loading) {
      this.loading = this.createLoadingElement();
      this.container.append(this.loading);
    } else if (!value && this.loading) {
      this.container.removeChild(this.loading);
      this.loading.remove();
      this.loading = undefined;
    }
  }

  public setRecipes(recipes: Recipe[] | undefined) {
    if (recipes && !this.results) {
      const cardElements = recipes.map((recipe) => {
        const el = document.createElement("article");
        el.textContent = recipe.name;
        return el;
      });

      this.results = cardElements;
      this.results.forEach((el) => {
        this.container.append(el);
      });
    } else if (!recipes && this.results) {
      this.results.forEach((el) => {
        this.container.removeChild(el);
        el.remove();
      });
      this.results = undefined;
    }
  }

  private createLoadingElement() {
    const element = document.createElement("article");
    element.setAttribute("aria-busy", "true");
    return element;
  }

  private getSearchContainerElement() {
    const container = document.querySelector(".search-results");
    if (!container) {
      throw new Error("Element not found");
    }
    return container;
  }
}
